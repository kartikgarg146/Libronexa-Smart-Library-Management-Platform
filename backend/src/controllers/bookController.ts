import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        category: true,
      },
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

export const addBook = async (req: Request, res: Response) => {
  try {
    const {
      title,
      author,
      isbn,
      description,
      coverImage,
      totalCopies,
      categoryId,
    } = req.body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        isbn,
        description,
        coverImage,
        totalCopies,
        availableCopies: totalCopies,
        categoryId,
      },
    });

    res.status(201).json(book);
  }catch (error) {
  console.log(error);
  res.status(500).json({ message: "Error adding book", error });
}
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(req.params.id) },
      include: { category: true },
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book" });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    await prisma.book.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
  }
};