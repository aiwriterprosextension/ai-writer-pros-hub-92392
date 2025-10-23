
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function Admin() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          <p className="text-muted-foreground">Admin functionality coming soon...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
