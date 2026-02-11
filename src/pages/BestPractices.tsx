
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function BestPractices() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Best Practices Guide</h1>
          <p className="text-muted-foreground">Expert tips and strategies for getting the most out of AI Writer Pros coming soon...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
