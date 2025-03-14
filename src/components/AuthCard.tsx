
import { useState } from 'react';
import { motion } from 'framer-motion';
import AuthForm from './AuthForm';

const AuthCard = () => {
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('signup');

  return (
    <motion.div
      className="glass-card rounded-t-3xl overflow-hidden w-full max-w-md"
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", damping: 25 }}
    >
      <div className="flex w-full border-b border-gray-100">
        <button
          className={`flex-1 py-4 text-base font-medium relative ${
            activeTab === 'signup' ? 'text-foodapp-primary green-accent' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('signup')}
        >
          Create Account
        </button>
        <button
          className={`flex-1 py-4 text-base font-medium relative ${
            activeTab === 'login' ? 'text-foodapp-primary green-accent' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
      </div>
      
      <div className="p-6">
        <AuthForm type={activeTab} />
      </div>
    </motion.div>
  );
};

export default AuthCard;
