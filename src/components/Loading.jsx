const Loading = ({ text = "Loading data..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-transparent">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-slate-300"></div>
        <div className="absolute inset-0 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-sm font-medium animate-pulse">
        {text}
      </p>
    </div>
  );
};
export default Loading;
