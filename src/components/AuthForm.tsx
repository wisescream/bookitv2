
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";

interface AuthFormProps {
  type: 'signup' | 'login';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: type === 'signup' ? "Account created!" : "Successfully logged in!",
        description: "Welcome to FoodMedia",
      });
    }, 1500);
  };

  const handleGoogleAuth = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Google Authentication",
        description: `${type === 'signup' ? 'Sign up' : 'Login'} with Google successful!`,
      });
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'signup' && (
          <div className="space-y-2">
            <label htmlFor="fullname" className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <Input
              id="fullname"
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-200 focus:border-foodapp-primary focus:ring-0"
              required
            />
          </div>
        )}
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Eg namaemail@emailkamu.com"
            className="w-full border border-gray-200 focus:border-foodapp-primary focus:ring-0"
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            {type === 'login' && (
              <a href="#" className="text-xs text-foodapp-primary">
                Forget Password?
              </a>
            )}
          </div>
          <Input
            id="password"
            type="password"
            placeholder="●●●● ●●●● ●●●●"
            className="w-full border border-gray-200 focus:border-foodapp-primary focus:ring-0"
            required
          />
        </div>
        
        <Button
          type="submit"
          className={`w-full ${
            type === 'login' 
              ? 'bg-foodapp-light text-foodapp-primary hover:bg-foodapp-light/80' 
              : 'bg-foodapp-primary text-white hover:bg-foodapp-primary/90'
          }`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-current rounded-full"></span>
              {type === 'signup' ? 'Creating Account...' : 'Logging in...'}
            </span>
          ) : (
            type === 'signup' ? 'Registration' : 'Login'
          )}
        </Button>
        
        <div className="relative flex justify-center items-center">
          <div className="border-t border-gray-200 flex-1"></div>
          <div className="px-4 text-sm text-gray-400">or</div>
          <div className="border-t border-gray-200 flex-1"></div>
        </div>
        
        <Button
          type="button"
          variant="outline"
          className="w-full border border-gray-200 flex items-center justify-center gap-2"
          onClick={handleGoogleAuth}
          disabled={loading}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path
              d="M18.171 8.3465H17.5013V8.30078H10.0013V11.6341H14.7097C14.1185 13.583 12.2685 14.9674 10.0013 14.9674C7.10384 14.9674 4.7513 12.6149 4.7513 9.71743C4.7513 6.81999 7.10384 4.46743 10.0013 4.46743C11.3722 4.46743 12.6185 4.98784 13.5672 5.85113L15.9826 3.43571C14.4588 2.02526 12.3347 1.13413 10.0013 1.13413C5.26051 1.13413 1.41797 4.97668 1.41797 9.71743C1.41797 14.4582 5.26051 18.3007 10.0013 18.3007C14.7422 18.3007 18.5847 14.4582 18.5847 9.71743C18.5847 9.24843 18.5097 8.79322 18.171 8.3465Z"
              fill="#FFC107"
            />
            <path
              d="M2.30078 5.92142L5.0766 7.92775C5.87911 5.93555 7.762 4.46731 9.99995 4.46731C11.3708 4.46731 12.6172 4.98773 13.5658 5.85102L15.9812 3.4356C14.4575 2.02514 12.3333 1.13402 9.99995 1.13402C6.64995 1.13402 3.76495 3.06377 2.30078 5.92142Z"
              fill="#FF3D00"
            />
            <path
              d="M10.0013 18.3008C12.2846 18.3008 14.3688 17.4441 15.8838 16.0833L13.275 13.8375C12.3518 14.5384 11.2211 14.9683 10.0013 14.9675C7.74251 14.9675 5.89834 13.5958 5.29959 11.6608L2.55469 13.8375C3.99459 16.6542 6.84292 18.3008 10.0013 18.3008Z"
              fill="#4CAF50"
            />
            <path
              d="M18.1698 8.34656H17.5V8.30078H10V11.6341H14.7083C14.4308 12.5589 13.8817 13.3766 13.1233 13.9725L13.1242 13.9717L15.7329 16.2175C15.5513 16.3842 18.5833 14.1675 18.5833 9.71747C18.5833 9.24847 18.5083 8.79327 18.1698 8.34656Z"
              fill="#1976D2"
            />
          </svg>
          <span>{type === 'signup' ? 'Sign up with Google' : 'Login with Google'}</span>
        </Button>
      </form>
      
      {type === 'signup' && (
        <div className="mt-6 text-center text-xs text-gray-500">
          By Logging In Or Registering, You Have Agreed To The{' '}
          <a href="#" className="text-foodapp-primary">
            Terms And Conditions
          </a>{' '}
          And{' '}
          <a href="#" className="text-foodapp-primary">
            Privacy Policy
          </a>
          .
        </div>
      )}
    </motion.div>
  );
};

export default AuthForm;
