import { defineCollection, z } from 'astro:content';

const customerStories = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      companyIndustry: z.string().optional(),
      companyLocation: z.string().optional(),
      companyLogo: image().optional(),
      coverImage: image(),
      thumbnail: image(),
      loginMethods: z.array(z.string()).default([]),
      technicalDetails: z.array(z.string()).default([]),
      metrics: z
        .array(
          z.object({
            num: z.string(),
            text: z.string(),
          }),
        )
        .max(3)
        .default([]),
      publishedAt: z.coerce.date(),
      order: z.number().optional(),
    }),
});

const loginGallery = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      industry: z.string(),
      mainImage: image(),
      webSlides: z.array(image()).max(4).default([]),
      mobileSlides: z.array(image()).max(4).default([]),
      loginMethods: z.array(z.string()).default([]),
      socialLogins: z.array(z.string()).default([]),
      technicalDetails: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      order: z.number().optional(),
      publishedAt: z.coerce.date(),
    }),
});

const whatsNew = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      coverImage: image(),
      publishedAt: z.coerce.date(),
      canonicalUrl: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

const blogPosts = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      h1: z.string().optional(),
      excerpt: z.string(),
      coverImage: image(),
      category: z.string().optional(),
      featured: z.boolean().default(false),
      readTime: z.number().int().positive().optional(),
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      canonicalUrl: z.string().optional(),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      publishedAtOverride: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      faq: z
        .array(
          z.object({
            q: z.string(),
            a: z.string(),
          }),
        )
        .optional(),
    }),
});

const blogCategories = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  'customer-stories': customerStories,
  'login-gallery': loginGallery,
  'whats-new': whatsNew,
  'blog-posts': blogPosts,
  'blog-categories': blogCategories,
};
