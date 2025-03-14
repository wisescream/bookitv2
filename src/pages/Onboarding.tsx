
import { motion } from 'framer-motion';
import OnboardingCarousel from '@/components/OnboardingCarousel';

const Onboarding = () => {
  return (
    <motion.div 
      className="h-screen w-screen flex flex-col onboarding-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <OnboardingCarousel />
    </motion.div>
  );
};

export default Onboarding;
