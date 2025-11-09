import { PrismaClient } from '@prisma/client';

/**
 * Cliente de Prisma para base de datos
 * Singleton pattern para evitar múltiples instancias
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;

