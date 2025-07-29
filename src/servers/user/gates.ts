import prisma from '../../prisma';
import { getUser } from '../user/user.js'
  
export async function getUserGates(systemAuth: string, idAuth: string) {  
  const user = await getUser(systemAuth, idAuth);
  return user.customGates;  
}  

type GateCreateInput = {  
  title: string;  
  description: string;  
  complexOneOne: number;  
  complexOneTwo: number;  
  complexTwoOne: number;  
  complexTwoTwo: number;  
  complexThreeOne: number;  
  complexThreeTwo: number;  
  complexFourOne: number;  
  complexFourTwo: number;  
};  
  
export async function upsertUserWithMultipleGates(systemAuth: string, idAuth: string, gatesData: GateCreateInput[]) {  
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
        customGates: {  
          create: gatesData,  
        },  
      },  
      update: {  
        customGates: {  
          create: gatesData,  
        },  
      },  
      include: {  
        customGates: true,  
      },  
    });  
  } catch (e) {  
    console.error(e);  
    return { status: false };  
  }  
}

export type GateUpdateInput = {  
  id: number;  
  title: string;  
  description: string;  
  complexOneOne: number;  
  complexOneTwo: number;  
  complexTwoOne: number;  
  complexTwoTwo: number;  
  complexThreeOne: number;  
  complexThreeTwo: number;  
  complexFourOne: number;  
  complexFourTwo: number;  
};  

export function isGateInput(gate: any, post: boolean): gate is GateCreateInput | GateUpdateInput {
  if (!post){
    if (typeof gate?.id !== 'number') return false;
  }
  return (
      typeof gate?.title === 'string' &&
      typeof gate?.description === 'string' &&
      typeof gate?.complexOneOne === 'number' &&
      typeof gate?.complexOneTwo === 'number' &&
      typeof gate?.complexTwoOne === 'number' &&
      typeof gate?.complexTwoTwo === 'number' &&
      typeof gate?.complexThreeOne === 'number' &&
      typeof gate?.complexThreeTwo === 'number' &&
      typeof gate?.complexFourOne === 'number' &&
      typeof gate?.complexFourTwo === 'number'
    );
  
}
  
export async function updateUserGate(systemAuth: string, idAuth: string, updateData: GateUpdateInput) {  
  try {  
    const userWithGate = await prisma.user.findUnique({  
      where: {  
        systemAuth_idAuth: {  
          systemAuth,  
          idAuth,  
        },  
      },  
      include: {  
        customGates: {  
          where: { id: updateData.id },  
          take: 1,  
        },  
      },  
    }); 
  
    if (!userWithGate || userWithGate.customGates.length === 0) {  
      return { status: false };  
    }  
  
    await prisma.customGate.update({  
      where: { id: updateData.id },  
      data: {  
        title: updateData.title,  
        description: updateData.description,  
        complexOneOne: updateData.complexOneOne,  
        complexOneTwo: updateData.complexOneTwo,  
        complexTwoOne: updateData.complexTwoOne,  
        complexTwoTwo: updateData.complexTwoTwo,  
        complexThreeOne: updateData.complexThreeOne,  
        complexThreeTwo: updateData.complexThreeTwo,  
        complexFourOne: updateData.complexFourOne,  
        complexFourTwo: updateData.complexFourTwo,  
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
        customGates: true,  
      },  
    });  
  
    return updatedUser;  
  } catch (e) {  
    console.error(e);  
    return { status: false };  
  }  
}
  
export async function deleteUserGate(systemAuth: string, idAuth: string, gateId: number) {  
  try {  
    const user = await prisma.user.findUnique({  
      where: {  
        systemAuth_idAuth: {  
          systemAuth,  
          idAuth,  
        },  
      },  
      include: {  
        customGates: {  
          where: { id: gateId },  
          take: 1,  
        },  
      },  
    });  
  
    if (!user || user.customGates.length === 0) {  
      return { status: false };  
    }  
      
    await prisma.customGate.delete({  
      where: { id: gateId },  
    });  
    const updatedUser = await prisma.user.findUnique({  
      where: {  
        systemAuth_idAuth: {  
          systemAuth,  
          idAuth,  
        },  
      },  
      include: {  
        customGates: true,  
      },  
    });  
  
    return updatedUser;  
  } catch (e) {  
    console.error(e);  
    return { status: false };  
  }  
}