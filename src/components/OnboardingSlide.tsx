
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface OnboardingSlideProps {
  image: string;
  title: string;
  description: string;
  active: boolean;
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  image,
  title,
  description,
  active
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center px-6 w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: active ? 1 : 0,
        y: active ? 0 : 20,
        transition: { duration: 0.5, delay: active ? 0.2 : 0 }
      }}
    >
      <motion.div 
        className="w-48 h-48 mb-8 relative"
        initial={{ scale: 0.9 }}
        animate={{ 
          scale: active ? 1 : 0.9,
          transition: { 
            duration: 0.7, 
            delay: active ? 0.1 : 0,
            type: "spring",
            stiffness: 100
          }
        }}
      >
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-contain"
        />
        
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{ 
            y: [0, -8, 0],
            transition: { 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut"
            }
          }}
        >
          <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
            <div className="w-4 h-4 bg-foodapp-accent rounded-full" />
          </div>
          <div className="absolute bottom-1/4 left-0 transform -translate-x-1/2">
            <div className="w-3 h-3 bg-foodapp-primary rounded-full" />
          </div>
        </motion.div>
      </motion.div>

      <motion.h2 
        className="text-2xl font-semibold text-foodapp-text mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: active ? 1 : 0,
          y: active ? 0 : 10,
          transition: { duration: 0.5, delay: active ? 0.3 : 0 }
        }}
      >
        {title}
      </motion.h2>
      
      <motion.p 
        className="text-center text-foodapp-muted max-w-xs"
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: active ? 1 : 0,
          y: active ? 0 : 10,
          transition: { duration: 0.5, delay: active ? 0.4 : 0 }
        }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default OnboardingSlide;
