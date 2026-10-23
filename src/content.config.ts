import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const courses = defineCollection({
  loader: file("src/content/courses.json"),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    description: z.string().optional(),
    plannedSections: z.number().int().positive(),
    published: z.boolean(),
  }),
});

// Los archivos que empiezan por "_" son borradores y no se cargan
const sections = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/sections" }),
  schema: z.object({
    sectionId: z.string().regex(/^([BIA][1-8]|P1)\.\d{1,2}$/),
    course: z.string(),
    title: z.string(),
    order: z.number().int().positive(),
    minutes: z.number().int().positive().default(60),
    summary: z.string().max(220),
  }),
});

export const collections = { courses, sections };
