import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../../components/ui/Footer';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import SEOHead from '../../components/SEOHead';

import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import posts from './posts';
import { supabase } from '../../services/supabaseClient';
import BlogContent from '../../components/BlogContent';
import SocialShare from '../../components/SocialShare';
import { getComments, addComment, containsLinks } from '../../services/commentsService';
import { useBeautifulNotifications, NotificationContainer, BeautifulPopup, useBeautifulPopup } from '../../components/BeautifulNotification';
import { SendIcon, MessageIcon } from '../../components/Icons';
import Avatar, { AvatarSizes } from '../../components/Avatar';

const storageKeyFor = (slug) => `blog_comments_${slug}`;

const Comment = ({ comment, onReply, depth = 0 }) => (
  <div className={`bg-card/60 border border-border rounded-lg p-4 ${depth > 0 ? 'ml-8 mt-2 bg-card/40' : ''}`}>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-3">
        <Avatar 
          name={comment.name || 'Anonymous'}
          email={comment.email}
          size={depth > 0 ? AvatarSizes.sm : AvatarSizes.md}
          showTooltip={true}
          className="flex-shrink-0"
        />
        <div>
          <div className="text-sm font-medium">{comment.name || 'Anonymous'}</div>
          {depth > 0 && (
            <div className="text-xs text-blue-400 flex items-center">
              <Icon name="CornerDownRight" size={12} className="mr-1" />
              Reply
            </div>
          )}
        </div>
      </div>
      <div className="text-xs text-muted-foreground">
        {new Date(comment.date || comment.created_at).toLocaleString()}
      </div>
    </div>
    <p className="text-sm text-muted-foreground whitespace-pre-line mb-3">
      {comment.message || comment.content}
    </p>
    
    {/* Reply button */}
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onReply(comment)}
        className="text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1"
      >
        <Icon name="MessageCircle" size={12} />
        <span>Reply</span>
      </button>
      {comment.replies && comment.replies.length > 0 && (
        <span className="text-xs text-gray-500">
          {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
        </span>
      )}
    </div>
    
    {/* Replies */}
    {comment.replies && comment.replies.map((reply) => (
      <Comment 
        key={reply.id} 
        comment={reply} 
        onReply={onReply} 
        depth={depth + 1} 
      />
    ))}
  </div>
);

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]); // Local storage comments (legacy)
  const [dbComments, setDbComments] = useState([]); // Database comments
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [linkWarning, setLinkWarning] = useState('');
  const [replyTo, setReplyTo] = useState(null); // For tracking which comment we're replying to
  const { notifications, notify, removeNotification } = useBeautifulNotifications();
  const { showPopup, hidePopup, popups } = useBeautifulPopup();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        
        // First try to fetch from Supabase
        if (supabase) {
          const { data: supabasePost, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .single();

          if (!error && supabasePost) {
            // Transform Supabase data to match expected format
            const transformedPost = {
              id: supabasePost.id,
              title: supabasePost.title,
              slug: supabasePost.slug,
              excerpt: supabasePost.excerpt,
              content: supabasePost.content,
              category: supabasePost.category,
              tags: supabasePost.tags || [],
              image: supabasePost.featured_image || supabasePost.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
              date: supabasePost.createdAt,
              readTime: supabasePost.readTime || '5 min read',
              views: supabasePost.views || 0,
              likes: supabasePost.likes || 0,
              status: supabasePost.status
            };
            setPost(transformedPost);
          } else {
            // Fallback to static posts if not found in Supabase
            const staticPost = posts.find(p => p.slug === slug);
            setPost(staticPost);
          }
        } else {
          // Fallback to static posts if Supabase not available
          const staticPost = posts.find(p => p.slug === slug);
          setPost(staticPost);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        // Fallback to static posts on error
        const staticPost = posts.find(p => p.slug === slug);
        setPost(staticPost);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();

    // Load database comments
    const fetchComments = async () => {
      try {
        const dbCommentsData = await getComments(slug);
        setDbComments(dbCommentsData);
      } catch (error) {
        console.error('Error loading comments:', error);
      }
    };

    fetchComments();

    // Load legacy comments from localStorage
    const saved = localStorage.getItem(storageKeyFor(slug));
    setComments(saved ? JSON.parse(saved) : []);
    window.scrollTo(0, 0);
  }, [slug]);

  // Handle message change with real-time link detection
  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    
    // Check for links in real-time
    if (value.trim() && containsLinks(value)) {
      setLinkWarning('⚠️ Links are not allowed in comments. Please remove any URLs or links.');
    } else {
      setLinkWarning('');
    }
  };

  // Handle reply to a comment
  const handleReply = (comment) => {
    setReplyTo(comment);
    setMessage(`@${comment.name} `);
    // Scroll to comment form
    document.querySelector('.comment-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cancel reply
  const cancelReply = () => {
    setReplyTo(null);
    setMessage('');
    setLinkWarning('');
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!message.trim() || !name.trim() || !email.trim()) {
      notify.warning('Please fill in all required fields', 'Missing Information');
      return;
    }

    // Check for links before submission
    if (containsLinks(message.trim())) {
      notify.error('🚫 Links are not allowed in comments. Please remove any URLs or links from your comment.', 'Links Detected');
      return;
    }

    setIsSubmitting(true);
    notify.info('Submitting your comment...', 'Please Wait');

    try {
      const commentData = {
        blogSlug: slug,
        name: name.trim(),
        email: email.trim(),
        comment: message.trim()
      }
      
      // Only include blogPostId if it's a valid UUID (not a number)
      if (post?.id && typeof post.id === 'string' && post.id.length > 10) {
        commentData.blogPostId = post.id
      }
      
      // Include parentId if this is a reply
      if (replyTo) {
        commentData.parentId = replyTo.id
      }
      
      const result = await addComment(commentData);

      if (result.success) {
        if (result.pendingApproval) {
          // Show pending approval notification
          notify.success('Your comment has been submitted and is pending approval! 📝', 'Comment Pending');
          
          // Show beautiful success popup with pending message
          setShowSuccessPopup(true);
        } else {
          // Show immediate success (shouldn't happen with new system)
          notify.success('Your comment has been posted successfully! 🎉', 'Comment Submitted');
        }
        
        // Clear form
        setName('');
        setEmail('');
        setMessage('');
        setLinkWarning('');
        setReplyTo(null);
        
        // Refresh comments (will only show approved ones)
        const dbCommentsData = await getComments(slug);
        setDbComments(dbCommentsData);
      } else {
        // Show the specific error message from the service
        if (result.containsLinks) {
          notify.error(result.error, 'Links Not Allowed');
        } else {
          notify.error(result.error || 'Failed to submit comment. Please try again.', 'Submission Failed');
        }
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      notify.error('An unexpected error occurred. Please try again.', 'Network Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Legacy function for localStorage comments (keeping for backward compatibility)
  const addLocalComment = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const entry = { name: name.trim() || 'Guest', message: message.trim(), date: new Date().toISOString() };
    const next = [entry, ...comments];
    setComments(next);
    localStorage.setItem(storageKeyFor(slug), JSON.stringify(next));
    setMessage('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Icon name="FileX" size={64} className="mx-auto mb-4 text-gray-600" />
          <p className="text-2xl font-semibold mb-4">Post not found</p>
          <p className="text-gray-400 mb-6">This blog post doesn't exist or has been removed.</p>
          <Link to="/blog-tutorials-insights">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800/50">
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>{post.title} | CDW Burhan</title>
        <meta name="description" content={post.excerpt || ''} />
      </Helmet>

      <NotificationContainer notifications={notifications} removeNotification={removeNotification} />
      
      {/* Beautiful Success Popup */}
      <BeautifulPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        type="success"
        title="📝 Comment Submitted!"
        actions={
          <button
            onClick={() => setShowSuccessPopup(false)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Got it!
          </button>
        }
      >
        <p className="text-lg leading-relaxed">
          Thank you for sharing your thoughts! Your comment has been submitted and is pending approval by the admin. 
          Once approved, it will be visible to other readers. We appreciate your engagement with our content!
        </p>
      </BeautifulPopup>
      
      <Header />

      <main className="pt-24 lg:pt-32">
        {/* Cover */}
        <section className="relative">
          <div className="h-72 w-full overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-80" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-0 right-0 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs mb-3">
                <Icon name="Tag" size={14} className="mr-1" /> {post.category}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">{post.title}</h1>
              <div className="mt-3 flex items-center text-sm text-gray-300">
                <Icon name="Calendar" size={14} className="mr-1" /> {new Date(post.date).toLocaleDateString()}
                <span className="mx-2">•</span>
                <Icon name="Clock" size={14} className="mr-1" /> {post.readTime || '5 min read'}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-6">
            <article className="prose prose-invert prose-lg max-w-none">
              {Array.isArray(post.content) ? (
                post.content.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))
              ) : (
                <BlogContent content={post.content} />
              )}
            </article>

            {/* Tags */}
            {post.tags?.length ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/20">{t}</span>
                ))}
              </div>
            ) : null}

            {/* Social Share */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-300">Share this post</h3>
                <SocialShare 
                  title={post.title}
                  url={window.location.href}
                  excerpt={post.excerpt}
                />
              </div>
            </div>

            {/* Comments */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">
                Comments ({dbComments.length + comments.length})
              </h2>
              
              {/* Comment Form */}
              <form onSubmit={handleSubmitComment} className="mb-8 bg-card/40 border border-border rounded-lg p-6 comment-form">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    {replyTo ? `Reply to ${replyTo.name}` : 'Leave a Comment'}
                  </h3>
                  {replyTo && (
                    <button
                      type="button"
                      onClick={cancelReply}
                      className="text-sm text-red-400 hover:text-red-300 flex items-center space-x-1"
                    >
                      <Icon name="X" size={14} />
                      <span>Cancel Reply</span>
                    </button>
                  )}
                </div>
                
                {replyTo && (
                  <div className="mb-4 p-3 bg-blue-500/10 border border-blue-400/30 rounded-md">
                    <p className="text-sm text-blue-400 mb-1">Replying to:</p>
                    <p className="text-sm text-gray-300">
                      <strong>{replyTo.name}:</strong> {replyTo.content?.substring(0, 100)}
                      {replyTo.content?.length > 100 ? '...' : ''}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Your name *" 
                    required
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                  <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Your email *" 
                    type="email"
                    required
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <textarea 
                  value={message} 
                  onChange={handleMessageChange} 
                  placeholder="Write your comment..." 
                  rows={4}
                  required
                  className={`w-full px-3 py-2 bg-white/10 border rounded-md text-sm focus:outline-none focus:ring-2 mb-2 ${
                    linkWarning ? 'border-red-400 focus:ring-red-500' : 'border-white/20 focus:ring-blue-500'
                  }`}
                />
                {linkWarning && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-400/30 rounded-md">
                    <p className="text-sm text-red-400">{linkWarning}</p>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">
                    Your comment will be reviewed by admin before appearing publicly.
                  </p>
                  <Button 
                    variant="default" 
                    className="bg-blue-600 hover:bg-blue-500" 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <SendIcon size={16} className="mr-2" />
                    {isSubmitting ? 'Submitting...' : 'Post Comment'}
                  </Button>
                </div>
              </form>

              {/* Comments Display */}
              <div className="space-y-4">
                {/* Database Comments (threaded) */}
                {dbComments.map((comment) => (
                  <Comment 
                    key={comment.id} 
                    comment={comment} 
                    onReply={handleReply}
                    depth={0}
                  />
                ))}

                {/* Legacy localStorage Comments */}
                {comments.map((comment, index) => (
                  <Comment 
                    key={`legacy-${index}`} 
                    comment={comment} 
                    onReply={handleReply}
                    depth={0}
                  />
                ))}

                {/* No Comments */}
                {dbComments.length === 0 && comments.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <MessageIcon size={48} className="mx-auto mb-3 opacity-50" />
                    <p className="text-lg">No comments yet</p>
                    <p className="text-sm">Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Back link */}
        <section className="pb-16">
          <div className="max-w-5xl mx-auto px-6">
            <Link to="/blog-tutorials-insights">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800/50">
                <Icon name="ArrowLeft" size={16} className="mr-2" /> 
                Back to Blog
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;


