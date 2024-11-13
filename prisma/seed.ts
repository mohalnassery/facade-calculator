import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Seed Profiles
  const profiles = [
    {
      code: 'E1200',
      name: 'Z FRAME',
      description: 'Standard Z frame profile',
      weight: 424,
      jx: 3.71,
      wx: 12.86,
      jy: 4.86,
      wy: 3.73,
      section: 896,
      unitPrice: 15.50,
    },
    {
      code: 'E1201',
      name: 'L FRAME',
      description: 'Standard L frame profile',
      weight: 450,
      jx: 3.73,
      wx: 4.86,
      jy: 11.43,
      wy: 3.36,
      section: 840,
      unitPrice: 16.75,
    },
    // Add more profiles as needed
  ];

  for (const profile of profiles) {
    await prisma.profile.upsert({
      where: { code: profile.code },
      update: profile,
      create: profile,
    });
  }

  // Seed Accessories
  const accessories = [
    {
      code: 'C0010',
      name: 'WINGS-HINGE',
      description: 'Standard wings hinge',
      giesseCode: '00012',
      unitPrice: 5.25,
    },
    {
      code: 'C0050',
      name: 'WINGS-HINGE',
      description: 'Wings hinge with kit',
      giesseCode: '0098X',
      unitPrice: 6.50,
    },
    // Add more accessories as needed
  ];

  for (const accessory of accessories) {
    await prisma.accessory.upsert({
      where: { code: accessory.code },
      update: accessory,
      create: accessory,
    });
  }

  // Seed Gaskets
  const gaskets = [
    {
      code: 'E2101',
      description: '6mm EPDM gasket',
      material: 'EPDM',
      unitPrice: 1.25,
    },
    {
      code: 'E2102',
      description: '4mm EPDM gasket',
      material: 'EPDM',
      unitPrice: 1.15,
    },
    // Add more gaskets as needed
  ];

  for (const gasket of gaskets) {
    await prisma.gasket.upsert({
      where: { code: gasket.code },
      update: gasket,
      create: gasket,
    });
  }

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });