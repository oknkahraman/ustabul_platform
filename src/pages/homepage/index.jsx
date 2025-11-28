import React from 'react';
import PublicNavigation from '../../components/navigation/PublicNavigation';
import HeroSection from './components/HeroSection';
import ValuePropositionSection from './components/ValuePropositionSection';
import HowItWorksSection from './components/HowItWorksSection';
import TrustIndicatorsSection from './components/TrustIndicatorsSection';
import CTASection from './components/CTASection';
import FooterSection from './components/FooterSection';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavigation />
      
      <main>
        <HeroSection />
        <ValuePropositionSection />
        <HowItWorksSection />
        <TrustIndicatorsSection />
        <CTASection />
      </main>

      <FooterSection />
    </div>
  );
};

export default Homepage;