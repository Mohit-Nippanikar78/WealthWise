import { motion } from 'framer-motion';

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center z-50 overflow-hidden">
      <div className="relative w-full max-w-md">
        {/* Animated Background Layers */}
        <motion.div 
          className="absolute -inset-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full blur-3xl opacity-50"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0],
            transition: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />

        {/* Loader Container */}
        <div className="relative z-10 bg-white dark:bg-gray-800/60 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-gray-100 dark:border-gray-700/50">
          {/* Animated Loader */}
          <motion.div 
            className="w-32 h-32 mx-auto relative"
            animate={{
              scale: [1, 1.05, 1],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {/* Circular Loader */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-indigo-500 dark:text-indigo-400 opacity-20"
                initial={{ pathLength: 0 }}
                animate={{
                  pathLength: [0, 1, 0],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
                className="text-indigo-600 dark:text-indigo-300"
                initial={{ pathLength: 0 }}
                animate={{
                  pathLength: [0, 1],
                  rotate: [0, 360],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
            </svg>

            {/* Animated Dots */}
            {/* {[...Array(4)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute w-3 h-3 bg-indigo-500 dark:bg-indigo-400 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateX(25px)`
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }
                }}
              />
            ))} */}
          </motion.div>

          {/* Loading Text */}
          <motion.p 
            className="mt-8 text-center text-gray-600 dark:text-gray-300 text-lg font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.5 }
            }}
          >
            Preparing your dashboard...
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default FullPageLoader;