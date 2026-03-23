import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { BlogPosts, Authors, Categories } from '@/entities/index';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import DeferredFooter from '@/components/DeferredFooter';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPosts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError(true);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Search for post by urlSlug
        const allPosts = await BaseCrudService.getAll<BlogPosts>(
          'blogposts',
          {
            singleRef: ['category', 'author'],
          },
          { limit: 1000 }
        );

        const foundPost = allPosts.items?.find((p) => p.urlSlug === slug);
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <LoadingSpinner />
        </main>
        <DeferredFooter />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
                Artikel nicht gefunden
              </h1>
              <p className="font-paragraph text-foreground/60 mb-8">
                Der gesuchte Artikel existiert nicht oder wurde gelöscht.
              </p>
              <Button onClick={() => navigate('/blog')} className="rounded-lg">
                Zurück zum Blog
              </Button>
            </div>
          </div>
        </main>
        <DeferredFooter />
      </>
    );
  }

  const author = typeof post.author === 'object' && post.author ? post.author : null;
  const category = typeof post.category === 'object' && post.category ? post.category : null;
  const publishedDate = post.publishedDate
    ? format(new Date(post.publishedDate), 'd. MMMM yyyy', { locale: de })
    : null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section with Featured Image */}
        {post.thumbnail && (
          <div className="relative w-full h-96 md:h-[500px] overflow-hidden bg-light-grey">
            <Image
              src={post.thumbnail}
              alt={post.title || 'Blog post'}
              className="w-full h-full object-cover"
              width={1200}
              height={500}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}

        {/* Article Content */}
        <article className="w-full py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate('/blog')}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-paragraph"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zum Blog
            </motion.button>

            {/* Category Badge */}
            {category && 'name' in category && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="inline-block text-xs font-heading font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full mb-6">
                  {(category as any).name}
                </span>
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              {post.title}
            </motion.h1>

            {/* Meta Information */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-6 text-sm text-foreground/60 border-b pb-6 mb-8"
            >
              {publishedDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{publishedDate}</span>
                </div>
              )}
              {author && 'authorName' in author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Von {(author as any).authorName}</span>
                </div>
              )}
              {post.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime} min Lesezeit</span>
                </div>
              )}
            </motion.div>

            {/* Excerpt */}
            {post.excerpt && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="font-paragraph text-lg text-foreground/80 mb-8 italic"
              >
                {post.excerpt}
              </motion.p>
            )}

            {/* Content */}
            {post.content && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="prose prose-sm md:prose-base max-w-none font-paragraph text-foreground/80 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}

            {/* Author Bio */}
            {author && 'authorName' in author && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-16 pt-8 border-t"
              >
                <div className="flex gap-6 items-start">
                  {(author as any).authorPhoto && (
                    <Image
                      src={(author as any).authorPhoto}
                      alt={(author as any).authorName}
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      width={64}
                      height={64}
                    />
                  )}
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-2">
                      {(author as any).authorName}
                    </h3>
                    {(author as any).authorPosition && (
                      <p className="text-sm text-foreground/60 mb-2">
                        {(author as any).authorPosition}
                      </p>
                    )}
                    {(author as any).authorBio && (
                      <p className="font-paragraph text-foreground/70">
                        {(author as any).authorBio}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Back to Blog Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <Button onClick={() => navigate('/blog')} className="rounded-lg">
                Mehr Artikel lesen
              </Button>
            </motion.div>
          </div>
        </article>
      </main>
      <DeferredFooter />
    </>
  );
}
