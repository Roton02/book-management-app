import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { bookIssueService } from './book_issue.service'
import { IssueStatus } from '@prisma/client'

const createBookIssue = catchAsync(async (req: Request, res: Response) => {
  const result = await bookIssueService.createBookIssue(req.body)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Book issued successfully',
    data: result,
  })
})

const getAllBookIssues = catchAsync(async (req: Request, res: Response) => {
  const result = await bookIssueService.getAllBookIssues()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book issues retrieved successfully',
    data: result,
  })
})

const getSingleBookIssue = catchAsync(async (req: Request, res: Response) => {
  const result = await bookIssueService.getSingleBookIssue(req.params.id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book issue retrieved successfully',
    data: result,
  })
})

const returnBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookIssueService.updateBookIssueStatus(
    req.params.id,
    IssueStatus.RETURNED,
    new Date(),
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book returned successfully',
    data: result,
  })
})
const renewBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookIssueService.reNewBookIntroDB(req.params.id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book renew successfully',
    data: result,
  })
})

export const bookIssueController = {
  createBookIssue,
  getAllBookIssues,
  getSingleBookIssue,
  returnBook,
  renewBook,
}
