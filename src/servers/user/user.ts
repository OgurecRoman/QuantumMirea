import prisma from '../../lib/prisma.js';
import { encrypt, decrypt } from '../../lib/cryptoUtils';


export async function createUser(systemAuth: string, idAuth: string) {
  const encryptedIdAuth = encrypt(idAuth);

  const newUser = await prisma.user.create({
      data: {
        systemAuth,
        idAuth: encryptedIdAuth
      },
      include: {  
      customGates: {
        orderBy: {  
          createdAt: 'desc',  
        },  
      }, 
      customAlgorithms: {
        orderBy: {  
          createdAt: 'desc',  
        },
      }, 
      customCompositeGates: {
        orderBy: {  
          createdAt: 'desc',  
        },
      },   
    },  
    });
  return {
    ...newUser,
    idAuth: decrypt(newUser.idAuth),
  };
}

export async function getUser(systemAuth: string, idAuth: string) {
  const encryptedIdAuth = encrypt(idAuth);

  const user = await prisma.user.findUnique({
    where: {
      systemAuth_idAuth: {  
        systemAuth,  
        idAuth: encryptedIdAuth,  
      }, 
    },
    include: {  
      customGates: { 
        orderBy: {  
          createdAt: 'desc',  
        },  
      }, 
      customAlgorithms: {
        orderBy: {  
          createdAt: 'desc',  
        },  
      }, 
      customCompositeGates: {
          orderBy: {  
          createdAt: 'desc',  
        },  
      }
    },  
  });

  if (!user){
    return createUser(systemAuth, idAuth);
  }

  return {
    ...user,
    idAuth: decrypt(user.idAuth),
  };
}
  
export async function canAddCustomGatesBulk(systemAuth: string, idAuth: string, newGatesCount: number): Promise<boolean> {  
  const user = await getUser(systemAuth, idAuth);
  
  const existingCount = user.customGates.length;  
  return existingCount + newGatesCount <= 30;  
}

export async function canAddCustomAlgorithm(systemAuth: string, idAuth: string): Promise<boolean> {  
  const user = await getUser(systemAuth, idAuth);
  return user.customAlgorithms.length < 30;  
}