import Header from '@/components/header';
import Hero from '@/components/landing/hero';
import Features from '@/components/landing/features';
import PricingCalculator from '@/components/landing/pricing-calculator';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <PricingCalculator />
      </main>
      <Footer />
    </div>
  );
}
