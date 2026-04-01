import { z } from 'zod';
import { insertTaskSchema, insertTaskUpdateSchema, insertTechnicianSchema, tasks, taskUpdates, users, technicians } from './schema';

export type { CreateTaskRequest, UpdateTaskRequest, TaskResponse } from './schema';
export type CreateTaskUpdateInput = { taskId: number; content: string; type?: string; metadata?: any };

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  tasks: {
    list: {
      method: 'GET' as const,
      path: '/api/tasks',
      input: z.object({
        status: z.string().optional(),
        assignedToId: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.any()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/tasks/:id',
      responses: {
        200: z.any(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/tasks',
      input: insertTaskSchema,
      responses: {
        201: z.custom<typeof tasks.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/tasks/:id',
      input: insertTaskSchema.partial(),
      responses: {
        200: z.custom<typeof tasks.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/tasks/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
    bulkCreate: {
      method: 'POST' as const,
      path: '/api/tasks/bulk',
      input: z.object({ tasks: z.array(insertTaskSchema) }),
      responses: {
        201: z.array(z.custom<typeof tasks.$inferSelect>()),
        400: errorSchemas.validation,
      },
    },
  },
  taskUpdates: {
    list: {
      method: 'GET' as const,
      path: '/api/tasks/:taskId/updates',
      responses: {
        200: z.array(z.custom<typeof taskUpdates.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/tasks/:taskId/updates',
      input: insertTaskUpdateSchema.omit({ taskId: true, userId: true }),
      responses: {
        201: z.custom<typeof taskUpdates.$inferSelect>(),
      },
    },
  },
  users: {
    list: {
      method: 'GET' as const,
      path: '/api/users',
      responses: {
        200: z.array(z.custom<typeof users.$inferSelect>()),
      },
    },
  },
  technicians: {
    list: {
      method: 'GET' as const,
      path: '/api/technicians',
      responses: {
        200: z.array(z.custom<typeof technicians.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/technicians/:id',
      responses: {
        200: z.any(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/technicians',
      input: insertTechnicianSchema,
      responses: {
        201: z.custom<typeof technicians.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/technicians/:id',
      input: insertTechnicianSchema.partial(),
      responses: {
        200: z.custom<typeof technicians.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/technicians/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
    bulkCreate: {
      method: 'POST' as const,
      path: '/api/technicians/bulk',
      input: z.object({ technicians: z.array(insertTechnicianSchema) }),
      responses: {
        201: z.array(z.custom<typeof technicians.$inferSelect>()),
        400: errorSchemas.validation,
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
