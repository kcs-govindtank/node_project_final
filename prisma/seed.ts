import { PrismaClient, PublishStatus } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed countries
  await prisma.country.createMany({
    data: [
      { name: 'India', code: '+91', createdAt: new Date() },
      { name: 'United States', code: '+1', createdAt: new Date() },
      { name: 'United Kingdom', code: '+44', createdAt: new Date() },
      { name: 'Australia', code: '+3', createdAt: new Date() },
      { name: 'Canada', code: '+2', createdAt: new Date() },
    ],
    skipDuplicates: true,
  });

  // Seed states
  await prisma.state.createMany({
    data: [
      // India
      { name: 'Gujarat', countryId: 1, createdAt: new Date() },
      { name: 'Maharashtra', countryId: 1, createdAt: new Date() },
      // United States
      { name: 'California', countryId: 2, createdAt: new Date() },
      { name: 'Texas', countryId: 2, createdAt: new Date() },
      // United Kingdom
      { name: 'England', countryId: 3, createdAt: new Date() },
      { name: 'Scotland', countryId: 3, createdAt: new Date() },
      // Australia
      { name: 'New South Wales', countryId: 4, createdAt: new Date() },
      { name: 'Victoria', countryId: 4, createdAt: new Date() },
      // Canada
      { name: 'Ontario', countryId: 5, createdAt: new Date() },
      { name: 'Quebec', countryId: 5, createdAt: new Date() },
    ],
    skipDuplicates: true,
  });

  // Seed categories
  await prisma.category.createMany({
    data: [
      { categoryName: 'Spiritual', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { categoryName: 'Education', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { categoryName: 'Health', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { categoryName: 'Technology', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { categoryName: 'Community', isActive: true, createdAt: new Date(), updatedAt: new Date() },
    ],
    skipDuplicates: true,
  });

  // Seed subcategories
  await prisma.subcategory.createMany({
    data: [
      { categoryId: 1, subcategoryName: 'Bhajan', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { categoryId: 2, subcategoryName: 'Satsang', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { categoryId: 3, subcategoryName: 'Online Courses', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { categoryId: 4, subcategoryName: 'Mental Wellness', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { categoryId: 5, subcategoryName: 'Mobile Apps', isActive: true, createdAt: new Date(), updatedAt: new Date() },
    ],
    skipDuplicates: true,
  });

  console.log('Seed data inserted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });