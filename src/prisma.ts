import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

function hashIdAuth(rawId: string): string {
  const HASH_SALT = process.env.ID_AUTH_HASH_SALT || 'default-secret-salt';
  return createHash('sha256')
    .update(rawId + HASH_SALT)
    .digest('hex');
}

const prisma = globalForPrisma.prisma || new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model === 'User') {
    if (params.args.data?.idAuth) {
      params.args.data.idAuth = hashIdAuth(params.args.data.idAuth);
    }
    
    if (params.args.where?.systemAuth_idAuth?.idAuth) {
      params.args.where.systemAuth_idAuth.idAuth = hashIdAuth(
        params.args.where.systemAuth_idAuth.idAuth
      );
    }
    
    if (params.args.where?.idAuth) {
      params.args.where.idAuth = hashIdAuth(params.args.where.idAuth);
    }
  }

  return next(params);
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;