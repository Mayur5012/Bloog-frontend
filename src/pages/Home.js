import React from "react";   
import BlogList from "../features/blog/components/BlogList";
import NavBar from "../features/Navbar/Navbar";
import Footer from "../features/common/Footer";
function Home() {
  return (
    <>
      <NavBar />
      <BlogList />
      <Footer />
    </>
  )
}

export default Home;
