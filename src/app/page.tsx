import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Briefcase } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">
            IT Internships Morocco
          </h1>
          <Link href="/search">
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Search Internships
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-5xl font-bold mb-6 text-foreground">
            Find Your IT Internship in Morocco
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Search through 99+ companies across 18 Moroccan cities offering internships
            in 15 IT specialties
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/search">
              <Button size="lg" className="w-full sm:w-auto">
                <Search className="mr-2 h-5 w-5" />
                Start Searching
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">99+</div>
              <div className="text-muted-foreground">IT Companies</div>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">18</div>
              <div className="text-muted-foreground">Moroccan Cities</div>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <Search className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">15</div>
              <div className="text-muted-foreground">IT Specialties</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2026 IT Internships Morocco. Helping students find opportunities.</p>
        </div>
      </footer>
    </div>
  );
}
