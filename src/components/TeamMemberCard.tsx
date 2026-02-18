import React from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { TeamMembers } from '@/entities';

interface TeamMemberCardProps {
  member: TeamMembers;
  index?: number;
}

export default function TeamMemberCard({ member, index = 0 }: TeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg overflow-hidden border border-light-grey hover:border-primary transition-colors"
    >
      {/* Photo */}
      {member.photo && (
        <div className="w-full h-64 bg-gray-200 overflow-hidden">
          <Image
            src={member.photo}
            alt={member.name || 'Team Member'}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-foreground mb-2">
          {member.name}
        </h3>
        <p className="font-paragraph text-sm text-primary font-semibold mb-4">
          {member.position}
        </p>
        <p className="font-paragraph text-sm text-foreground/80 leading-relaxed">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
}
