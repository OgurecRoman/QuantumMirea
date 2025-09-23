import prisma from '../../lib/prisma.js';
import { getUser } from './user.js';
import { encrypt, decrypt } from '../../lib/cryptoUtils.js';
  
export async function getUserAlgorithms(systemAuth: string, idAuth: string) {  
  const user = await getUser(systemAuth, idAuth);
  return user.customAlgorithms;  
}
  
type AlgorithmCreateInput = {  
  title: string;  
  description: string;  
  qubit: number;  
  column: number;  
  data: object[];  
};  
  
export async function upsertUserWithAlgorithm(systemAuth: string, idAuth: string, algorithmData: AlgorithmCreateInput) {  
  const encryptedIdAuth = encrypt(idAuth);

  try {  
    const user = await prisma.user.upsert({  
      where: {  
        systemAuth_idAuth: {  
          systemAuth,  
          idAuth: encryptedIdAuth,  
        },  
      },  
      create: {  
        systemAuth,  
        idAuth: encryptedIdAuth,  
        customAlgorithms: {  
          create: [algorithmData],  
        },  
      },  
      update: {  
        customAlgorithms: {  
          create: algorithmData,  
        },  
      },  
      include: {  
        customAlgorithms: true,  
      },  
    });  
    return {
        ...user,
        idAuth: decrypt(user.idAuth),
      };
  } catch (e) {  
    console.error(e);  
    return { status: false };  
  }  
}
  
type AlgorithmUpdateInput = {  
  id: number;  
  title: string;  
  description: string;  
  qubit: number;  
  column: number;  
  data: object[];  
};
  
export async function updateUserAlgorithm(systemAuth: string, idAuth: string, updateData: AlgorithmUpdateInput) {  
  const encryptedIdAuth = encrypt(idAuth);

  try {  
    const userWithGate = await prisma.user.findUnique({  
      where: {  
        systemAuth_idAuth: {  
          systemAuth,  
          idAuth: encryptedIdAuth,  
        },  
      },  
      include: {  
        customAlgorithms: {  
          where: { id: updateData.id },  
          take: 1,  
        },  
      },  
    });  
  
    if (!userWithGate || userWithGate.customAlgorithms.length === 0) {  
      return { status: false };  
    }  
      
    await prisma.customAlgorithm.update({  
      where: { id: updateData.id },  
      data: {  
        title: updateData.title,  
        description: updateData.description,  
        qubit: updateData.qubit,  
        column: updateData.column,  
        data: updateData.data,  
        updatedAt: new Date(),  
      },  
    });  
  
    const updatedUser = await prisma.user.findUnique({  
      where: {  
        systemAuth_idAuth: {  
          systemAuth,  
          idAuth: encryptedIdAuth,  
        },  
      },  
      include: {  
        customAlgorithms: true,  
      },  
    });  
  
    return {
        ...updatedUser,
        idAuth: decrypt(updatedUser!.idAuth),
      }; 
  } catch (e) {  
    console.error(e);  
    return { status: false };  
  }  
}
  
export async function deleteUserAlgorithm(systemAuth: string, idAuth: string, algorithmId: number) {  
  const encryptedIdAuth = encrypt(idAuth);
  
  try {  
    const user = await prisma.user.findUnique({  
      where: {  
        systemAuth_idAuth: {  
          systemAuth,  
          idAuth: encryptedIdAuth,  
        },  
      },  
      include: {  
        customAlgorithms: {  
          where: { id: algorithmId },  
          take: 1,  
        },  
      },  
    });  
  
    if (!user || user.customAlgorithms.length === 0) {  
      return { status: false };  
    }  
  
    await prisma.customAlgorithm.delete({  
      where: { id: algorithmId },  
    });  
  
    const updatedUser = await prisma.user.findUnique({  
      where: {  
        systemAuth_idAuth: {  
          systemAuth,  
          idAuth: encryptedIdAuth,  
        },  
      },  
      include: {  
        customAlgorithms: true,  
      },  
    });  
  
    return {
        ...updatedUser,
        idAuth: decrypt(updatedUser!.idAuth),
      }; 
  } catch (e) {  
    console.error(e);  
    return { status: false };  
  }  
}