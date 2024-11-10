
//function for fetching blogs by category and pagination
export async function fetchBlogsByCategory(category, pagination) {
  const queryString = `category=${category || ""}&page=${pagination.page}&pageSize=${pagination.pageSize}`;
  const response = await fetch(`/blogs?${queryString}`);
  console.log(response);
  
  const data = await response.json();
  return data;
} 


// for creating blogs
export async function createBlog(blog) {
  const transformedData = {
    name: blog.name,
    title: blog.title,
    thumbnail: blog.thumbnailURL,
    description: blog.description,
    url: blog.link,
    category: blog.category
  };

  const response = await fetch('/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transformedData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create blog');
  }

  const data = await response.json();
  return data;
}


// for fetching categories
export async function fetchCategories() {
  const response = await fetch('/categories');
  const data = await response.json();
  return data;
}


