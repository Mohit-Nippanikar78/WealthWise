import React, { useState, useEffect } from 'react';
import { Target, DollarSign, Home, Briefcase, GraduationCap, Car, Plus, Trash2, X, Edit2, LucideIcon, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Goal {
  id: string;
  name: string;
  icon: LucideIcon;
  target: string;
  current: string;
}

type IconType = keyof typeof availableIcons;

const availableIcons = {
  Briefcase,
  Home,
  GraduationCap,
  Car,
  Target
} as const;

// Add currency formatter
const formatToINR = (amount: string | number) => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount.replace(/[₹,]/g, '')) : amount;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(numericAmount);
};

export const GoalsTab = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    icon: 'Briefcase' as IconType,
    target: '',
    current: ''
  });

  // Load goals from localStorage on component mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('userFinancialGoals');
    if (savedGoals) {
      try {
        const parsedGoals = JSON.parse(savedGoals);
        const reconstitutedGoals = parsedGoals.map((goal: any) => ({
          ...goal,
          icon: availableIcons[goal.iconName as keyof typeof availableIcons]
        }));
        setGoals(reconstitutedGoals);
      } catch (error) {
        console.error('Error loading goals from localStorage:', error);
        setGoals([]);
      }
    }
  }, []);

  useEffect(() => {
    const goalsToSave = goals.map(goal => ({
      ...goal,
      iconName: getIconForGoal(goal.icon),
      icon: undefined
    }));
    localStorage.setItem('userFinancialGoals', JSON.stringify(goalsToSave));
  }, [goals]);

  const handleAddGoal = () => {
    setIsEditing(false);
    setFormData({
      name: '',
      icon: 'Briefcase' as IconType,
      target: '',
      current: ''
    });
    setIsModalOpen(true);
  };

  const getIconForGoal = (goalIcon: LucideIcon): IconType => {
    const iconEntry = Object.entries(availableIcons).find(([_, icon]) => icon === goalIcon);
    return (iconEntry?.[0] as IconType) || 'Briefcase';
  };

  const handleEditGoal = () => {
    if (!selectedGoal) return;
    const goal = goals.find(g => g.id === selectedGoal);
    if (!goal) return;

    setIsEditing(true);
    setFormData({
      name: goal.name,
      icon: getIconForGoal(goal.icon),
      target: goal.target.replace(/[₹,]/g, ''),
      current: goal.current.replace(/[₹,]/g, '')
    });
    setIsModalOpen(true);
  };

  const handleDeleteGoal = () => {
    if (!selectedGoal) return;
    setGoals(goals.filter(goal => goal.id !== selectedGoal));
    setSelectedGoal(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedIcon = formData.icon as keyof typeof availableIcons;
    const newGoal: Goal = {
      id: isEditing ? selectedGoal! : Math.random().toString(36).substr(2, 9),
      name: formData.name,
      icon: availableIcons[selectedIcon],
      target: formatToINR(formData.target),
      current: formatToINR(formData.current)
    };

    if (isEditing) {
      setGoals(goals.map(goal => goal.id === selectedGoal ? newGoal : goal));
    } else {
      setGoals([...goals, newGoal]);
    }

    setIsModalOpen(false);
    setFormData({
      name: '',
      icon: 'Briefcase' as IconType,
      target: '',
      current: ''
    });
  };

  const calculateProgress = (current: string, target: string) => {
    const currentValue = parseFloat(current.replace(/[₹,]/g, ''));
    const targetValue = parseFloat(target.replace(/[₹,]/g, ''));
    return ((currentValue / targetValue) * 100).toFixed(1);
  };

  const fillDemoData = () => {
    const demoGoals = [
      {
        name: "Dream House",
        icon: "Home" as IconType,
        target: "5000000",
        current: "2000000"
      },
      {
        name: "Higher Education",
        icon: "GraduationCap" as IconType,
        target: "2500000",
        current: "1000000"
      },
      {
        name: "Startup Fund",
        icon: "Briefcase" as IconType,
        target: "1000000",
        current: "300000"
      },
      {
        name: "Luxury Car",
        icon: "Car" as IconType,
        target: "3000000",
        current: "500000"
      }
    ];

    const randomGoal = demoGoals[Math.floor(Math.random() * demoGoals.length)];
    setFormData(randomGoal);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Financial Goals</h2>
            <p className="mt-2 text-indigo-100">Track and manage your financial aspirations</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          onClick={handleAddGoal}
            className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 font-medium"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Goal
          </motion.button>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-indigo-100">Total Goals</p>
            <p className="text-3xl font-bold mt-1">{goals.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-indigo-100">Active Goals</p>
            <p className="text-3xl font-bold mt-1">{goals.filter(g => parseFloat(calculateProgress(g.current, g.target)) < 100).length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-indigo-100">Completed Goals</p>
            <p className="text-3xl font-bold mt-1">{goals.filter(g => parseFloat(calculateProgress(g.current, g.target)) >= 100).length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Goals List */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Goals</h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <AnimatePresence>
            {goals.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 text-center"
                  >
                    <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
                    <p className="text-gray-500 dark:text-gray-400">No goals added yet.</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Click "Add New Goal" to get started.</p>
                  </motion.div>
            ) : (
              goals.map((goal) => {
                const Icon = goal.icon;
                    const progress = parseFloat(calculateProgress(goal.current, goal.target));
                return (
                      <motion.button
                    key={goal.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    onClick={() => setSelectedGoal(goal.id)}
                        className={`w-full flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                      selectedGoal === goal.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                    }`}
                  >
                        <div className={`p-3 rounded-xl ${
                          progress >= 100 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                            : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                        }`}>
                          <Icon className="h-6 w-6" />
                    </div>
                        <div className="ml-4 flex-1 text-left">
                      <h3 className="font-medium text-gray-900 dark:text-white">{goal.name}</h3>
                          <div className="mt-1 flex items-center text-sm">
                            <div className="flex-1">
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                <div 
                                  className={`h-1.5 rounded-full transition-all duration-500 ${
                                    progress >= 100 
                                      ? 'bg-green-500' 
                                      : 'bg-indigo-600'
                                  }`}
                                  style={{ width: `${Math.min(progress, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                            <span className="ml-2 text-gray-500 dark:text-gray-400">{progress}%</span>
                          </div>
                    </div>
                        <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${
                          selectedGoal === goal.id ? 'rotate-90' : ''
                        }`} />
                      </motion.button>
                );
              })
            )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Goal Details */}
        <AnimatePresence mode="wait">
        {selectedGoal && (
            <motion.div 
              key={selectedGoal}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="lg:col-span-2"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Goal Details</h3>
                <div className="flex space-x-2">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    onClick={handleEditGoal}
                      className="inline-flex items-center px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    onClick={handleDeleteGoal}
                      className="inline-flex items-center px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                    </motion.button>
                  </div>
              </div>

                <div className="p-6 space-y-8">
              {/* Goal Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30 rounded-xl p-6">
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">Current Amount</p>
                      <div className="mt-2 flex items-center">
                    <DollarSign className="h-5 w-5 text-green-500" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white ml-1">
                      {goals.find(g => g.id === selectedGoal)?.current}
                    </span>
                  </div>
                </div>

                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/30 rounded-xl p-6">
                      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Target Amount</p>
                      <div className="mt-2 flex items-center">
                    <Target className="h-5 w-5 text-indigo-500" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white ml-1">
                      {goals.find(g => g.id === selectedGoal)?.target}
                    </span>
                  </div>
                </div>
              </div>

                  {/* Progress Section */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">Progress</h4>
                      <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {calculateProgress(
                        goals.find(g => g.id === selectedGoal)?.current || '0',
                        goals.find(g => g.id === selectedGoal)?.target || '1'
                      )}%
                    </span>
                  </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ 
                        width: `${calculateProgress(
                          goals.find(g => g.id === selectedGoal)?.current || '0',
                          goals.find(g => g.id === selectedGoal)?.target || '1'
                        )}%` 
                      }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-indigo-600 h-3 rounded-full"
                      />
                    </div>
                  </div>

              {/* Recommendations */}
                <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Smart Recommendations</h4>
                    <div className="grid gap-4">
                  {[
                        'Increase monthly contribution by ₹5,000 to reach goal faster',
                    'Consider more aggressive investment strategy',
                    'Review and rebalance portfolio quarterly',
                  ].map((recommendation, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl flex items-start space-x-3"
                        >
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500"></div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{recommendation}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
        )}
        </AnimatePresence>
      </div>

      {/* Add/Edit Goal Modal */}
      <AnimatePresence>
      {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full shadow-2xl"
            >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                  <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isEditing ? 'Edit Financial Goal' : 'Create New Goal'}
                </h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      {isEditing ? 'Update your financial goal details below.' : 'Define your new financial goal with the details below.'}
                    </p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="h-6 w-6" />
                  </motion.button>
                </div>
            </div>

            {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-6">
                {/* Goal Name */}
                  <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Goal Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                    placeholder="e.g., Dream House Down Payment"
                    required
                  />
                </div>

                {/* Icon Selection */}
                  <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Choose an Icon
                  </label>
                  <div className="grid grid-cols-5 gap-4">
                    {Object.entries(availableIcons).map(([name, Icon]) => (
                        <motion.button
                        key={name}
                        type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        onClick={() => setFormData({ ...formData, icon: name as IconType })}
                        className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
                          formData.icon === name 
                            ? 'bg-indigo-100 dark:bg-indigo-900/30 ring-2 ring-indigo-500 dark:ring-indigo-400' 
                            : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <Icon className={`h-6 w-6 ${
                          formData.icon === name 
                            ? 'text-indigo-600 dark:text-indigo-400' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`} />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          {name}
                        </span>
                        </motion.button>
                    ))}
                  </div>
                </div>

                {/* Amount Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-400">₹</span>
                    </div>
                    <input
                      type="number"
                      value={formData.target}
                      onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                      className="pl-12 w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                      placeholder="50,000"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Progress
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-400">₹</span>
                    </div>
                    <input
                      type="number"
                      value={formData.current}
                      onChange={(e) => setFormData({ ...formData, current: e.target.value })}
                      className="pl-12 w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                      placeholder="10,000"
                      required
                    />
                      </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={fillDemoData}
                    className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                  >
                    Demo Data
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                  >
                    {isEditing ? 'Save Changes' : 'Create Goal'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
      )}
      </AnimatePresence>
    </motion.div>
  );
}; 