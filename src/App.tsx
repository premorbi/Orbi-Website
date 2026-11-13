import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HomeyFlowBuilder } from './components/HomeyFlowBuilder';
import { CoreConceptAnimations } from './components/CoreConceptAnimations';
import { DeviceConnectivityVisualizer } from './components/DeviceConnectivityVisualizer';
import { WiredEcosystemPipeline } from './components/WiredEcosystemPipeline';
import { CatalogSection } from './components/CatalogSection';
import { ScenesSection } from './components/ScenesSection';
import { ConfiguratorSection } from './components/ConfiguratorSection';
import { ExperienceCentre } from './components/ExperienceCentre';
import { Footer } from './components/Footer';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';

export default function App() {
  const [currentSection, setCurrentSection] = useState<string>('overview');
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  // Start as light so the pre-rendered HTML and the first client render match
  // (avoids a hydration mismatch). The real preference is read after mount; an
  // inline script in index.html applies the `dark` class before first paint.
  const [isDark, setIsDark] = useState<boolean>(false);
  const [themeLoaded, setThemeLoaded] = useState<boolean>(false);

  const [bookingConfigSummary, setBookingConfigSummary] = useState<string>('');

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('orbi-theme');
    } catch {
      // Storage unavailable (private mode, blocked cookies)
    }
    setIsDark(saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
    setThemeLoaded(true);
  }, []);

  // Sync theme to document.documentElement
  useEffect(() => {
    if (!themeLoaded) return;
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('orbi-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('orbi-theme', 'light');
    }
  }, [isDark, themeLoaded]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleNavigate = (sectionId: string) => {
    setCurrentSection(sectionId);
    if (sectionId === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (summary?: string) => {
    if (summary) {
      setBookingConfigSummary(summary);
    }
    handleNavigate('experience-centre');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#0D1117] text-[#1E2229] dark:text-[#F3F4F6] transition-colors duration-300 selection:bg-[#C59B27]/30">
      {/* Top Bar Contract Compliant Navigation */}
      <Header
        currentSection={currentSection}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenBooking={() => handleOpenBooking()}
      />

      <main>
        {/* Hero Section with Interactive Living Suite & 12 Core Possibilities */}
        <Hero
          onExploreAutomation={() => handleNavigate('automation-flow')}
          onExploreConnectivity={() => handleNavigate('connectivity-map')}
          onSelectPossibility={() => handleNavigate('catalog')}
        />

        {/* Homey-Style Flow Builder Animation: When... And... Then... */}
        <HomeyFlowBuilder />

        {/* Core Concept Animations: Connectivity, Scenes & Remote Control */}
        <CoreConceptAnimations />

        {/* Interactive SVG Smart Device Connectivity Visualizer with Hover Tooltips */}
        <DeviceConnectivityVisualizer />

        {/* 4-Tier Wired Pipeline & Retrofit Insert Relays */}
        <WiredEcosystemPipeline />

        {/* Complete Solutions Catalog (9 Categories & 8 Sensor Families from PDF) */}
        <CatalogSection />

        {/* The 6 Iconic Lifestyle Scenes (Page 3 of Catalog) */}
        <ScenesSection />

        {/* System Planner & Configurator */}
        <ConfiguratorSection onScheduleVisit={(summary) => handleOpenBooking(summary)} />

        {/* Bengaluru Experience Centre & VIP Booking */}
        <ExperienceCentre
          initialConfigSummary={bookingConfigSummary}
          onOpenPrivacyPolicy={() => setIsPrivacyModalOpen(true)}
        />
      </main>

      {/* Quiet, verified Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPrivacyPolicy={() => setIsPrivacyModalOpen(true)}
      />

      {/* Comprehensive Privacy Policy & Homeowner Data Charter Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
}

