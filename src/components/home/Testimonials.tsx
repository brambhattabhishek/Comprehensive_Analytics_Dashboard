import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

function Testimonial({ quote, author, role, company }: TestimonialProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-12 w-12 text-primary/40 mb-4"
        >
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
      </CardHeader>
      <CardContent>
        <p className="text-lg">{quote}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">
          {role}, {company}
        </p>
      </CardFooter>
    </Card>
  );
}

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Trusted by developers and companies around the world
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Testimonial
            quote="This UI toolkit has completely transformed our development workflow. We're shipping features faster than ever before."
            author="Sarah Johnson"
            role="CTO"
            company="TechStart Inc."
          />
          <Testimonial
            quote="The components are not only beautiful but also highly accessible. It's rare to find a UI library that prioritizes both."
            author="Michael Chen"
            role="Frontend Lead"
            company="DesignSystems Co."
          />
          <Testimonial
            quote="We've reduced our development time by 40% since adopting this toolkit. The documentation is excellent and the components are rock solid."
            author="Jessica Williams"
            role="Product Manager"
            company="InnovateApp"
          />
        </div>
      </div>
    </section>
  );
}
