import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Bars3Icon, UserIcon } from "@heroicons/react/24/outline";
import avtr from "../../assests/avtr.png";
import logo from "../../assests/logot.png";
import BlogForm from "../blog/components/BlogForm";

function NavBar({ children }) {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // for form popup

  const userName = userInfo?.email?.split("@")[0] || "User";

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {userInfo && (
        <div className="min-h-full bg-gray-100">
          <nav className="bg-white shadow">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <Link to="/">
                    <img
                      className="h-[50px] w-[120px] sm:h-[40px] sm:w-[100px] lg:h-[64px] lg:w-[140px]"
                      src={logo}
                      alt="Logo"
                    />
                  </Link>
                </div>

                <div className="hidden md:flex items-center">
                  <button
                    type="button"
                    onClick={openModal}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                  >
                    + Create a Blog
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMenu}
                    className="flex items-center space-x-2 p-2 border border-gray-300 rounded-full hover:border-violet-500 focus:outline-none"
                  >
                    <UserIcon className="h-6 w-6 text-gray-500 hover:text-violet-500" />
                    <Bars3Icon className="h-6 w-6 text-gray-500 hover:text-violet-500" />
                  </button>
                </div>
              </div>
            </div>

            {menuOpen && (
              <div className="absolute right-4 top-16 z-10 w-auto p-3 bg-white rounded-md shadow-lg">
                <div className="py-2">
                  <div className="flex items-center space-x-2 px-4 py-2">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={avtr}
                      alt="Profile"
                    />
                    <span className="text-gray-700 font-medium">
                      {userName}
                    </span>
                  </div>
                  <Link to="/logout">
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 focus:outline-none"
                    >
                      Logout
                    </button>
                  </Link>
                  <button
                    type="button"
                    onClick={openModal}
                    className="w-full bg-violet-500 mt-2 text-white px-4 py-2 rounded-md shadow-sm hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                  >
                    + Create a Blog
                  </button>
                </div>
              </div>
            )}
          </nav>

          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
          </main>

          {/* ---------------blogform model--------------- */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Create a Blog</h2>
                <BlogForm setShowForm={setIsModalOpen} /> 
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default NavBar;



// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Bars3Icon, UserIcon } from "@heroicons/react/24/outline";
// import { selectUserInfo } from "../user/userSlice";
// import avtr from "../../assests/avtr.png";
// import logo from "../../assests/logot.png";
// import BlogForm from "../blog/components/BlogForm";

// function NavBar({ children }) {
//   const userInfo = useSelector((state) => state.user.userInfo);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

//   const userName = userInfo?.email?.split("@")[0] || "User";

//   const toggleMenu = () => setMenuOpen(!menuOpen);
//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);
//   return (
//     <>
//       {userInfo && (
//         <div className="min-h-full bg-gray-100">
//           <nav className="bg-white shadow">
//             <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
//               <div className="flex h-16 items-center justify-between">
//                 <div className="flex items-center">
//                   <Link to="/">
//                     <img
//                       className="h-[50px] w-[120px] sm:h-[40px] sm:w-[100px] lg:h-[64px] lg:w-[140px]"
//                       src={logo}
//                       alt="Logo"
//                     />
//                   </Link>
//                 </div>

//                 <div className="hidden md:flex items-center">
//                   <button
//                     type="button"
//                     onClick={openModal}
//                     className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
//                   >
//                     + Create a Blog
//                   </button>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={toggleMenu}
//                     className="flex items-center space-x-2 p-2 border border-gray-300 rounded-full hover:border-violet-500 focus:outline-none"
//                   >
//                     <UserIcon className="h-6 w-6 text-gray-500 hover:text-violet-500" />
//                     <Bars3Icon className="h-6 w-6 text-gray-500 hover:text-violet-500" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {menuOpen && (
//               <div className="absolute right-4 top-16 z-10 w-auto p-3 bg-white rounded-md shadow-lg">
//                 <div className="py-2">
//                   <div className="flex items-center space-x-2 px-4 py-2">
//                     <img
//                       className="h-6 w-6 rounded-full"
//                       src={avtr}
//                       alt="Profile"
//                     />
//                     <span className="text-gray-700 font-medium">
//                       {userName}
//                     </span>
//                   </div>
//                   <Link to="/logout">
//                     <button
//                       type="button"
//                       className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 focus:outline-none"
//                     >
//                       Logout
//                     </button>
//                   </Link>
//                   <button
//                     type="button"
//                     onClick={openModal}
//                     className="w-full bg-violet-500 mt-2 text-white px-4 py-2 rounded-md shadow-sm hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
//                   >
//                     + Create a Blog
//                   </button>
//                 </div>
//               </div>
//             )}
//           </nav>

         
//           <main>
//             <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
//           </main>


//           {isModalOpen && (
//             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//               <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
//                 <h2 className="text-2xl font-bold mb-4">Create a Blog</h2>
//                 <BlogForm onClose={closeModal} /> {/* Pass close function to BlogForm */}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// }

// export default NavBar;
