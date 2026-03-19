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
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "9780061120084",
        description: "A novel about racial injustice and childhood in the Deep South",
        totalCopies: 6,
        availableCopies: 6,
        categoryId: literature.id
      },
      {
        title: "1984",
        author: "George Orwell",
        isbn: "9780451524935",
        description: "Dystopian novel about totalitarianism and surveillance",
        totalCopies: 9,
        availableCopies: 9,
        categoryId: literature.id
      },
      {
        title: "The Catcher in the Rye",
        author: "J. D. Salinger",
        isbn: "9780316769488",
        description: "Classic coming-of-age novel set in New York City",
        totalCopies: 5,
        availableCopies: 5,
        categoryId: literature.id
      },
      {
        title: "Moby-Dick",
        author: "Herman Melville",
        isbn: "9781503280786",
        description: "Epic sea story of obsession and survival",
        totalCopies: 4,
        availableCopies: 4,
        categoryId: literature.id
      },
      {
        title: "Clean Architecture",
        author: "Robert C. Martin",
        isbn: "9780134494166",
        description: "A craftsman’s guide to software structure and design",
        totalCopies: 6,
        availableCopies: 6,
        categoryId: programming.id
      },
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt, David Thomas",
        isbn: "9780135957059",
        description: "Your journey to mastery with practical, pragmatic advice",
        totalCopies: 8,
        availableCopies: 8,
        categoryId: programming.id
      },
      {
        title: "Design Patterns",
        author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
        isbn: "9780201633610",
        description: "Elements of reusable object-oriented software",
        totalCopies: 4,
        availableCopies: 4,
        categoryId: programming.id
      },
      {
        title: "Refactoring",
        author: "Martin Fowler",
        isbn: "9780201485677",
        description: "Improving the design of existing code",
        totalCopies: 3,
        availableCopies: 3,
        categoryId: programming.id
      }
    ],
  });

  console.log("Seed data inserted");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });