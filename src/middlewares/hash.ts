import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';

const prisma = new PrismaClient();

function hashIdAuth(idAuth: string): string {
  return createHash('sha256').update(idAuth).digest('hex');
}

prisma.$use(async (params, next) => {
  if (
    params.model === 'User' && 
    (params.action === 'findUnique' || params.action === 'create' || params.action === 'update' || 
        params.action === 'upsert' || params.action === 'delete') &&
    params.args.where?.systemAuth_idAuth?.idAuth
  ) {
    params.args.where.systemAuth_idAuth.idAuth = hashIdAuth(params.args.where.systemAuth_idAuth.idAuth);
  }
  params.args.data.idAuth = hashIdAuth(params.args.data.idAuth);
  return next(params);
});
