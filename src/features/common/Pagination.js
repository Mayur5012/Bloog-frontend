import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ITEMS_PER_PAGE } from "../../app/constants";

export default function Pagination({ page, setPage, handlePage, totalItems }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  //handling page changes
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      handlePage(newPage);  //update curr page
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">


      {/* ------ paginatiion for small screen size----------- */}
      <div className="flex flex-1 justify-between sm:hidden">
        {/* -------------prev buttn---------- */}
        <div
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer ${page === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-200'}`}
        >
          Previous
        </div>

        {/* ---------next button-------- */}
        <div
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer ${page === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-200'}`}
        >
          Next
        </div>
      </div>

      {/* ----------displaying pages and result for desktop------- */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{' '}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>

        {/* ----------------- page numbers------------- */}
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {/* ------- prev button---- */}
            <div
              onClick={() => handlePageChange(page - 1)}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer ${page === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-200'}`}
              disabled={page === 1}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>

            {/* ------------displaying page num----------------- */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <div
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`relative cursor-pointer z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  index + 1 === page
                    ? 'bg-violet-500 text-white'
                    : 'text-gray-400 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </div>
            ))}

          {/* ------------next button--------------- */}
            <div
              onClick={() => handlePageChange(page + 1)}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer ${page === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-200'}`}
              disabled={page === totalPages}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}