import Footer from '@/components/footer';
import Header from '@/components/header';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 sm:py-24">
        <div className="container max-w-md">
            {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
