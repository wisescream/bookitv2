
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, User, Mail, Save, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile, signOut } = useAuth();
  
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          full_name: fullName,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Update failed',
        description: 'There was an error updating your profile',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <header className="px-6 pt-6 pb-4">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2 p-0 h-8 w-8"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={24} />
          </Button>
          <h1 className="text-xl font-bold">My Profile</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-20">
        <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={32} className="text-gray-400" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-9"
                />
                <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Input
                  id="email"
                  value={email}
                  disabled
                  className="pl-9 bg-gray-50"
                />
                <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>
            
            <Button 
              onClick={handleSaveProfile}
              disabled={loading || !fullName.trim()}
              className="w-full mt-2 bg-foodapp-primary hover:bg-foodapp-primary/90"
            >
              {loading ? 'Saving...' : 'Save Profile'}
              {!loading && <Save size={16} className="ml-2" />}
            </Button>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
          onClick={signOut}
        >
          <LogOut size={16} className="mr-2" />
          Sign Out
        </Button>
      </main>
    </motion.div>
  );
};

export default Profile;
