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

export async function upsertConfiguration(id: string, job: JobsType) {
  let type = null;
  if (id[0] == '0') type = ComputerType.physical_machine;
  else if (id[0] == '1') type = ComputerType.virtual_machine;
  else type = ComputerType.quantum_computer;

  try {
    const configuration = await prisma.configurations.update({
      where: { id: id },
      data: {
        works: true,
      },
    });

    return configuration;
    
  } catch (error) {
    const configurations = await prisma.configurations.create({
      data: {
          id: id,
          type: type,
          jobs: job,
          works: true,
        }
      },
    );
    return configurations;
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