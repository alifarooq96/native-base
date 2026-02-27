import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const url = process.env.DATABASE_URL!;
const separator = url.includes('?') ? '&' : '?';
const connectionString = `${url}${separator}uselibpqcompat=true`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.bookingConfig.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      timezone: 'Asia/Karachi',
      slotDurationMin: 15,
      startHour: 15,
      endHour: 1,
      workingDays: [1, 2, 3, 4, 5],
      minNoticeHours: 3,
      bufferMinutes: 0,
    },
  });

  console.log('Seeded default BookingConfig');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
