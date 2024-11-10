

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; 
import {
  fetchBlogsByCategory,
  createBlog,
  fetchCategories,
} from './blogAPI'; 



const initialState = {
  blogs: [],
  categories: [],
  status: 'idle',
  totalItems: 0,
  selectedBlog: null,
};

//creating asynthunk for filteration based on category function
export const fetchBlogsByCategoryAsync = createAsyncThunk(
  'blogs/fetchBlogsByCategory',
  async ({ category, pagination }) => {
    const response = await fetchBlogsByCategory(category, pagination);
    if (response.status === 200) {
      const { blogs, totalItems } = response.data;
      return { blogs, totalItems };
    } else {
      throw new Error("Failed to fetch blogs");
    }
  }
);


// similarly for categories 
export const fetchCategoriesAsync = createAsyncThunk(
  'blogs/fetchCategories',
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);


// creating blogs
export const createBlogAsync = createAsyncThunk(
  'blogs/createBlog',
  async (blog) => {
    const response = await createBlog(blog);
    return response.data;
  }
);

// handles asynchronous API calls with extraReducers and sync state updates with reducers
const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogsByCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogsByCategoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.blogs = action.payload.blogs;
        state.totalItems = action.payload.totalItems;
      })
      
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(createBlogAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBlogAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.blogs.push(action.payload);
      })
  },
});

export const { clearSelectedBlog } = blogsSlice.actions;

export const selectAllBlogs = (state) => state.blog.blogs;
export const selectCategories = (state) => state.blog.categories;
export const selectBlogListStatus = (state) => state.blog.status;
export const selectTotalItems = (state) => state.blog.totalItems;

export default blogsSlice.reducer;
