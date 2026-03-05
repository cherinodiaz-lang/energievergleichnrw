import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { TeamMembers } from '@/entities';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface AuthorBoxProps {
  authorName?: string;
  updatedDate?: Date | string;
}

export default function AuthorBox({ authorName = 'Peter Kohmann', updatedDate }: AuthorBoxProps) {
  const [author, setAuthor] = useState<TeamMembers | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuthor = async () => {
      try {
        const result = await BaseCrudService.getAll<TeamMembers>('teammembers');
        const foundAuthor = result.items?.find(
          (member) => member.name?.toLowerCase() === authorName.toLowerCase()
        );
        setAuthor(foundAuthor || null);
      } catch (error) {
        if (typeof window !== 'undefined' && window.location.search.includes('debug=1')) {
          console.error('Error loading author:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthor();
  }, [authorName]);

  if (isLoading || !author) {
    return null;
  }

  const formattedDate = updatedDate
    ? format(new Date(updatedDate), 'dd. MMMM yyyy', { locale: de })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-primary/5 rounded-lg p-6 sm:p-8 border border-primary/10 mt-12"
    >
      <div className="flex gap-6">
        {/* Author Photo */}
        {author.photo && (
          <div className="flex-shrink-0">
            <Image
              src={author.photo}
              alt={author.name || 'Author'}
              width={100}
              height={100}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover"
            />
          </div>
        )}

        {/* Author Info */}
        <div className="flex-grow">
          <h4 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-1">
            {author.name}
          </h4>
          <p className="font-paragraph text-sm text-primary font-semibold mb-3">
            {author.position}
          </p>
          <p className="font-paragraph text-sm text-foreground/80 mb-3">{author.bio}</p>
          {formattedDate && (
            <p className="font-paragraph text-xs text-foreground/60">
              Zuletzt aktualisiert: {formattedDate}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
