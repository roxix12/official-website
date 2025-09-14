import { supabase } from './supabaseClient'
import { notifyNewComment } from './notificationService'

// Link detection utility
const containsLinks = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}/gi
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi
  return urlRegex.test(text) || emailRegex.test(text)
}

// Get comments for a blog post (only approved comments for public)
export const getComments = async (blogSlug) => {
  try {
    console.log('📖 Fetching comments for blog slug:', blogSlug)
    
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_slug', blogSlug)
      .eq('is_approved', true)  // Only show approved comments
      .order('created_at', { ascending: true })
    
    console.log('📖 Database query result:', { data, error })
    console.log('📖 Found', data?.length || 0, 'approved comments')

    if (error) throw error
    
    // Transform and organize comments with replies
    const comments = (data || []).map(comment => ({
      id: comment.id,
      name: comment.name,
      email: comment.email,
      content: comment.content,
      created_at: comment.created_at,
      is_approved: comment.is_approved,
      parent_id: comment.parent_id,
      replies: []
    }))
    
    // Organize into threaded structure
    const threaded = []
    const commentMap = {}
    
    // Create a map for quick lookup
    comments.forEach(comment => {
      commentMap[comment.id] = comment
    })
    
    // Organize into parent-child structure
    comments.forEach(comment => {
      if (comment.parent_id) {
        // This is a reply
        if (commentMap[comment.parent_id]) {
          commentMap[comment.parent_id].replies.push(comment)
        }
      } else {
        // This is a top-level comment
        threaded.push(comment)
      }
    })
    
    return threaded
  } catch (error) {
    console.error('Error fetching comments:', error)
    return []
  }
}

// Add a new comment with link detection
export const addComment = async (commentData) => {
  try {
    console.log('🚀 Adding comment with link detection:', commentData)
    console.log('🔍 Comment data types:', {
      blogSlug: typeof commentData.blogSlug,
      name: typeof commentData.name,
      email: typeof commentData.email,
      comment: typeof commentData.comment,
      blogPostId: typeof commentData.blogPostId,
      parentId: typeof commentData.parentId
    })
    
    // Check for links in comment content
    if (containsLinks(commentData.comment)) {
      return { 
        success: false, 
        error: '🚫 Links are not allowed in comments. Please remove any URLs or links from your comment.',
        containsLinks: true
      }
    }
    
    // Payload matching the comments table structure
    const payload = {
      post_slug: commentData.blogSlug,
      name: commentData.name,
      email: commentData.email,
      content: commentData.comment,
      is_approved: false  // All comments start as pending approval
    }
    
    // Only include post_id if it's a valid UUID (not a number)
    if (commentData.blogPostId && typeof commentData.blogPostId === 'string' && commentData.blogPostId.length > 10) {
      payload.post_id = commentData.blogPostId
    }
    
    // Include parent_id if this is a reply
    if (commentData.parentId) {
      payload.parent_id = commentData.parentId
    }
    
    console.log('📝 Inserting payload:', payload)
    console.log('📝 Payload types:', {
      post_slug: typeof payload.post_slug,
      post_id: typeof payload.post_id,
      name: typeof payload.name,
      email: typeof payload.email,
      content: typeof payload.content,
      is_approved: typeof payload.is_approved,
      parent_id: typeof payload.parent_id
    })
    console.log('📝 is_approved value:', payload.is_approved, '(should be false)')

    const { data, error } = await supabase
      .from('comments')
      .insert([payload])
      .select()
    
    console.log('💾 Database insert result:', { data, error })
    console.log('💾 Inserted comment approval status:', data?.[0]?.is_approved)

    if (error) {
      console.error('❌ Insert error:', error)
      console.error('❌ Error code:', error.code)
      console.error('❌ Error message:', error.message)
      console.error('❌ Error details:', error.details)
      console.error('❌ Error hint:', error.hint)
      throw error
    }

    console.log('✅ Comment submitted for approval:', data[0])
    
    // Send email notification to admin (async, don't block the response)
    try {
      await notifyNewComment({
        name: commentData.name,
        email: commentData.email,
        content: commentData.comment,
        postTitle: `Blog Post (${commentData.blogSlug})`,
        postUrl: `${window.location.origin}/blog-tutorials-insights/${commentData.blogSlug}`,
        parentId: commentData.parentId,
        parentComment: commentData.parentComment || ''
      })
      console.log('📧 Admin notification sent successfully')
    } catch (notificationError) {
      console.error('⚠️ Failed to send admin notification (comment still saved):', notificationError)
      // Don't fail the comment submission if notification fails
    }

    return {
      success: true,
      data: data[0],
      pendingApproval: true,
      message: 'Your comment has been submitted and is pending approval by the admin.'
    }
  } catch (error) {
    console.error('❌ Error adding comment:', error)
    console.error('Error details:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    })
    
    // Simplified error handling
    if (error.message?.includes('does not exist')) {
      return { 
        success: false, 
        error: '💬 Comments table not found! Please run the SQL setup first.' 
      }
    }
    
    if (error.message?.includes('permission denied') || error.code === 'PGRST301') {
      return { 
        success: false, 
        error: '🔒 Permission error! Please check your Supabase RLS policies.' 
      }
    }
    
    // Generic fallback
    return { 
      success: false, 
      error: `Failed to submit comment: ${error.message || 'Unknown error'}` 
    }
  }
}

// Get all comments for admin (including pending)
export const getAllComments = async () => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    
    // Transform data for admin view
    return (data || []).map(comment => ({
      id: comment.id,
      name: comment.name,
      email: comment.email,
      content: comment.content,
      created_at: comment.created_at,
      updated_at: comment.updated_at,
      is_approved: comment.is_approved,
      blog_post_slug: comment.post_slug,
      blog_post_title: comment.post_slug || 'Unknown Post',
      containsLinks: containsLinks(comment.content)
    }))
  } catch (error) {
    console.error('Error fetching all comments:', error)
    return []
  }
}

// Get pending comments for admin
export const getPendingComments = async () => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('is_approved', false)
      .order('created_at', { ascending: false })

    if (error) throw error
    
    return (data || []).map(comment => ({
      id: comment.id,
      name: comment.name,
      email: comment.email,
      content: comment.content,
      created_at: comment.created_at,
      blog_post_slug: comment.post_slug,
      blog_post_title: comment.post_slug || 'Unknown Post',
      containsLinks: containsLinks(comment.content)
    }))
  } catch (error) {
    console.error('Error fetching pending comments:', error)
    return []
  }
}

// Approve a comment
export const approveComment = async (commentId) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .update({ is_approved: true })
      .eq('id', commentId)
      .select()

    if (error) throw error
    return { success: true, data: data[0] }
  } catch (error) {
    console.error('Error approving comment:', error)
    return { success: false, error: error.message }
  }
}

// Reject/Unapprove a comment
export const rejectComment = async (commentId) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .update({ is_approved: false })
      .eq('id', commentId)
      .select()

    if (error) throw error
    return { success: true, data: data[0] }
  } catch (error) {
    console.error('Error rejecting comment:', error)
    return { success: false, error: error.message }
  }
}

// Delete a comment
export const deleteComment = async (commentId) => {
  try {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error deleting comment:', error)
    return { success: false, error: error.message }
  }
}

// Get comment stats
export const getCommentStats = async () => {
  try {
    const { data: allComments, error: allError } = await supabase
      .from('comments')
      .select('id, is_approved')

    if (allError) throw allError

    const total = allComments?.length || 0
    const approved = allComments?.filter(c => c.is_approved).length || 0
    const pending = total - approved

    return {
      total,
      approved,
      pending
    }
  } catch (error) {
    console.error('Error fetching comment stats:', error)
    return { total: 0, approved: 0, pending: 0 }
  }
}

// Export the link detection function for use in frontend
export { containsLinks }
