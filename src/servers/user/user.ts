import prisma from '../../prisma.js';

export async function createUser(systemAuth: string, idAuth: string) {
  const newUser = await prisma.user.create({
      data: {
        systemAuth,
        idAuth
      },
      include: {  
      customGates: {  
        select: {  
          id: true,  
        }, 
        orderBy: {  
          createdAt: 'desc',  
        },  
      }, 
      customAlgorithms: {  
        select: {  
          id: true,  
        },
        orderBy: {  
          createdAt: 'desc',  
        },
      },  
    },  
    });
  return newUser;
}

export async function getUser(systemAuth: string, idAuth: string) {
  const user = await prisma.user.findUnique({
    where: {
      systemAuth_idAuth: {  
        systemAuth,  
        idAuth,  
      }, 
    },
    include: {  
      customGates: {  
        select: {  
          id: true,  
        },
        orderBy: {  
          createdAt: 'desc',  
        },  
      }, 
      customAlgorithms: {  
        select: {  
          id: true,  
        },
        orderBy: {  
          createdAt: 'desc',  
        },  
      },  
    },  
  });

  if (!user){
    return createUser(systemAuth, idAuth);
  }

  return user;
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