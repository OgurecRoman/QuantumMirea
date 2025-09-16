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

export async function createConfiguration(id: string, job: JobsType) {
  let type = null;
  if (id[0] == '0') type = ComputerType.physical_machine;
  else if (id[0] == '1') type = ComputerType.virtual_machine;
  else type = ComputerType.quantum_computer;

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