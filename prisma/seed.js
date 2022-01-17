
  
const { PrismaClient } = require('@prisma/client')
const { links } = ('../data/links')
const prisma = new PrismaClient();
console.log('prisma', prisma.link)

async function main() {
  // await prisma.user.create({
  //   data: {
  //     email: `abdelwahab@prisma.io`,
  //     role: 'ADMIN',
  //   },
  // });

  await prisma.link.createMany({
    data: links,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });