
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Linkedin, Github, ChevronLeft, MessageSquare, FileQuestion, FileText, ExternalLink } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Help() {
  const navigate = useNavigate();

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Help & Support</h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Reach out to the developer for any questions or assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start flex-col sm:flex-row gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground mb-2">For inquiries and support requests</p>
                  <a 
                    href="mailto:brambhattabhishek@gmail.com" 
                    className="text-primary font-medium inline-flex items-center hover:underline"
                  >
                    brambhattabhishek@gmail.com
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start flex-col sm:flex-row gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Phone</h3>
                  <p className="text-sm text-muted-foreground mb-2">For urgent matters</p>
                  <a 
                    href="tel:9054954412" 
                    className="text-primary font-medium inline-flex items-center hover:underline"
                  >
                    +91 9054954412
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start flex-col sm:flex-row gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Linkedin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">LinkedIn</h3>
                  <p className="text-sm text-muted-foreground mb-2">Connect professionally</p>
                  <a 
                    href="https://www.linkedin.com/in/abhishek-brahmbhatt-4a5ba2290/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary font-medium inline-flex items-center hover:underline"
                  >
                    Abhishek Brahmbhatt
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start flex-col sm:flex-row gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Github className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">GitHub</h3>
                  <p className="text-sm text-muted-foreground mb-2">Browse projects and code</p>
                  <a 
                    href="https://github.com/brambhattabhishek" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary font-medium inline-flex items-center hover:underline"
                  >
                    brambhattabhishek
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>FAQ</CardTitle>
            <CardDescription>
              Common questions and answers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <FileQuestion className="h-4 w-4 mr-2" />
                  How can I change the dashboard theme?
                </h3>
                <p className="text-sm text-muted-foreground ml-6">
                  You can change the theme in Settings → Appearance. Choose between Light, Dark, or System preference.
                </p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <FileQuestion className="h-4 w-4 mr-2" />
                  How often is the weather data updated?
                </h3>
                <p className="text-sm text-muted-foreground ml-6">
                  Weather data is fetched from OpenWeatherMap API and updated every 10 minutes.
                </p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <FileQuestion className="h-4 w-4 mr-2" />
                  Is my data saved across sessions?
                </h3>
                <p className="text-sm text-muted-foreground ml-6">
                  Yes, your preferences such as theme selection are saved in your browser's local storage.
                </p>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
