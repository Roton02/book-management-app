import { IBook } from '../../interface/types';
import prisma from '../../utils/prisma';
import { uploadToDigitalOceanAWS } from '../../utils/uploadToDigitalOceanAWS';

const createBookIntroDB = async (bookData: IBook , image: Express.Multer.File) => {
  // console.log(bookData, image);

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: bookData.authorId, // Assuming authorId is the user ID
    },
  });

  if ((!isUserExist && isUserExist) || isUserExist?.role !== 'SUPERADMIN') {
    throw new Error(
      'User does not exist or is not authorized to create a book',
    );
  }
  //coverImageUrl
  const bookImage = await uploadToDigitalOceanAWS(image)
  bookData.coverImageUrl = bookImage.Location;

  const book = await prisma.book.create({
    data: bookData,
    include: {
      author: true, // Assuming you want to include user details
    },
  });
  return book; // Simulating a database operation
};
const getBookIntroDb = async () => {
  const book = await prisma.book.findMany({
    include: {
      author: true, // Assuming you want to include user details
    },
  });
  return book; // Simulating a database operation
};
const getSingleBookIntoDB = async (id: string) => {
  const book = await prisma.book.findFirst({
    where: {
      id: id,
    },
    include: {
      author: true, // Assuming you want to include user details
    },
  });
  return book; // Simulating a database operation
};
const issueBooksIntroDB = async (bookData: IBook) => {
  const book = await prisma.book.create({
    data: bookData,
    include: {
      author: true, // Assuming you want to include user details
    },
  });
  return book; // Simulating a database operation
};

export const bookServices = {
  createBookIntroDB,
  getBookIntroDb,
  issueBooksIntroDB,
  getSingleBookIntoDB,
};
