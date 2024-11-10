import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { createBlogAsync } from '../blogSlice';
import { useNavigate } from 'react-router-dom';

const BlogForm = ({ showForm, setShowForm }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch(); // for fetching name using redux state
  const navigate = useNavigate();

  // splitting email to show name in name field
  const userName = userInfo?.email?.split("@")[0] || "User";

  //setting up form data
  const [formData, setFormData] = useState({
    name:userName,
    title: '',
    thumbnailURL: '',
    description: '',
    link: '',
    category: ''
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  // fetching categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/categories");
        const data = await response.json();
        setCategories([{ id: 0, label: "All",value:"All", icon: "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg" }, ...data]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

// checking validity of email input
  const isValidURL = (url) => {
    const regex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9-]{2,4}(\/[^\s]*)?$/i;
    return regex.test(url);
  };

  // validation of form
  const validateForm = () => {
    const newErrors = {};
    const { name, title, thumbnailURL, description, link, category } = formData;

    if (!name) newErrors.name = 'Name is required';
    if (!title) newErrors.title = 'Title is required';
    if (!thumbnailURL) newErrors.thumbnailURL = 'Thumbnail URL is required';
    if (thumbnailURL && !isValidURL(thumbnailURL)) newErrors.thumbnailURL = 'Invalid URL format';
    if (!description) newErrors.description = 'Description is required';
    if (!link) newErrors.link = 'Link is required';
    if (link && !isValidURL(link)) newErrors.link = 'Invalid URL format';
    if (!category) newErrors.category = 'Category is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  // after clicking create blog btn
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await dispatch(createBlogAsync(formData));
      alert('Blog created successfully!');
      setShowForm(false);
      navigate('/blog');
    } catch (error) {
      console.error('Error creating blog:', error);
      alert(error.message || 'Failed to create blog');
    } finally {
      setIsSubmitting(false);
    }
  };


  //after clicking cancel button
  const handleCancel = () => {
    setFormData({
      name:'',
      title: '',
      thumbnailURL: '',
      description: '',
      link: '',
      category: ''
      
    });
    setErrors({});
    setShowForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
          <label htmlFor="name" className="block text-sm font-semibold text-left">Name of author</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={userName}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            disabled
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>
        <div className="grid grid-cols-2 gap-4">
        
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-left">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
          </div>

          <div>
            <label htmlFor="thumbnailURL" className="block text-sm font-semibold text-left">Thumbnail URL</label>
            <input
              type="text"
              id="thumbnailURL"
              name="thumbnailURL"
              value={formData.thumbnailURL}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.thumbnailURL && <span className="text-red-500 text-sm">{errors.thumbnailURL}</span>}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-left">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="link" className="block text-sm font-semibold text-left">Link</label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.link && <span className="text-red-500 text-sm">{errors.link}</span>}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-left">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a category</option>
              {/* ------- getting category using category.value -------- */}
              {categories.map((category) => (
                <option key={category.id} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="submit"
            className={`w-full px-4 py-2 bg-blue-600 text-white rounded-md ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Blog'}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;