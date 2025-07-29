import prisma from '../../prisma.js';
import { getUser } from '../user/user.js'
  
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
  try {  
    return await prisma.user.upsert({  
      where: {  
        systemAuth_idAuth: {  
          systemAuth,  
          idAuth,  
        },  
      },  
      create: {  
        systemAuth,  
        idAuth,  
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
  } catch (e) {  
    console.error(e);  
    return { status: false };  
  }  
}
  
export type AlgorithmUpdateInput = {  
  id: number;  
  title: string;  
  description: string;  
  qubit: number;  
  column: number;  
  data: object[];  
};  

export function isAlgorithmInput(algorithm: any, post: boolean): algorithm is AlgorithmCreateInput | AlgorithmUpdateInput {
  if (!post){
    if (typeof algorithm?.id !== 'number') return false;
  }
  if (
    !Array.isArray(algorithm?.data) ||
    !algorithm.data.every((item: Object) => typeof item === 'object' && item !== null)
  ) return false;
  
  return (
      typeof algorithm?.title === 'string' &&
      typeof algorithm?.description === 'string' &&
      typeof algorithm?.qubit === 'number' &&
      typeof algorithm?.column === 'number'
    );
  
}
  
export async function updateUserAlgorithm(systemAuth: string, idAuth: string, updateData: AlgorithmUpdateInput) {  
  try {  
    const userWithGate = await prisma.user.findUnique({  
      where: {  
        systemAuth_idAuth: {  
          systemAuth,  
          idAuth,  
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
          idAuth,  
        },  
      },  
      include: {  
        customAlgorithms: true,  
      },  
    });  
  
    return updatedUser;  
  } catch (e) {  
    console.error(e);  
    return { status: false };  
  }  
}
  
export async function deleteUserAlgorithm(systemAuth: string, idAuth: string, algorithmId: number) {  
  try {  
    const user = await prisma.user.findUnique({  
      where: {  
        systemAuth_idAuth: {  
          systemAuth,  
          idAuth,  
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
          idAuth,  
        },  
      },  
      include: {  
        customAlgorithms: true,  
      },  
    });  
  
    return updatedUser;  
  } catch (e) {  
    console.error(e);  
    return { status: false };  
  }  
}