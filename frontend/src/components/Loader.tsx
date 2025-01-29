import { motion } from 'framer-motion';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'white';
}

const Loader = ({ size = 'medium', color = 'primary' }: LoaderProps) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  const colorClasses = {
    primary: 'text-indigo-600 dark:text-indigo-400',
    white: 'text-white'
  };

  const circleVariants = {
    initial: { opacity: 0, y: 0 },
    animate: { 
      opacity: [0.2, 1, 0.2],
      y: [-2, 2, -2],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const containerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className={`relative ${sizeClasses[size]}`}
        animate="animate"
        variants={containerVariants}
      >
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            className={`absolute w-3 h-3 rounded-full ${colorClasses[color]}`}
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${index * 45}deg) translate(0, -${size === 'small' ? '12' : size === 'medium' ? '16' : '20'}px)`,
              transformOrigin: '0 50%'
            }}
            variants={circleVariants}
            initial="initial"
            animate="animate"
            custom={index}
          />
        ))}
      </motion.div>
      <motion.div
        className={`mt-4 text-center ${colorClasses[color]}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="font-medium"
        >
          Loading
        </motion.span>
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
        >
          .
        </motion.span>
      </motion.div>
    </div>
  );
};

export default Loader; 