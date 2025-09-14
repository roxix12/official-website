import React, { useState } from "react";
import toast from "react-hot-toast";
import newsletterService from "../services/newsletter";

interface NewsletterSubscribeProps {
  className?: string;
  placeholder?: string;
  buttonText?: string;
  source?: "website" | "admin";
}

export default function NewsletterSubscribe({
  className = "",
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  source = "website",
}: NewsletterSubscribeProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);
    
    try {
      const result = await newsletterService.subscribe(email.trim(), source);
      
      if (result.success) {
        setEmail(""); // Clear form on success
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`newsletter-form ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !email.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Subscribing..." : buttonText}
        </button>
      </div>
    </form>
  );
}
