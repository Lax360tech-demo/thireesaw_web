import React from 'react';
import { Hero } from '../components/home/Hero';
import { BrandTicker } from '../components/home/BrandTicker';
import { CategoryCards } from '../components/home/CategoryCards';
import { FeaturedCollection } from '../components/home/FeaturedCollection';
import { BridalBlouseFeature } from '../components/home/BridalBlouseFeature';
import { EmbroideryStory } from '../components/home/EmbroideryStory';
import { BridalEditSection } from '../components/home/BridalEditSection';
import { CustomBlouseSteps } from '../components/home/CustomBlouseSteps';
import { SalemAtelierBanner } from '../components/home/SalemAtelierBanner';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Brand Marquee Strip */}
      <BrandTicker />

      {/* 3. Shop by Category */}
      <CategoryCards />

      {/* 4. Featured Collection (THE EDIT) */}
      <FeaturedCollection />

      {/* 5. Bridal Blouse Hallmark Feature */}
      <BridalBlouseFeature />

      {/* 6. Embroidery Craft Story */}
      <EmbroideryStory />

      {/* 7. The Bridal Edit */}
      <BridalEditSection />

      {/* 8. Customized Wedding Blouse Service */}
      <CustomBlouseSteps />

      {/* 9. Salem Boutique & Worldwide Courier Banner */}
      <SalemAtelierBanner />
    </div>
  );
};
