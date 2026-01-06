/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: faq
 * Interface for HufiggestellteFragen
 */
export interface HufiggestellteFragen {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  question?: string;
  /** @wixFieldType text */
  answer?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  keywords?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType boolean */
  isFeatured?: boolean;
}


/**
 * Collection ID: informationsmaterial
 * Interface for Informationsmaterial
 */
export interface Informationsmaterial {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType url */
  fileUrl?: string;
  /** @wixFieldType text */
  targetAudience?: string;
  /** @wixFieldType image */
  thumbnail?: string;
  /** @wixFieldType date */
  publicationDate?: Date | string;
}


/**
 * Collection ID: wechselvorteile
 * Interface for Wechselvorteile
 */
export interface Wechselvorteile {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  icon?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType boolean */
  isActive?: boolean;
  /** @wixFieldType text */
  targetAudience?: string;
}
