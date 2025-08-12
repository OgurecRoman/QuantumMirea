import prisma from '../../lib/prisma';
  
export async function getConfiguration() {
  const configurations = await prisma.configurations.findMany({
    where: {
      works: true
      }, 
    },
  );

  return configurations;
}