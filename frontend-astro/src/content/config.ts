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

export const collections = { 'customer-stories': customerStories };
