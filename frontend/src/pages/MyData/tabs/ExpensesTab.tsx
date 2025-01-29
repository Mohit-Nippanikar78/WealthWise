import React, { useState, useEffect } from 'react';
import { DollarSign, Plus, Trash2, Edit2, X, ShoppingCart, Home, Car, Utensils, Heart, Plane, Smartphone, Zap } from 'lucide-react';

interface Expense {
  id: string;
  name: string;
  amount: number;
  category: 'shopping' | 'housing' | 'transport' | 'food' | 'health' | 'travel' | 'utilities' | 'other';
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'one-time';
  date: string;
  isEssential: boolean;
}

const categoryIcons = {
  shopping: ShoppingCart,
  housing: Home,
  transport: Car,
  food: Utensils,
  health: Heart,
  travel: Plane,
  utilities: Zap,
  other: Smartphone
};

const categoryColors = {
  shopping: 'blue',
  housing: 'green',
  transport: 'orange',
  food: 'yellow',
  health: 'red',
  travel: 'purple',
  utilities: 'indigo',
  other: 'gray'
};

export const ExpensesTab = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: 'housing',
    frequency: 'monthly',
    date: new Date().toISOString().split('T')[0],
    isEssential: true
  });

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('userExpenses');
    if (savedExpenses) {
      try {
        const parsedExpenses = JSON.parse(savedExpenses);
        setExpenses(parsedExpenses);
      } catch (error) {
        console.error('Error loading expenses from localStorage:', error);
        setExpenses([]);
      }
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userExpenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAdd = () => {
    setIsEditing(false);
    setFormData({
      name: '',
      amount: '',
      category: 'housing',
      frequency: 'monthly',
      date: new Date().toISOString().split('T')[0],
      isEssential: true
    });
    setIsModalOpen(true);
  };

  const handleEdit = (expense: Expense) => {
    setIsEditing(true);
    setSelectedExpense(expense.id);
    setFormData({
      name: expense.name,
      amount: expense.amount.toString(),
      category: expense.category,
      frequency: expense.frequency,
      date: expense.date,
      isEssential: expense.isEssential
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: Expense = {
      id: isEditing ? selectedExpense! : Math.random().toString(36).substr(2, 9),
      name: formData.name,
      amount: parseFloat(formData.amount),
      category: formData.category as Expense['category'],
      frequency: formData.frequency as Expense['frequency'],
      date: formData.date,
      isEssential: formData.isEssential
    };

    if (isEditing) {
      setExpenses(expenses.map(expense => expense.id === selectedExpense ? newExpense : expense));
    } else {
      setExpenses([...expenses, newExpense]);
    }

    setIsModalOpen(false);
  };

  const getTotalMonthlyExpenses = () => {
    return expenses.reduce((total, expense) => {
      const amount = expense.amount;
      switch (expense.frequency) {
        case 'daily':
          return total + (amount * 30);
        case 'weekly':
          return total + (amount * 4);
        case 'monthly':
          return total + amount;
        case 'yearly':
          return total + (amount / 12);
        case 'one-time':
          return total;
        default:
          return total;
      }
    }, 0);
  };

  const getEssentialExpenses = () => {
    return expenses
      .filter(expense => expense.isEssential)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getCategoryTotal = (category: Expense['category']) => {
    return expenses
      .filter(expense => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const fillDemoData = () => {
    const demoExpenses = [
      {
        name: "Monthly Rent",
        amount: "25000",
        category: "housing",
        frequency: "monthly",
        date: new Date().toISOString().split('T')[0],
        isEssential: true
      },
      {
        name: "Grocery Shopping",
        amount: "12000",
        category: "food",
        frequency: "monthly",
        date: new Date().toISOString().split('T')[0],
        isEssential: true
      },
      {
        name: "Phone Bill",
        amount: "999",
        category: "utilities",
        frequency: "monthly",
        date: new Date().toISOString().split('T')[0],
        isEssential: true
      },
      {
        name: "Weekend Trip",
        amount: "15000",
        category: "travel",
        frequency: "one-time",
        date: new Date().toISOString().split('T')[0],
        isEssential: false
      },
      {
        name: "New Laptop",
        amount: "85000",
        category: "shopping",
        frequency: "one-time",
        date: new Date().toISOString().split('T')[0],
        isEssential: false
      },
      {
        name: "Health Insurance",
        amount: "20000",
        category: "health",
        frequency: "yearly",
        date: new Date().toISOString().split('T')[0],
        isEssential: true
      }
    ];

    const randomExpense = demoExpenses[Math.floor(Math.random() * demoExpenses.length)];
    setFormData(randomExpense);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-8">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-medium opacity-90">Total Monthly Expenses</h3>
          <div className="mt-4 flex items-baseline">
            <span className="text-3xl font-bold">{formatCurrency(getTotalMonthlyExpenses())}</span>
            <span className="ml-2 text-sm opacity-75">/month</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Essential Expenses</h4>
            <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
              {formatCurrency(getEssentialExpenses())}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Categories</h4>
            <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
              {new Set(expenses.map(e => e.category)).size}
            </p>
          </div>
          </div>
        </div>

      {/* Category Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(categoryIcons).map(([category, Icon]) => (
          <div 
            key={category}
            className={`p-4 rounded-xl bg-${categoryColors[category as keyof typeof categoryColors]}-50 dark:bg-${categoryColors[category as keyof typeof categoryColors]}-900/20`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-${categoryColors[category as keyof typeof categoryColors]}-100 dark:bg-${categoryColors[category as keyof typeof categoryColors]}-900/30`}>
                <Icon className={`h-5 w-5 text-${categoryColors[category as keyof typeof categoryColors]}-500`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                  {category}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(getCategoryTotal(category as Expense['category']))}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expenses List */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Expenses List</h2>
          <button
            onClick={handleAdd}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Expense
          </button>
        </div>

        <div className="space-y-4">
          {expenses.map((expense) => {
            const Icon = categoryIcons[expense.category];
            const color = categoryColors[expense.category];
            return (
              <div
                key={expense.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-900/30`}>
                      <Icon className={`h-6 w-6 text-${color}-500`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white flex items-center">
                        {expense.name}
                        {expense.isEssential && (
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                            Essential
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {expense.frequency.charAt(0).toUpperCase() + expense.frequency.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(expense.amount)}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(expense)}
                        className="p-1 text-gray-400 hover:text-gray-500"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {isEditing ? 'Edit Expense' : 'Add New Expense'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expense Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 dark:bg-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">₹</span>
                  </div>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 dark:bg-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 dark:bg-gray-700"
                  >
                    {Object.keys(categoryIcons).map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Frequency
                  </label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 dark:bg-gray-700"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="one-time">One-time</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 dark:bg-gray-700"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isEssential"
                  checked={formData.isEssential}
                  onChange={(e) => setFormData({ ...formData, isEssential: e.target.checked })}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="isEssential" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  This is an essential expense
                </label>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={fillDemoData}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Demo Data
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700"
                >
                  {isEditing ? 'Save Changes' : 'Add Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}; 