const StockAnalyzer = () => {
  return (
    <div className="h-[calc(100vh-2rem)] p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl h-full flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Stock Analyzer</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Analyze stocks and make informed decisions</p>
        </div>
        <div className="flex-1 relative">
          <iframe
            src="https://stock-the-stock.streamlit.app?embed=true"
            className="absolute inset-0 w-full h-full border-0"
            title="Stock Analyzer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default StockAnalyzer; 