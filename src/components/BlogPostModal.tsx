import { useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { BlogPostData } from '../services/api';
import ReactMarkdown from './ReactMarkdown';

interface BlogPostModalProps {
  post: BlogPostData;
  isOpen: boolean;
  onClose: () => void;
}

export default function BlogPostModal({ post, isOpen, onClose }: BlogPostModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {post.data.media_referenz && (
            <div className="h-72 overflow-hidden bg-slate-100">
              <img
                src={post.data.media_referenz}
                alt={post.data.titel}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Close"
          >
            <X className="h-6 w-6 text-slate-900" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-8">
          <div className="flex items-center space-x-2 text-sm text-slate-500 mb-4">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.updated_at)}</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-6">
            {post.data.post_referenz.title}
          </h1>

          <div className="prose prose-slate max-w-none">
            <ReactMarkdown content={post.data.post_referenz.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
