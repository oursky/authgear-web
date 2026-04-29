import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const customerStories = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/customer-stories' }),
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
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/login-gallery' }),
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
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/whats-new' }),
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
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog-posts' }),
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
  loader: glob({ pattern: '*.json', base: './src/content/blog-categories' }),
  schema: z.object({
    name: z.string(),
    /** Traditional Chinese label for `/zh-Hant/...` blog UI; falls back to `name`. */
    nameZhHant: z.string().optional(),
    slug: z.string(),
    description: z.string().optional(),
  }),
});

const integrations = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/integrations' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      excerpt: z.string(),
      icon: image(),
      website: z.url(),
      category: z.string().optional(),
      publishedAt: z.coerce.date().optional(),
    }),
});

const integrationCategories = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/integration-categories' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
  }),
});

export const collections = {
  'customer-stories': customerStories,
  'login-gallery': loginGallery,
  'whats-new': whatsNew,
  'blog-posts': blogPosts,
  'blog-categories': blogCategories,
  'integrations': integrations,
  'integration-categories': integrationCategories,
};
