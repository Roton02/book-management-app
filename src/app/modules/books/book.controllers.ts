import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookServices } from './book.service';

const createBook = catchAsync(async (req, res) => {
  const bookData = JSON.parse(req.body.data);
  const image = req.file;
  if (!image) {
    {
      throw new Error('Image is required');
    }
  }
  const result = await bookServices.createBookIntroDB(bookData, image);

  sendResponse(res, {
    statusCode: 201,
    message: 'book created in successfully',
    data: result,
  });
});

const getBook = catchAsync(async (req, res) => {
  const result = await bookServices.getBookIntroDb();
  sendResponse(res, {
    statusCode: 201,
    message: 'book retrieved in successfully',
    data: result,
  });
});
const getSingleBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookServices.getSingleBookIntoDB(id);
  sendResponse(res, {
    statusCode: 201,
    message: 'book retrieved in successfully',
    data: result,
  });
});
const issueBook = catchAsync(async (req, res) => {
  const result = await bookServices.getBookIntroDb();
  sendResponse(res, {
    statusCode: 201,
    message: 'book issues in successfully',
    data: result,
  });
});

export const bookControllers = {
  createBook,
  getBook,
  issueBook,
  getSingleBook,
};
