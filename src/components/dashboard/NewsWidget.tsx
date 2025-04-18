import { useState } from "react";
import { useNewsData, NewsCategory } from "@/services/newsService";
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { ExternalLink, RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export function NewsWidget() {
  const [category, setCategory] = useState<NewsCategory>("general");
  const [page, setPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const { data: newsData, isLoading, error, refetch, isRefetching } = useNewsData(category, page);

  const categories: NewsCategory[] = ["general", "business", "technology", "sports", "entertainment", "health", "science"];

  const handleCategoryChange = (value: string) => {
    setCategory(value as NewsCategory);
    setPage(1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (newsData && newsData.totalResults > 0) {
      setPage(page + 1);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
        <div>
          <CardTitle className="text-2xl">News</CardTitle>
          <CardDescription>Latest headlines from around the world</CardDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => refetch()}
          disabled={isRefetching}
        >
          <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
          <span className="sr-only">Refresh</span>
        </Button>
      </CardHeader>

      <div className="px-6">
        {/* Dropdown for mobile/tablet */}
        {/* Mobile/Tablet: Dropdown */}
<div className="block md:hidden mb-4">
  <Select value={category} onValueChange={handleCategoryChange}>
    <SelectTrigger className="w-full text-black dark:text-white bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700">
      <SelectValue placeholder="Select category" />
    </SelectTrigger>

    <SelectContent className="bg-white dark:bg-zinc-900 text-black dark:text-white border border-gray-200 dark:border-zinc-700">
      {categories.map((cat) => (
        <SelectItem
          key={cat}
          value={cat}
          className="capitalize text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          {cat}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>


        {/* Tabs for desktop */}
        <Tabs value={category} onValueChange={handleCategoryChange} className="hidden md:block">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="capitalize bg-black">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <CardContent className="pt-6">
        {isLoading || isRefetching ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-6 text-destructive">
            <p>Error loading news. Please try again.</p>
            <Button
              variant="outline"
              onClick={() => refetch()}
              className="mt-4"
            >
              Retry
            </Button>
          </div>
        ) : newsData && newsData.articles && newsData.articles.length > 0 ? (
          <div className="space-y-6">
            {newsData.articles.map((article, index) => (
              <div key={index} className="border-b border-border pb-6 last:border-0 last:pb-0">
                <Dialog>
                  <div className="grid md:grid-cols-[2fr_1fr] gap-4">
                    <div>
                      <DialogTrigger asChild>
                        <h3
                          className="text-lg font-medium hover:text-primary cursor-pointer"
                          onClick={() => setSelectedArticle(index)}
                        >
                          {article.title}
                        </h3>
                      </DialogTrigger>
                      <p className="text-muted-foreground text-sm mt-1">
                        {article.source.name} • {formatDate(article.publishedAt)}
                      </p>
                      <p className="mt-2 line-clamp-2">
                        {article.description || "No description available"}
                      </p>
                    </div>
                    {article.urlToImage && (
                      <div className="hidden md:block relative h-24 overflow-hidden rounded-md">
                        <DialogTrigger asChild>
                          <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="object-cover w-full h-full cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => setSelectedArticle(index)}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = 'https://placehold.co/600x400?text=No+Image';
                            }}
                          />
                        </DialogTrigger>
                      </div>
                    )}
                  </div>

                  <DialogContent className="sm:max-w-3xl">
                    {selectedArticle !== null && newsData.articles[selectedArticle] && (
                      <>
                        <DialogHeader>
                          <DialogTitle className="text-xl">
                            {newsData.articles[selectedArticle].title}
                          </DialogTitle>
                          <DialogDescription>
                            {newsData.articles[selectedArticle].source.name} • {formatDate(newsData.articles[selectedArticle].publishedAt)}
                          </DialogDescription>
                        </DialogHeader>

                        {newsData.articles[selectedArticle].urlToImage && (
                          <div className="relative h-56 overflow-hidden rounded-md">
                            <img
                              src={newsData.articles[selectedArticle].urlToImage}
                              alt={newsData.articles[selectedArticle].title}
                              className="object-cover w-full h-full"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = 'https://placehold.co/600x400?text=No+Image';
                              }}
                            />
                          </div>
                        )}

                        <div className="space-y-4">
                          <p>{newsData.articles[selectedArticle].description}</p>
                          <p>{newsData.articles[selectedArticle].content?.split('[+')[0] || 'No content available'}</p>

                          <div className="pt-4">
                            <Button asChild>
                              <a
                                href={newsData.articles[selectedArticle].url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                Read full article <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No news articles available for this category.
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={handlePreviousPage}
          disabled={page === 1 || isLoading || isRefetching}
        >
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {page}
        </div>
        <Button
          variant="outline"
          onClick={handleNextPage}
          disabled={!newsData || page >= Math.ceil(newsData.totalResults / 3) || isLoading || isRefetching}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
