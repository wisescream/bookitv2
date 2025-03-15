
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import VenueHeader from '@/components/VenueHeader';
import BottomNavigation from '@/components/BottomNavigation';

type VenuePageLayoutProps = {
  title: string;
  loading: boolean;
  activeTab: string;
  onTabChange: (value: string) => void;
  allContent: ReactNode;
  nearbyContent: ReactNode;
  bestContent: ReactNode;
};

const VenuePageLayout: React.FC<VenuePageLayoutProps> = ({
  title,
  loading,
  activeTab,
  onTabChange,
  allContent,
  nearbyContent,
  bestContent
}) => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <VenueHeader title={title} />

      <main className="flex-1 px-6 pb-20">
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-gray-200 rounded-xl h-48 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="nearby">Nearby</TabsTrigger>
              <TabsTrigger value="best">Best</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-6">
              {allContent}
            </TabsContent>
            
            <TabsContent value="nearby">
              {nearbyContent}
            </TabsContent>
            
            <TabsContent value="best">
              {bestContent}
            </TabsContent>
          </Tabs>
        )}
      </main>

      <BottomNavigation />
    </motion.div>
  );
};

export default VenuePageLayout;
