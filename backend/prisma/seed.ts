import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const programming = await prisma.category.upsert({
    where: { name: "Programming" },
    update: {},
    create: { name: "Programming" }
  });

  const literature = await prisma.category.upsert({
    where: { name: "English Literature" },
    update: {},
    create: { name: "English Literature" }
  });

  await prisma.book.createMany({
    data: [
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "9780132350884",
        description: "Software craftsmanship",
        totalCopies: 10,
        availableCopies: 10,
        categoryId: programming.id
      },
      {
        title: "Introduction to Algorithms",
        author: "CLRS",
        isbn: "9780262033848",
        description: "Algorithms book",
        totalCopies: 5,
        availableCopies: 5,
        categoryId: programming.id
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "9780743273565",
        description: "Classic novel",
        totalCopies: 8,
        availableCopies: 8,
        categoryId: literature.id
      },
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        isbn: "9780141439518",
        description: "English literature classic",
        totalCopies: 7,
        availableCopies: 7,
        categoryId: literature.id
      }
    ],
    skipDuplicates: true
  });

  console.log("Seed data inserted");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });