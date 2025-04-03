
import React from 'react';
import { Button } from '@/components/ui/button';

type Category = {
  id: string;
  name: string;
  icon: string;
};

type CategorySectionProps = {
  categories: Category[];
  activeCategory?: string;
  onCategorySelect: (categoryId: string) => void;
};

const CategorySection: React.FC<CategorySectionProps> = ({ 
  categories, 
  activeCategory, 
  onCategorySelect 
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Categories</h2>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={`flex flex-col items-center py-3 h-auto ${
              activeCategory === category.id ? "bg-primary text-primary-foreground" : ""
            }`}
            onClick={() => onCategorySelect(category.id)}
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
