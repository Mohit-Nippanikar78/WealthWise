import React, { useState } from 'react';
import { TrendingUp, DollarSign, BarChart2, PieChart, Target, Shield, Briefcase, ChevronRight, ArrowUpRight, ArrowDownRight, Building2, Landmark, Wallet } from 'lucide-react';

interface Investment {
  symbol: string;
  name: string;
  type: string;
  price: string;
  change: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  expectedReturn: string;
  reason: string;
}

const investments: Investment[] = [
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd.",
    type: "Large Cap Stock",
    price: "₹1,450.25",
    change: 2.5,
    riskLevel: "Low",
    expectedReturn: "12-15%",
    reason: "Strong fundamentals, consistent growth, and market leadership in banking sector"
  },
  {
    symbol: "NIFTYBEES",
    name: "Nippon India Nifty 50 BeES",
    type: "Index ETF",
    price: "₹235.75",
    change: 1.2,
    riskLevel: "Moderate",
    expectedReturn: "10-12%",
    reason: "Broad market exposure with low expense ratio and high liquidity"
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    type: "Large Cap Stock",
    price: "₹3,842.50",
    change: -0.8,
    riskLevel: "Low",
    expectedReturn: "15-18%",
    reason: "Strong order book, consistent dividend payer, and global IT services leader"
  },
  {
    symbol: "PPLPHARMA",
    name: "Parabolic Drugs",
    type: "Small Cap Stock",
    price: "₹82.30",
    change: 4.5,
    riskLevel: "High",
    expectedReturn: "25-30%",
    reason: "Emerging player in pharma sector with strong R&D pipeline"
  }
];

const mutualFunds = [
  {
    name: "Mirae Asset Large Cap Fund",
    type: "Large Cap Fund",
    nav: "₹95.25",
    yearReturn: "15.8%",
    rating: 5,
    riskLevel: "Moderate",
    category: "Equity"
  },
  {
    name: "SBI Small Cap Fund",
    type: "Small Cap Fund",
    nav: "₹125.40",
    yearReturn: "22.5%",
    rating: 4,
    riskLevel: "High",
    category: "Equity"
  },
  {
    name: "ICICI Pru Balanced Advantage",
    type: "Hybrid Fund",
    nav: "₹55.80",
    yearReturn: "12.4%",
    rating: 5,
    riskLevel: "Moderate",
    category: "Hybrid"
  }
];

const fixedDeposits = [
  {
    name: "SBI Special FD",
    type: "Fixed Deposit",
    bank: "State Bank of India",
    interestRate: "7.10%",
    tenure: "2-3 years",
    minAmount: "₹10,000",
    rating: 5,
    riskLevel: "Low",
    category: "Bank FD",
    features: ["Senior Citizen Bonus", "Premature Withdrawal", "Auto Renewal"]
  },
  {
    name: "HDFC Corporate FD",
    type: "Fixed Deposit",
    bank: "HDFC Bank",
    interestRate: "7.35%",
    tenure: "3-5 years",
    minAmount: "₹25,000",
    rating: 4,
    riskLevel: "Low",
    category: "Corporate FD",
    features: ["Higher Interest Rate", "Monthly Interest Payout", "Online Management"]
  },
  {
    name: "ICICI Tax Saver FD",
    type: "Fixed Deposit",
    bank: "ICICI Bank",
    interestRate: "6.90%",
    tenure: "5 years",
    minAmount: "₹15,000",
    rating: 5,
    riskLevel: "Low",
    category: "Tax Saving FD",
    features: ["Tax Benefits", "Lock-in Period", "Quarterly Interest"]
  }
];

const bonds = [
  {
    name: "RBI Floating Rate Bonds",
    type: "Government Bond",
    issuer: "Reserve Bank of India",
    interestRate: "7.15%",
    tenure: "7 years",
    minAmount: "₹1,000",
    rating: 5,
    riskLevel: "Low",
    category: "Sovereign Bond",
    features: ["Guaranteed Returns", "Interest Rate Reset", "No TDS"]
  },
  {
    name: "NHAI Tax-Free Bonds",
    type: "Infrastructure Bond",
    issuer: "National Highways Authority",
    interestRate: "5.75%",
    tenure: "10 years",
    minAmount: "₹10,000",
    rating: 4,
    riskLevel: "Low",
    category: "Tax-Free Bond",
    features: ["Tax-Free Interest", "Listed on Exchange", "High Liquidity"]
  },
  {
    name: "Corporate AAA Bonds",
    type: "Corporate Bond",
    issuer: "Multiple Companies",
    interestRate: "8.50%",
    tenure: "3-5 years",
    minAmount: "₹100,000",
    rating: 4,
    riskLevel: "Moderate",
    category: "Corporate Bond",
    features: ["Higher Returns", "Market Tradable", "Credit Rated"]
  }
];

const realEstate = [
  {
    name: "Commercial REITs",
    type: "REIT",
    developer: "Embassy Office Parks",
    expectedReturn: "8-10%",
    lockInPeriod: "None",
    minAmount: "₹50,000",
    rating: 5,
    riskLevel: "Moderate",
    category: "Commercial",
    features: ["Regular Rental Income", "Professional Management", "High Liquidity"]
  },
  {
    name: "Residential Property Fund",
    type: "Real Estate Fund",
    developer: "HDFC Property Fund",
    expectedReturn: "12-15%",
    lockInPeriod: "3 years",
    minAmount: "₹200,000",
    rating: 4,
    riskLevel: "High",
    category: "Residential",
    features: ["Capital Appreciation", "Diversified Portfolio", "Expert Management"]
  },
  {
    name: "Warehouse REIT",
    type: "REIT",
    developer: "IndoSpace Logistics",
    expectedReturn: "9-11%",
    lockInPeriod: "None",
    minAmount: "₹100,000",
    rating: 4,
    riskLevel: "Moderate",
    category: "Industrial",
    features: ["E-commerce Growth", "Strategic Locations", "Stable Returns"]
  }
];

const Recommendations = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedRisk, setSelectedRisk] = useState("All");

  const filterTypes = ["All", "Stocks", "Mutual Funds", "Fixed Deposits", "Bonds", "Real Estate"];
  const riskLevels = ["All", "Low", "Moderate", "High"];

  const filteredInvestments = investments.filter(inv => 
    (selectedType === "All" || selectedType === "Stocks") &&
    (selectedRisk === "All" || inv.riskLevel === selectedRisk)
  );

  const filteredMutualFunds = mutualFunds.filter(fund =>
    (selectedType === "All" || selectedType === "Mutual Funds") &&
    (selectedRisk === "All" || fund.riskLevel === selectedRisk)
  );

  const filteredFDs = fixedDeposits.filter(fd =>
    (selectedType === "All" || selectedType === "Fixed Deposits") &&
    (selectedRisk === "All" || fd.riskLevel === selectedRisk)
  );

  const filteredBonds = bonds.filter(bond =>
    (selectedType === "All" || selectedType === "Bonds") &&
    (selectedRisk === "All" || bond.riskLevel === selectedRisk)
  );

  const filteredRealEstate = realEstate.filter(property =>
    (selectedType === "All" || selectedType === "Real Estate") &&
    (selectedRisk === "All" || property.riskLevel === selectedRisk)
  );

  const hasFilteredResults = 
    filteredInvestments.length > 0 ||
    filteredMutualFunds.length > 0 ||
    filteredFDs.length > 0 ||
    filteredBonds.length > 0 ||
    filteredRealEstate.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Smart Investment Recommendations
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered investment suggestions tailored for Indian markets based on your risk profile and goals
          </p>
        </div>

        {/* Market Sentiment Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Market Sentiment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">FII Flow</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">₹2,850 Cr (Positive)</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <BarChart2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Market Trend</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">Bullish</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Risk Level</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">Moderate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Investment Type</label>
            <div className="flex flex-wrap gap-2">
              {filterTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedType === type
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Risk Level</label>
            <div className="flex flex-wrap gap-2">
              {riskLevels.map(risk => (
                <button
                  key={risk}
                  onClick={() => setSelectedRisk(risk)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedRisk === risk
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {risk}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* No Results Message */}
        {!hasFilteredResults && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <Target className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No matching investments found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                Try adjusting your filters or selecting different investment types to see more options.
              </p>
            </div>
          </div>
        )}

        {/* Stock Recommendations */}
        {filteredInvestments.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-indigo-500" />
              Stock Recommendations
            </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {filteredInvestments.map((investment) => (
              <div 
                key={investment.symbol}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{investment.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{investment.symbol} • {investment.type}</p>
                  </div>
                  <div className={`flex items-center ${
                    investment.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {investment.change >= 0 ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    <span className="font-medium">{Math.abs(investment.change)}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Current Price</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{investment.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Expected Return</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{investment.expectedReturn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Risk Level</p>
                    <p className={`text-sm font-medium ${
                      investment.riskLevel === 'Low' ? 'text-green-600 dark:text-green-400' :
                      investment.riskLevel === 'Moderate' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {investment.riskLevel}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{investment.reason}</p>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Mutual Fund Recommendations */}
        {filteredMutualFunds.length > 0 && (
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Briefcase className="h-6 w-6 mr-2 text-indigo-500" />
              Recommended Mutual Funds
            </h2>
          <div className="grid gap-6 md:grid-cols-2">
              {filteredMutualFunds.map((fund) => (
              <div 
                key={fund.name}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{fund.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{fund.type} • {fund.category}</p>
                  </div>
                  <div className="flex">
                    {[...Array(fund.rating)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">NAV</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{fund.nav}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">1Y Return</p>
                    <p className="text-lg font-semibold text-green-600 dark:text-green-400">{fund.yearReturn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Risk Level</p>
                    <p className={`text-sm font-medium ${
                      fund.riskLevel === 'Low' ? 'text-green-600 dark:text-green-400' :
                      fund.riskLevel === 'Moderate' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {fund.riskLevel}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Fixed Deposits Section */}
        {filteredFDs.length > 0 && (
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Landmark className="h-6 w-6 mr-2 text-indigo-500" />
              Fixed Deposits
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {filteredFDs.map((fd) => (
                <div 
                  key={fd.name}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transform hover:scale-[1.02] transition-all hover:shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{fd.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                          {fd.type}
                        </span>
                        <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {fd.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex bg-yellow-50 dark:bg-yellow-900/30 p-1 rounded-lg">
                      {[...Array(fd.rating)].map((_, i) => (
                        <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Interest Rate</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{fd.interestRate}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Tenure</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{fd.tenure}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Min Amount</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{fd.minAmount}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {fd.features.map((feature, index) => (
                      <span key={index} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bonds Section */}
        {filteredBonds.length > 0 && (
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Wallet className="h-6 w-6 mr-2 text-indigo-500" />
              Bonds
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {filteredBonds.map((bond) => (
                <div 
                  key={bond.name}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transform hover:scale-[1.02] transition-all hover:shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{bond.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                          {bond.type}
                        </span>
                        <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {bond.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex bg-yellow-50 dark:bg-yellow-900/30 p-1 rounded-lg">
                      {[...Array(bond.rating)].map((_, i) => (
                        <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Interest Rate</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{bond.interestRate}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Tenure</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{bond.tenure}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Min Amount</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{bond.minAmount}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {bond.features.map((feature, index) => (
                      <span key={index} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Real Estate Section */}
        {filteredRealEstate.length > 0 && (
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Building2 className="h-6 w-6 mr-2 text-indigo-500" />
              Real Estate Investment Opportunities
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {filteredRealEstate.map((property) => (
                <div 
                  key={property.name}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transform hover:scale-[1.02] transition-all hover:shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{property.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                          {property.type}
                        </span>
                        <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {property.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex bg-yellow-50 dark:bg-yellow-900/30 p-1 rounded-lg">
                      {[...Array(property.rating)].map((_, i) => (
                        <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Expected Return</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{property.expectedReturn}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Lock-in Period</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{property.lockInPeriod}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Min Amount</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{property.minAmount}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature, index) => (
                      <span key={index} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Investment Strategy Section - Only show if there are filtered results */}
        {hasFilteredResults && (
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-indigo-500" />
              Recommended Investment Strategy
            </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">Conservative</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-green-700 dark:text-green-300">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>40% Large Cap Funds</span>
                  </li>
                  <li className="flex items-center text-green-700 dark:text-green-300">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>30% Debt Funds</span>
                  </li>
                  <li className="flex items-center text-green-700 dark:text-green-300">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>20% Index Funds</span>
                  </li>
                  <li className="flex items-center text-green-700 dark:text-green-300">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>10% Gold ETFs</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">Moderate</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-yellow-700 dark:text-yellow-300">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>40% Multi Cap Funds</span>
                  </li>
                  <li className="flex items-center text-yellow-700 dark:text-yellow-300">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>25% Mid Cap Funds</span>
                  </li>
                  <li className="flex items-center text-yellow-700 dark:text-yellow-300">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>20% Debt Funds</span>
                  </li>
                  <li className="flex items-center text-yellow-700 dark:text-yellow-300">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>15% Sectoral Funds</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">Aggressive</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-red-700 dark:text-red-300">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>40% Small Cap Funds</span>
                  </li>
                  <li className="flex items-center text-red-700 dark:text-red-300">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>30% Mid Cap Funds</span>
                  </li>
                  <li className="flex items-center text-red-700 dark:text-red-300">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>20% Sectoral Funds</span>
                  </li>
                  <li className="flex items-center text-red-700 dark:text-red-300">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <span>10% International Funds</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;