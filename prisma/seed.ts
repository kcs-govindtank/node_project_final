// import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaClient, PublishStatus } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });

async function main() {
  // Only truncate tables that actually exist
  const tables = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
  const existingTables = (tables as Array<{ table_name: string }>).map(t => t.table_name);

  const targets = ['Country', 'State', 'Category', 'SubCategory', 'Event'];
  const tablesToTruncate = targets.filter(t => existingTables.includes(t));

  if (tablesToTruncate.length > 0) {
    const quoted = tablesToTruncate.map(t => `"${t}"`).join(', ');
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${quoted} RESTART IDENTITY CASCADE`);
  }

  // Seed countries - use upsert instead of create to avoid duplicates
  const Countries = [
    { name: 'India', code: '+91' },
    { name: 'United States', code: '+1' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'Australia', code: '+61' },
    { name: 'Canada', code: '+1' },
  ];

  for (const country of Countries) {
    await prisma.country.upsert({
      where: { code: country.code },
      update: {},
      create: { ...country, createdAt: new Date() },
    });
  }

  // Fetch actual country IDs from the database
  const seededCountries = await prisma.country.findMany({
    orderBy: { id: 'asc' }
  });

  // Create a map of country code to ID
  const countryIdMap: Record<string, number> = {};
  for (const country of seededCountries) {
    countryIdMap[country.code] = country.id;
  }

  // Seed states using the actual country IDs
  const states = [
    // India
    { name: 'Gujarat', countryCode: '+91' },
    { name: 'Maharashtra', countryCode: '+91' },
    // United States
    { name: 'California', countryCode: '+1' },
    { name: 'Texas', countryCode: '+1' },
    // United Kingdom
    { name: 'England', countryCode: '+44' },
    { name: 'Scotland', countryCode: '+44' },
    // Australia
    { name: 'New South Wales', countryCode: '+61' },
    { name: 'Victoria', countryCode: '+61' },
    // Canada
    { name: 'Ontario', countryCode: '+1' },
    { name: 'Quebec', countryCode: '+1' },
  ];

  for (const state of states) {
    const countryId = countryIdMap[state.countryCode];
    if (countryId) {
      await prisma.state.create({
        data: { 
          name: state.name, 
          countryId: countryId,
          createdAt: new Date() 
        },
      });
    }
  }

  // Seed categories
  const categories = [
    { categoryName: 'Spiritual' },
    { categoryName: 'Education' },
    { categoryName: 'Health' },
    { categoryName: 'Technology' },
    { categoryName: 'Community' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { categoryName: category.categoryName },
      update: {},
      create: { ...category, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    });
  }

  // Seed subcategories
  const subcategories = [
    { categoryId: 1, subcategoryName: 'Bhajan' },
    { categoryId: 2, subcategoryName: 'Satsang' },
    { categoryId: 3, subcategoryName: 'Online Courses' },
    { categoryId: 4, subcategoryName: 'Mental Wellness' },
    { categoryId: 5, subcategoryName: 'Mobile Apps' },
  ];

  for (const subcategory of subcategories) {
    await prisma.subCategory.upsert({
      where: { subcategoryName: subcategory.subcategoryName },
      update: {},
      create: { ...subcategory, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    });
  }

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