import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  date: string;
  tags: string[];
  readingTime: number;
  content: string;
}

function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 180));
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: (data.title as string) || slug,
        titleAr: (data.titleAr as string) || (data.title as string) || slug,
        excerpt: (data.excerpt as string) || "",
        excerptAr: (data.excerptAr as string) || (data.excerpt as string) || "",
        date: (data.date as string) || "",
        tags: (data.tags as string[]) || [],
        readingTime: calculateReadingTime(content),
        content,
      } satisfies BlogPost;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: (data.title as string) || slug,
    titleAr: (data.titleAr as string) || (data.title as string) || slug,
    excerpt: (data.excerpt as string) || "",
    excerptAr: (data.excerptAr as string) || (data.excerpt as string) || "",
    date: (data.date as string) || "",
    tags: (data.tags as string[]) || [],
    readingTime: calculateReadingTime(content),
    content,
  };
}
