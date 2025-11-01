import { useEffect, useState } from 'react';
import { Newspaper, Calendar, Clock } from 'lucide-react';
import BlogPost from './components/BlogPost';
import BlogHeader from './components/BlogHeader';
import { fetchBlogPosts, BlogPostData } from './services/api';

function App() {
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchBlogPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Error loading posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <BlogHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
            Error loading posts
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-20">
            <Newspaper className="mx-auto h-16 w-16 text-slate-400 mb-4" />
            <p className="text-slate-600 text-lg">No posts found</p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPost key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-slate-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">The Cat Blog</h3>
              <p className="text-sm">
                Discover fascinating stories, knowledge, and inspiration about our feline friends.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Categories</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">News</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Knowledge</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Stories</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
              <p className="text-sm">
                Have questions or suggestions?<br />
                Feel free to reach out to us.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm">
            <p>&copy; 2025 The Cat Blog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
