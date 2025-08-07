import prisma from '../../lib/prisma';
import { Prisma } from '@prisma/client';
import { getUser } from '../user/user.js'
import { encrypt, decrypt } from '../../lib/cryptoUtils';
  
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

    return {
        ...user,
        idAuth: decrypt(user.idAuth),
      };
  } catch (e) {  
    console.error(e);  
    return { status: false };  
  }  
}

type GateUpdateInput = {  
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
  
export async function updateUserGate(systemAuth: string, idAuth: string, updateData: GateUpdateInput) {  
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
          idAuth: encryptedIdAuth,  
        },  
      },  
      include: {  
        customGates: true,  
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
  
export async function deleteUserGate(systemAuth: string, idAuth: string, gateId: number) {  
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
          idAuth: encryptedIdAuth,  
        },  
      },  
      include: {  
        customGates: true,  
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

// Composite gates

export async function getCompositeGates(systemAuth: string, idAuth: string) {  
  const user = await getUser(systemAuth, idAuth);
  return user.customCompositeGates;  
}  

type CompositeGateCreateInput = {
  title: string;
  description: string;
  gates: Prisma.InputJsonValue;
};
  
export async function upsertUserWithMultipleCompositeGates(systemAuth: string, idAuth: string, 
  gatesData: CompositeGateCreateInput[]) {  

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
        customCompositeGates: {  
          create: gatesData,  
        },  
      },  
      update: {  
        customCompositeGates: {  
          create: gatesData,  
        },  
      },  
      include: {  
        customCompositeGates: true,  
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

type CompositeGateUpdateInput = {
  id: number;
  title: string;
  description: string;
  gates: Prisma.InputJsonValue;
  authorId: number;
};
  
export async function updateCompositeGate(systemAuth: string, idAuth: string, updateData: CompositeGateUpdateInput) {  
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
        customCompositeGates: {  
          where: { id: updateData.id },  
          take: 1,  
        },  
      },  
    }); 
  
    if (!userWithGate || userWithGate.customCompositeGates.length === 0) {  
      return { status: false };  
    }  
  
    await prisma.customCompositeGate.update({  
      where: { id: updateData.id },  
      data: {  
        title: updateData.title,  
        description: updateData.description,  
        gates: updateData.gates,
        authorId: updateData.authorId,
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
        customCompositeGates: true,  
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
  
export async function deleteCompositeGate(systemAuth: string, idAuth: string, gateId: number) {  
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
        customCompositeGates: {  
          where: { id: gateId },  
          take: 1,  
        },  
      },  
    });  
  
    if (!user || user.customCompositeGates.length === 0) {  
      return { status: false };  
    }  
      
    await prisma.customCompositeGate.delete({  
      where: { id: gateId },  
    });  
    const updatedUser = await prisma.user.findUnique({  
      where: {  
        systemAuth_idAuth: {  
          systemAuth,  
          idAuth: encryptedIdAuth,  
        },  
      },  
      include: {  
        customCompositeGates: true,  
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