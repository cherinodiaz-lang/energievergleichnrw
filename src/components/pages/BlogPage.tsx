import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { BlogPosts, Categories, Authors } from '@/entities/index';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<BlogPosts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category')
  );
  const [categories, setCategories] = useState<Categories[]>([]);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const skip = (currentPage - 1) * POSTS_PER_PAGE;
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Load categories
        const categoriesResult = await BaseCrudService.getAll<Categories>(
          'kategorien',
          {},
          { limit: 100 }
        );
        setCategories(categoriesResult.items || []);

        // Load posts with pagination and category filter
        let query: any[] = [];
        if (selectedCategory) {
          query = [{ fieldName: 'category', value: selectedCategory }];
        }

        const postsResult = await BaseCrudService.getAll<BlogPosts>(
          'blogposts',
          {
            singleRef: ['category', 'author'],
          },
          { limit: POSTS_PER_PAGE, skip }
        );

        setPosts(postsResult.items || []);
        setTotalCount(postsResult.totalCount || 0);
      } catch (error) {
        if (typeof window !== 'undefined' && window.location.search.includes('debug=1')) {
          console.error('Error loading blog data:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [currentPage, selectedCategory]);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setSearchParams(categoryId ? { category: categoryId, page: '1' } : { page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    const params: Record<string, string> = { page: newPage.toString() };
    if (selectedCategory) {
      params.category = selectedCategory;
    }
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary to-primary/80">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
                Blog & Ratgeber
              </h1>
              <p className="font-paragraph text-lg text-white/90 max-w-2xl mx-auto">
                Aktuelle Tipps, Trends und Wissen rund um Energie, Strom und Gas
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="w-full py-8 bg-white border-b">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="font-heading font-semibold text-foreground">Kategorien:</span>
              <Button
                onClick={() => handleCategoryChange(null)}
                variant={selectedCategory === null ? 'default' : 'outline'}
                className="rounded-full"
              >
                Alle
              </Button>
              {categories.map((category) => (
                <Button
                  key={category._id}
                  onClick={() => handleCategoryChange(category._id)}
                  variant={selectedCategory === category._id ? 'default' : 'outline'}
                  className="rounded-full"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: POSTS_PER_PAGE }).map((_, i) => (
                  <div key={i} className="bg-light-grey rounded-lg h-96 animate-pulse" />
                ))}
              </div>
            ) : posts.length > 0 ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {posts.map((post, index) => (
                    <motion.article
                      key={post._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
                    >
                      {post.thumbnail && (
                        <div className="relative w-full h-48 overflow-hidden bg-light-grey">
                          <Image
                            src={post.thumbnail}
                            alt={post.title || 'Blog post thumbnail'}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            width={400}
                            height={200}
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-grow">
                        {post.category && typeof post.category === 'object' && 'name' in post.category && (
                          <span className="inline-block text-xs font-heading font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3 w-fit">
                            {(post.category as any).name}
                          </span>
                        )}
                        <h3 className="font-heading text-xl font-bold text-foreground mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="font-paragraph text-sm text-foreground/70 mb-4 line-clamp-3 flex-grow">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-foreground/60 pt-4 border-t">
                          {post.author && typeof post.author === 'object' && 'authorName' in post.author && (
                            <span>Von {(post.author as any).authorName}</span>
                          )}
                          {post.readingTime && (
                            <span>{post.readingTime} min Lesezeit</span>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-16">
                    <Button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>

                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }).map((_, i) => {
                        const pageNum = i + 1;
                        return (
                          <Button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            variant={pageNum === currentPage ? 'default' : 'outline'}
                            className="rounded-full w-10 h-10 p-0"
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>

                    <Button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="font-paragraph text-lg text-foreground/60">
                  Keine Artikel in dieser Kategorie gefunden.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
