import { z } from 'zod';

const socialSchema = z.object({
  instagram: z.string(),
  facebook: z.string(),
  linkedin: z.string(),
  youtube: z.string(),
  x: z.string(),
});

const navLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const footerColumnSchema = z.object({
  title: z.string().min(1),
  links: z.array(navLinkSchema),
});

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  region: z.string(),
  postalCode: z.string(),
  country: z.string(),
});

export const siteConfigSchema = z.object({
  siteName: z.string().min(1),
  city: z.string().min(1),
  region: z.string().min(1),
  domain: z.string().min(1),
  url: z
    .string()
    .url()
    .refine((u) => !u.endsWith('/'), 'url ne doit pas se terminer par un slash (URL canonique)'),
  defaultDescription: z
    .string()
    .min(50, 'defaultDescription : vise au moins 50 caractères pour un snippet SERP utile')
    .max(160, 'defaultDescription : ≤ 160 caractères pour éviter la troncature dans les SERP'),
  enIndexable: z.boolean(),
  contactEmail: z.string().email(),
  phone: z.string(),
  logo: z.string(),
  twitterHandle: z
    .string()
    .refine(
      (h) => h === '' || h.startsWith('@'),
      'twitterHandle doit commencer par @ (ou être vide)'
    ),
  allowAiCrawlers: z.boolean(),
  address: addressSchema,
  businessType: z.enum(['Organization', 'LocalBusiness', 'WebSite']),
  openingHours: z.array(z.string()),
  geo: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  social: socialSchema,
  nav: z.array(navLinkSchema),
  navCta: navLinkSchema,
  footer: z.object({
    tagline: z.string().min(1),
    columns: z.array(footerColumnSchema),
    legal: z.object({
      links: z.array(navLinkSchema),
    }),
  }),
});
