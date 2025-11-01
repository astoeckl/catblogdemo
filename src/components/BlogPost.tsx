import { useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import { BlogPostData } from '../services/api';
import BlogPostModal from './BlogPostModal';

interface BlogPostProps {
  post: BlogPostData;
}

export default function BlogPost({ post }: BlogPostProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    const plainText = content.replace(/[#*_\[\]()]/g, '').replace(/\n/g, ' ').trim();
    if (plainText.length <= maxLength) return plainText;
    return plainText.slice(0, maxLength) + '...';
  };

  return (
    <>
      <article
        className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border border-slate-200"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-56 overflow-hidden bg-slate-100">
          {post.data.media_referenz ? (
            <img
              src={post.data.media_referenz}
              alt={post.data.titel}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
              <span className="text-slate-400 text-lg font-medium">No Image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.updated_at)}</span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors line-clamp-2">
            {post.data.post_referenz.title}
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
            {getExcerpt(post.data.post_referenz.content)}
          </p>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <span className="text-slate-700 font-medium text-sm group-hover:text-slate-900 transition-colors">
              Read more →
            </span>
          </div>
        </div>
      </article>

      <BlogPostModal
        post={post}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
