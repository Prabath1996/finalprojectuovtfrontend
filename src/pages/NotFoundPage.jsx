import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center 
    justify-center p-4 md:p-8">
      <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
        {/* ERROR Title */}
        <h1 className="mb-8 font-extrabold text-white text-4xl sm:text-5xl md:text-6xl">
          ERROR
        </h1>

        {/* Images */}
        <img src="/404.svg" alt="404" className="dark:hidden mx-auto" />
        <img
          src="/404-dark.svg"
          alt="404"
          className="hidden dark:block mx-auto"
        />

        {/* Message */}
        <p className="mt-10 mb-6 text-base text-gray-200 sm:text-lg">
          We can’t seem to find the page you are looking for!
        </p>

        {/* Back Home Button */}
        <Link
          to="/login"
          className="inline-flex items-center justify-center rounded-lg border bg-50
          border-gray-300 px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs 
          hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 
          dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          Back to Home Page
        </Link>
      </div>

      {/* Footer */}
      <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
        &copy; {new Date().getFullYear()} GuideBuddy. All rights reserved.
      </p>
    </div>
  );
};

export default NotFoundPage;
