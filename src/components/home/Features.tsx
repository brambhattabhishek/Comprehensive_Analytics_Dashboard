import {
  LayoutGrid,
  Shield,
  Zap,
  Palette,
  Smartphone,
  Code,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export function Features() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Powerful Features for Modern Applications
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to build beautiful, responsive web applications
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<LayoutGrid className="h-6 w-6" />}
            title="Responsive Layout"
            description="Build interfaces that work seamlessly across all device sizes with our responsive grid system."
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6" />}
            title="Accessibility"
            description="All components follow WAI-ARIA standards for maximum accessibility and usability."
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6" />}
            title="Performance"
            description="Optimized for speed with minimal bundle size and efficient rendering."
          />
          <FeatureCard
            icon={<Palette className="h-6 w-6" />}
            title="Customizable"
            description="Easily customize components with Tailwind CSS utility classes or your own styles."
          />
          <FeatureCard
            icon={<Smartphone className="h-6 w-6" />}
            title="Mobile First"
            description="Designed with mobile experiences in mind for the best user experience on any device."
          />
          <FeatureCard
            icon={<Code className="h-6 w-6" />}
            title="Developer Experience"
            description="Built with TypeScript for type safety and better developer experience."
          />
        </div>
      </div>
    </section>
  );
}
