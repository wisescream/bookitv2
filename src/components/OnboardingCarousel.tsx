
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import OnboardingSlide from './OnboardingSlide';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    image: '/lovable-uploads/3daa0da2-3a5d-4a93-a657-997c4cb80ed4.png',
    title: 'Nearby restaurants',
    description: "You don't have to go far to find a good restaurant, we have provided all the restaurants that is near you"
  },
  {
    image: '/lovable-uploads/276ad356-102a-4bbb-a3cf-f8ba0c4d0755.png',
    title: 'Select the Favorites Menu',
    description: "Now eat well, don't leave the house,You can choose your favorite food only with one click"
  },
  {
    image: '/lovable-uploads/daf95bb4-2206-43e7-9698-ef14bc206e1b.png',
    title: 'Good food at a cheap price',
    description: "You can eat at expensive restaurants with affordable price"
  }
];

const OnboardingCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      navigate('/auth');
    }
  };

  const handleSkip = () => {
    navigate('/auth');
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 overflow-hidden relative">
        <div 
          className="slide-container w-full h-full flex"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full h-full flex-shrink-0">
              <OnboardingSlide
                image={slide.image}
                title={slide.title}
                description={slide.description}
                active={index === activeSlide}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-8 flex justify-between items-center">
        <button 
          onClick={handleSkip}
          className="text-foodapp-muted font-medium transition-colors hover:text-foodapp-text"
        >
          Skip
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                i === activeSlide ? 'bg-foodapp-primary' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <motion.button
          onClick={handleNext}
          className="w-10 h-10 bg-foodapp-primary rounded-full flex items-center justify-center text-white"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          <ArrowRight size={18} />
        </motion.button>
      </div>
    </div>
  );
};

export default OnboardingCarousel;
