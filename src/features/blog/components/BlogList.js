import React, { useState, useEffect } from "react";
import Categories from "./Categories";
import Pagination from "../../common/Pagination";
import { fetchBlogsByCategory } from "../blogAPI";
import { ITEMS_PER_PAGE } from "../../../app/constants";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  // console.log(totalItems);
  

  //fetching blogs based on selected category & currentPage
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const category = selectedCategory === "All" ? "" : selectedCategory;
      const pagination = { page, pageSize: ITEMS_PER_PAGE };
      const data = await fetchBlogsByCategory(category, pagination);
      setBlogs(data.data);
      setTotalItems(data.totalItems || data.data.length);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  //fetching blogs when category or page changes
  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory, page]);

  //category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setPage(1); //reset to 1st page on category change
  };

  const handlePage= (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="px-6 py-4">
      {/* -----------category bar----------------- */}
      <Categories
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />

      {/* ------------loading --------- */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {/* ------------ blog grid--------------- */}
      <div>
        <BlogGrid blogs={blogs}  loading={loading}/>
      </div>

      {/* ---------pagination comp---------- */}
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalItems}
      />
    </div>
  );
};

export default BlogList;


// ---------mapping blogs and creating grid--------
function BlogGrid({ blogs,loading }){
  return(
    <div className="grid grid-cols-1 my-6 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.length > 0
          ? blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white shadow-lg hover:shadow-xl rounded-lg p-4 transition-shadow duration-300"

              >
                <img
                  src={blog.thumbnail || "https://via.placeholder.com/150"}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">
                  {blog.title.length>22 ? `${blog.title.substring(0, 22)}...` : blog.title}
                  </h3>
                  <h6 className="my-2 text-blue-500 font-semibold text-xs ">by {blog.name}</h6>
                <p className="text-sm text-gray-600 mb-4">
                  {blog.description.length > 100
                    ? `${blog.description.substring(0, 100)}...`
                    : blog.description}
                </p>

                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Read more
                </a>
              </div>
            ))
          : !loading && (
              <p className="text-center text-gray-500">No blogs found.</p>
            )}
      </div>
  )
}