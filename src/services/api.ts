export interface BlogPostData {
  id: number;
  type_identifier: string;
  data: {
    titel: string;
    post_referenz: {
      title: string;
      content: string;
      short_description: string | null;
      keywords: string | null;
    };
    media_referenz: string;
  };
  updated_at: string;
}

const API_URL = 'https://backend.staging.cognitor.dev/public/itublog/elements';

export async function fetchBlogPosts(limit: number = 10, skip: number = 0): Promise<BlogPostData[]> {
  const response = await fetch(`${API_URL}?type=itublog_news&limit=${limit}&skip=${skip}`, {
    headers: {
      'accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error loading blog posts');
  }

  const data = await response.json();
  return data;
}
