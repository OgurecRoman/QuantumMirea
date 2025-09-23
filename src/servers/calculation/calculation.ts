import prisma from '../../lib/prisma';
import { Prisma } from '@prisma/client';
import { getUser } from '../user/user.js'
import { CalculationsType, CalculationsStatus } from '@prisma/client'

export async function createCalculation(systemAuth: string, idAuth: string, 
    type: CalculationsType, src: Prisma.InputJsonValue, confId: string) {

  try {
    const user = await getUser(systemAuth, idAuth);

    if (!user) {
      throw new Error("User not found");
    }

    const calculation = await prisma.calculations.create({
      data: {
        type: type,
        status: CalculationsStatus.queued,
        src: src,
        result: {},
        metrics: {},
        authorId: user.id,
        confId: confId,
        startAt: new Date(),
        finishAt: new Date()
      },
      include: {
        author: true,
        idConfigurations: true
        }
    });

    return calculation;

  } catch (error) {
    console.error("Error creating calculation:", error);
    throw error;
  }
}

export async function updateCalculation(id: number, result: Prisma.InputJsonValue, metrics: Prisma.InputJsonValue) {

  try {
    const calculation = await prisma.calculations.update({
        where: {
            id: id
        },
        data: {
            status: CalculationsStatus.success,
            result: result,
            metrics: metrics,
            finishAt: new Date()
        },
    });

    return calculation;

  } catch (error) {
    console.error("Error creating calculation:", error);
    throw error;
  }
}