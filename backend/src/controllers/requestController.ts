import { Request, Response } from "express";
import prisma from "../config/prisma";

export const requestBook = async (req: any, res: Response) => {
  try {
    const { bookId } = req.body;

    const request = await prisma.borrowRequest.create({
      data: {
        userId: req.user.id,
        bookId: bookId,
      },
    });

    res.status(201).json({
      message: "Book request sent",
      request,
    });
  } catch (error) {
    res.status(500).json({ message: "Error requesting book" });
  }
};

export const approveRequest = async (req: Request, res: Response) => {
  try {
    const requestId = Number(req.params.id);

    const request = await prisma.borrowRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    await prisma.borrowRecord.create({
      data: {
        userId: request.userId,
        bookId: request.bookId,
        dueDate,
      },
    });

    await prisma.borrowRequest.update({
      where: { id: requestId },
      data: { status: "approved" },
    });

    await prisma.book.update({
      where: { id: request.bookId },
      data: {
        availableCopies: {
          decrement: 1,
        },
      },
    });

    res.json({ message: "Request approved and book issued" });
  } catch (error) {
    res.status(500).json({ message: "Error approving request" });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const recordId = Number(req.params.id);

    const record = await prisma.borrowRecord.findUnique({
      where: { id: recordId },
    });

    if (!record) {
      return res.status(404).json({ message: "Borrow record not found" });
    }

    const returnDate = new Date();
    let fine = 0;

    if (returnDate > record.dueDate) {
      const diff = Math.ceil(
        (returnDate.getTime() - record.dueDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      fine = diff * 5;
    }

    await prisma.borrowRecord.update({
      where: { id: recordId },
      data: {
        returnDate,
        fine,
      },
    });

    await prisma.book.update({
      where: { id: record.bookId },
      data: {
        availableCopies: {
          increment: 1,
        },
      },
    });

    res.json({
      message: "Book returned",
      fine,
    });
  } catch (error) {
  console.log(error);
  res.status(500).json({ message: "Error requesting book", error });
}
};

export const getAllRequests = async (req: Request, res: Response) => {
  try {
    const requests = await prisma.borrowRequest.findMany({
      include: {
        user: true,
        book: true,
      },
    });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests" });
  }
};  

export const getUserBorrowHistory = async (req: any, res: Response) => {
  try {
    const records = await prisma.borrowRecord.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        book: true,
      },
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching borrow history" });
  }
};

export const getOverdueBooks = async (req: Request, res: Response) => {
  try {
    const today = new Date();

    const overdue = await prisma.borrowRecord.findMany({
      where: {
        returnDate: null,
        dueDate: {
          lt: today
        }
      },
      include: {
        user: true,
        book: true
      }
    });

    res.json(overdue);
  } catch (error) {
    res.status(500).json({ message: "Error fetching overdue books" });
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalBooks = await prisma.book.count();
    const totalUsers = await prisma.user.count();
    const activeBorrows = await prisma.borrowRecord.count({
      where: { returnDate: null }
    });
    const overdueBooks = await prisma.borrowRecord.count({
      where: {
        returnDate: null,
        dueDate: { lt: new Date() }
      }
    });

    res.json({
      totalBooks,
      totalUsers,
      activeBorrows,
      overdueBooks
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
};