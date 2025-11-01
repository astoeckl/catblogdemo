import { Cat } from 'lucide-react';

export default function BlogHeader() {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-slate-900 p-3 rounded-lg">
              <Cat className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">The Cat Blog</h1>
              <p className="text-slate-600 text-sm mt-1">Stories, Knowledge & Inspiration</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
