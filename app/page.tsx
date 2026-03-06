import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Footer } from '@/components/footer';
import { SectionTear } from '@/components/section-tear';
import dynamic from 'next/dynamic';
import { Chatbot, EasterEggManager } from '@/components/lazy-loaded-components';

function SectionSkeleton() {
  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 animate-pulse">
      <div className="mx-auto max-w-6xl">
        <div className="h-10 w-64 bg-ltx-alt rounded-lg mb-4" />
        <div className="h-5 w-96 bg-ltx-alt rounded-lg mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-2xl border border-ltx-rule overflow-hidden">
              <div className="aspect-video bg-ltx-alt" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 bg-ltx-alt rounded" />
                <div className="h-4 w-full bg-ltx-alt rounded" />
                <div className="h-4 w-2/3 bg-ltx-alt rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CreativeProducing = dynamic(() => import('@/components/creative-producing').then(m => ({ default: m.CreativeProducing })), { loading: () => <SectionSkeleton /> });
const AgenticCreativeAi = dynamic(() => import('@/components/agentic-creative-ai').then(m => ({ default: m.AgenticCreativeAi })), { loading: () => <SectionSkeleton /> });
const LineProducingProduction = dynamic(() => import('@/components/line-producing-production').then(m => ({ default: m.LineProducingProduction })), { loading: () => <SectionSkeleton /> });
const ContactSection = dynamic(() => import('@/components/contact-section').then(m => ({ default: m.ContactSection })), { loading: () => <SectionSkeleton /> });

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <SectionTear seed="hero-creative" colorAbove="var(--background)" colorBelow="var(--ltx-bg-alt)" bleedColor="var(--ltx-pink)" character="gentle" />
        <CreativeProducing />
        <AgenticCreativeAi />
        <SectionTear seed="agentic-line" colorAbove="var(--ltx-bg-alt)" colorBelow="var(--background)" bleedColor="var(--ltx-sky)" character="sharp" />
        <LineProducingProduction />
        <SectionTear seed="line-contact" colorAbove="var(--background)" colorBelow="var(--ltx-bg-alt)" bleedColor="var(--ltx-green)" character="calm" />
        <ContactSection />
      </main>
      <Footer />
      <Chatbot />
      <EasterEggManager />
    </>
  );
}
