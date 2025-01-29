import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Globe, Search } from 'lucide-react';

const data = [
  { date: '2024-01', SP500: 4200, NASDAQ: 14000, DOW: 35000 },
  { date: '2024-02', SP500: 4300, NASDAQ: 14500, DOW: 35500 },
  { date: '2024-03', SP500: 4250, NASDAQ: 14300, DOW: 35200 },
  { date: '2024-04', SP500: 4400, NASDAQ: 14800, DOW: 36000 },
  { date: '2024-05', SP500: 4450, NASDAQ: 15000, DOW: 36500 },
  { date: '2024-06', SP500: 4500, NASDAQ: 15200, DOW: 37000 },
];

const marketNews = [
  {
    title: 'Fed Signals Potential Rate Cuts in 2024',
    source: 'Financial Times',
    time: '2 hours ago',
    impact: 'positive',
  },
  {
    title: 'Tech Sector Leads Market Rally',
    source: 'Bloomberg',
    time: '4 hours ago',
    impact: 'positive',
  },
  {
    title: 'Oil Prices Surge Amid Global Tensions',
    source: 'Reuters',
    time: '6 hours ago',
    impact: 'negative',
  },
];

const MarketAnalysis = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Market Analysis</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search markets..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <select className="form-select bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-lg">
              <option>All Markets</option>
              <option>US Markets</option>
              <option>European Markets</option>
              <option>Asian Markets</option>
              <option>Emerging Markets</option>
            </select>
            <button className="btn-primary">
              <Globe className="h-5 w-5 mr-2" />
              Global View
            </button>
          </div>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">S&P 500</h3>
              <div className="flex items-center text-green-500">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span>+1.2%</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">4,500.21</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Updated 5 min ago</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">NASDAQ</h3>
              <div className="flex items-center text-green-500">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span>+1.8%</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">15,200.45</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Updated 5 min ago</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Dow Jones</h3>
              <div className="flex items-center text-red-500">
                <TrendingDown className="h-5 w-5 mr-1" />
                <span>-0.3%</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">37,000.88</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Updated 5 min ago</p>
          </div>
        </div>

        {/* Market Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Market Trends</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="SP500" stroke="#6366f1" strokeWidth={2} />
                <Line type="monotone" dataKey="NASDAQ" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="DOW" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market News */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-6 border-b dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Market News</h2>
              </div>
              {marketNews.map((news, index) => (
                <div key={index} className="p-6 border-b dark:border-gray-700 last:border-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-medium text-gray-900 dark:text-white">{news.title}</h3>
                      <div className="mt-1 flex items-center space-x-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{news.source}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{news.time}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full ${
                      news.impact === 'positive' ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' :
                      'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                    }`}>
                      {news.impact === 'positive' ? 'Bullish' : 'Bearish'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Sectors */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-6 border-b dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Sector Performance</h2>
              </div>
              {[
                { name: 'Technology', change: '+2.5%', color: 'text-green-500' },
                { name: 'Healthcare', change: '+1.2%', color: 'text-green-500' },
                { name: 'Financials', change: '-0.8%', color: 'text-red-500' },
                { name: 'Energy', change: '+0.5%', color: 'text-green-500' },
                { name: 'Materials', change: '-1.2%', color: 'text-red-500' },
              ].map((sector, index) => (
                <div key={index} className="p-4 border-b dark:border-gray-700 last:border-0">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 dark:text-white">{sector.name}</span>
                    <span className={sector.color}>{sector.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;