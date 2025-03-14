
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Search, Home, Menu, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <header className="px-6 pt-6 pb-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foodapp-text">BOOKIT</h1>
            <div className="flex items-center text-foodapp-primary mt-1">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm font-medium">New York, NYC</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 bg-white shadow-sm">
            <Search size={20} />
          </Button>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold mb-2">Welcome to BOOKIT</h2>
          <p className="text-foodapp-muted text-sm">
            Find and book your favorite restaurants easily
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-20">
        <section className="my-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Nearby Restaurants</h3>
            <Button variant="link" className="text-foodapp-primary p-0">See All</Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="h-24 bg-gray-200"></div>
                <div className="p-3">
                  <h4 className="font-medium text-sm truncate">Restaurant {item}</h4>
                  <div className="flex items-center mt-1">
                    <div className="text-yellow-500 text-xs">★★★★☆</div>
                    <div className="text-xs text-foodapp-muted ml-1">4.5</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="my-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Popular Categories</h3>
            <Button variant="link" className="text-foodapp-primary p-0">See All</Button>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {['Pizza', 'Burger', 'Sushi', 'Italian', 'Mexican'].map((category) => (
              <div key={category} className="flex-shrink-0 text-center">
                <div className="w-16 h-16 bg-foodapp-light rounded-full flex items-center justify-center mb-1">
                  <div className="w-8 h-8 rounded-full bg-foodapp-primary/20"></div>
                </div>
                <span className="text-xs">{category}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3">
        <Button variant="ghost" className="flex flex-col items-center p-1 h-auto">
          <Home size={20} className="text-foodapp-primary" />
          <span className="text-xs mt-1">Home</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center p-1 h-auto">
          <Search size={20} className="text-gray-400" />
          <span className="text-xs mt-1">Search</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center p-1 h-auto">
          <Menu size={20} className="text-gray-400" />
          <span className="text-xs mt-1">Orders</span>
        </Button>
        <Button 
          variant="ghost" 
          className="flex flex-col items-center p-1 h-auto"
          onClick={() => navigate('/auth')}
        >
          <User size={20} className="text-gray-400" />
          <span className="text-xs mt-1">Profile</span>
        </Button>
      </nav>
    </motion.div>
  );
};

export default Index;
