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

export async function getConfigurationByName(name: string) {
  const configuration = await prisma.configurations.findFirst({
    where: {
      name: name,
      works: true
      }, 
    },
  );

  return configuration;
}

export async function turnOffConfiguration(id: string) {
  await prisma.configurations.update({
      where: { id: id },
      data: {
        works: false,
      },
  });
}

export async function upsertConfiguration(id: string, name: string, job: JobsType, computer: ComputerType) {
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
          name: name,
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