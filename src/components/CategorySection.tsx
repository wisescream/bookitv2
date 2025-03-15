
import React from 'react';
import { Button } from '@/components/ui/button';

type Category = {
  id: string;
  name: string;
  icon: string;
};

type CategorySectionProps = {
  categories: Category[];
};

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Categories</h2>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            className="flex flex-col items-center py-3 h-auto"
          >
            <span className="text-xl mb-1">{category.icon}</span>
            <span className="text-xs">{category.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
