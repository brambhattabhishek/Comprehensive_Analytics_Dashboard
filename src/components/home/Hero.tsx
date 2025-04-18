
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Build beautiful web applications faster
            </h1>
            <p className="text-xl text-muted-foreground">
              A modern UI toolkit for creating stunning, responsive web
              interfaces with minimal effort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="font-medium" asChild>
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" className="font-medium">
                View Documentation
              </Button>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden border border-border shadow-lg">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8baa79fa68e1ecaeb197301ccbbd91dafdc1b57?placeholderIfAbsent=true"
              alt="Modern UI dashboard example"
              className="aspect-[1.5] object-contain w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

