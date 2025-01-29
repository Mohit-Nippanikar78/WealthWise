import { useState, useEffect } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  AlertTriangle,
  Target
} from 'lucide-react';
import TopLoadingBar from 'react-top-loading-bar';

import { GoalsTab } from './tabs/GoalsTab';
import { RiskToleranceTab } from './tabs/RiskToleranceTab';
import { IncomeTab } from './tabs/IncomeTab';
import { ExpensesTab } from './tabs/ExpensesTab';
import { AssetsTab } from './tabs/AssetsTab';
import { LiabilitiesTab } from './tabs/LiabilitiesTab';

type TabType = 'goals' | 'risk' | 'income' | 'expenses' | 'assets' | 'liabilities';

const MyData = () => {
  const [activeTab, setActiveTab] = useState<TabType>('goals');
  const [progress, setProgress] = useState(0);

  const tabs = [
    { 
      id: 'goals' as TabType, 
      label: 'Goals', 
      icon: Target,
      activeColor: 'text-emerald-600',
      hoverColor: 'hover:text-emerald-500'
    },
    { 
      id: 'risk' as TabType, 
      label: 'Risk Tolerance', 
      icon: AlertTriangle,
      activeColor: 'text-yellow-600',
      hoverColor: 'hover:text-yellow-500'
    },
    { 
      id: 'income' as TabType, 
      label: 'Income', 
      icon: TrendingUp,
      activeColor: 'text-indigo-600',
      hoverColor: 'hover:text-indigo-500'
    },
    { 
      id: 'expenses' as TabType, 
      label: 'Expenses', 
      icon: TrendingDown,
      activeColor: 'text-red-600',
      hoverColor: 'hover:text-red-500'
    },
    { 
      id: 'assets' as TabType, 
      label: 'Assets', 
      icon: Wallet,
      activeColor: 'text-emerald-600',
      hoverColor: 'hover:text-emerald-500'
    },
    { 
      id: 'liabilities' as TabType, 
      label: 'Liabilities', 
      icon: BarChart2,
      activeColor: 'text-gray-600',
      hoverColor: 'hover:text-gray-500'
    },
  ];

  useEffect(() => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    const newProgress = ((currentIndex + 1) / tabs.length) * 100;
    setProgress(newProgress);
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'goals':
        return <GoalsTab />;
      case 'risk':
        return <RiskToleranceTab />;
      case 'income':
        return <IncomeTab />;
      case 'expenses':
        return <ExpensesTab />;
      case 'assets':
        return <AssetsTab />;
      case 'liabilities':
        return <LiabilitiesTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <TopLoadingBar
        progress={progress}
        color="#4f46e5"
        height={4}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex space-x-1 rounded-xl bg-gray-200 dark:bg-gray-700 p-1 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? `bg-white dark:bg-gray-800 ${tab.activeColor} shadow-sm`
                    : `text-gray-500 dark:text-gray-400 ${tab.hoverColor}`
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? tab.activeColor : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default MyData;
