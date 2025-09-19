import prisma from '../../lib/prisma';
import { JobsType, ComputerType } from '@prisma/client'
  
export async function getConfiguration() {
  const configurations = await prisma.configurations.findMany({
    where: {
      works: true
      }, 
    },
  );

  return configurations;
}

export async function upsertConfiguration(id: string, job: JobsType, computer: ComputerType) {
  try {
    await prisma.configurations.update({
      where: { id: id },
      data: {
        works: true,
      },
    });
    return true;
    
  } catch (error) {
    await prisma.configurations.create({
      data: {
          id: id,
          type: computer,
          jobs: job,
          works: true,
        }
      },
    );
    return false;
  }
}

export async function changeStatus() {
  try {
    const result = await prisma.configurations.updateMany({
      where: {
        works: true,
      },
      data: {
        works: false,
      },
    });

  } catch (error) {
    console.error('Error updating configurations:', error);
    throw error;
  }
}