/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file
 */

/**
 * Collection ID: SiteContent
 * Interface for SiteContent
 */
export interface SiteContent {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  contentKey?: string;
  /** @wixFieldType object */
  contentData?: Record<string, unknown>;
  /** @wixFieldType text */
  contentType?: string;
  /** @wixFieldType text */
  description?: string;
}


/**
 * Collection ID: autoren
 * Interface for Authors
 */
export interface Authors {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  authorName?: string;
  /** @wixFieldType text */
  authorBio?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  authorPhoto?: string;
  /** @wixFieldType text */
  authorPosition?: string;
  /** @wixFieldType text */
  socialMediaLinks?: string;
}


/**
 * Collection ID: blogposts
 * Interface for BlogPosts
 */
export interface BlogPosts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  alternativeAnchorTexts?: string;
  /** @wixFieldType text */
  urlSlug?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType text */
  excerpt?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  thumbnail?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  tags?: string;
  /** @wixFieldType date */
  publishedDate?: Date | string;
  /** @wixFieldType date */
  updatedDate?: Date | string;
  /** @wixFieldType number */
  readingTime?: number;
}


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
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  thumbnail?: string;
  /** @wixFieldType date */
  publicationDate?: Date | string;
}


/**
 * Collection ID: kategorien
 * Interface for Categories
 */
export interface Categories {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  alternativeAnchorTexts?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}


/**
 * Collection ID: newsletterabonnenten
 * Interface for NewsletterSubscribers
 */
export interface NewsletterSubscribers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  firstName?: string;
  /** @wixFieldType text */
  lastName?: string;
  /** @wixFieldType date */
  subscribedDate?: Date | string;
  /** @wixFieldType boolean */
  consentGiven?: boolean;
}


/**
 * Collection ID: teammembers
 * Interface for TeamMembers
 */
export interface TeamMembers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  position?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  photo?: string;
  /** @wixFieldType text */
  expertise?: string;
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
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  icon?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType boolean */
  isActive?: boolean;
  /** @wixFieldType text */
  targetAudience?: string;
}
