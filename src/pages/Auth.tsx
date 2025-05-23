
import { motion } from 'framer-motion';
import AuthCard from '@/components/AuthCard';
import { useEffect } from 'react';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';

const Auth = () => {
  useEffect(() => {
    // Handle the back button for Android devices
    const setupBackButton = async () => {
      const backButtonListener = await App.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) {
          App.exitApp();
        }
      });

      return backButtonListener;
    };
    
    // Set status bar to dark content on light background
    const setupStatusBar = async () => {
      try {
        await StatusBar.setStyle({ style: Style.Light });
      } catch (error) {
        // Web environment or status bar plugin not available
        console.log('Status bar customization skipped');
      }
    };
    
    let listener: { remove: () => void } | undefined;
    
    setupBackButton().then(backButtonListener => {
      listener = backButtonListener;
    }).catch(error => {
      console.error('Error setting up back button listener:', error);
    });
    
    setupStatusBar();

    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, []);

  return (
    <motion.div 
      className="min-h-screen w-screen flex flex-col onboarding-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-6">
        <motion.div 
          className="mb-4 w-full max-w-md px-8"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-full relative flex justify-center mb-6">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-foodapp-primary rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="white"/>
                </svg>
              </div>
            </div>
            <img 
              src="/lovable-uploads/20c5a539-3b65-4535-9300-5fa141f9b81b.png" 
              alt="Welcome" 
              className="w-32 h-32 object-contain mt-4"
            />
          </div>
          
          <motion.h1 
            className="text-2xl font-semibold text-center mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Welcome to BOOKIT
          </motion.h1>
          
          <motion.p 
            className="text-foodapp-muted text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Before enjoying BOOKIT services<br />Please register first
          </motion.p>
        </motion.div>
        
        <AuthCard />
      </div>
    </motion.div>
  );
};

export default Auth;
