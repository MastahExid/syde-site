import { z } from 'zod';
import { faqs, teamMembers, guides } from './schema';

export const errorSchemas = {
  notFound: z.object({
    message: z.string(),
  }),
};

export const api = {
  faqs: {
    list: {
      method: 'GET' as const,
      path: '/api/faqs',
      responses: {
        200: z.array(z.custom<typeof faqs.$inferSelect>()),
      },
    },
  },
  team: {
    list: {
      method: 'GET' as const,
      path: '/api/team',
      responses: {
        200: z.array(z.custom<typeof teamMembers.$inferSelect>()),
      },
    },
  },
  guides: {
    list: {
      method: 'GET' as const,
      path: '/api/guides',
      responses: {
        200: z.array(z.custom<typeof guides.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/guides/:slug',
      responses: {
        200: z.custom<typeof guides.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
