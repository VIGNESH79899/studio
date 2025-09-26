import Footer from "@/components/footer";
import Header from "@/components/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
