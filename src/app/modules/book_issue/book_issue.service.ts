/* eslint-disable @typescript-eslint/no-unused-vars */
import calculatePenalty from '../../utils/calculatePenalty';
import prisma from '../../utils/prisma';
import { IssueStatus } from '@prisma/client';

const createBookIssue = async (payload: {
  bookId: string;
  userId: string;
  returnDate?: string;
  allowedHours?: number;
}) => {
  const result = await prisma.bookIssue.create({
    data: {
      bookId: payload.bookId,
      userId: payload.userId,
      returnDate: payload.returnDate ? new Date(payload.returnDate) : null,
      status: IssueStatus.ISSUED,
      allowedHours: payload.allowedHours,
    },
    include: {
      book: true,
      user: true,
    },
  });
  return result;
};

const getAllBookIssues = async () => {
  const result = await prisma.bookIssue.findMany({
    include: {
      book: true,
      user: true,
    },
  });
  return result;
};

const getSingleBookIssue = async (id: string) => {
  const result = await prisma.bookIssue.findUnique({
    where: {
      id,
    },
    include: {
      book: true,
      user: true,
    },
  });
  return result;
};

// when user return the book then calculate the issue date and time and return date and time  , if the return time is greater the issued time then send a penalty which is 10 tk per hours , when a book will be issue create get the issue time or hours like 5 hours , then save the current time and and when user return the book then check the current time and issue time if the current time is greater than issue time then calculate the penalty, so there are two time one is issue time and one is return time, if the return time is greater than issue time then calculate the penalty and update the status to returned

const updateBookIssueStatus = async (
  id: string,
  status: IssueStatus,
  returnDate: Date,
) => {
  // console.log('first')
  // First get the existing book issue to access issue date
  const bookIssue = await prisma.bookIssue.findUnique({
    where: { id },
  });
  if (!bookIssue) {
    throw new Error('Book issue not found');
  }
  if (bookIssue.status === IssueStatus.RETURNED) {
    throw new Error('Book has already been returned');
  }
  // Calculate penalty
  const penalty = calculatePenalty(
    bookIssue.issueDate,
    returnDate,
    bookIssue.allowedHours ? bookIssue.allowedHours : 0,
  );

  const result = await prisma.bookIssue.update({
    where: {
      id,
    },
    data: {
      status,
      returnDate,
    },
    include: {
      book: true,
      user: true,
    },
  });
  console.log(penalty);

  return {
    penalty,
    message:
      penalty > 0
        ? `Late return penalty: ${penalty} TK - please pay at the library`
        : 'Returned on time - no penalty',
  };
};

const reNewBookIntroDB = async (id: string) => {
  const bookIssue = await prisma.bookIssue.findUniqueOrThrow({
    where: { id },
  });
  if (!bookIssue) {
    throw new Error('Book issue not found');
  }
  if (bookIssue.status === 'RETURNED') {
    throw new Error('Cannot renew a book that has already been returned');
  }
  const result = await prisma.bookIssue.update({
    where: {
      id,
    },
    data: {
      status: IssueStatus.ISSUED,
      allowedHours: bookIssue.allowedHours! + 2,
    },
    include: {
      book: true,
      user: true,
    },
  });
  return result;
};

export const bookIssueService = {
  createBookIssue,
  getAllBookIssues,
  getSingleBookIssue,
  updateBookIssueStatus,
  reNewBookIntroDB,
};
