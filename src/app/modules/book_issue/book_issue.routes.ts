import { Router } from 'express'
import { bookIssueValidation } from './book_issue.validation'
import { bookIssueController } from './book_issue.controller'
import { UserRoleEnum } from '@prisma/client'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'

const router = Router()

router.post(
  '/',
  auth(UserRoleEnum.SUPERADMIN, UserRoleEnum.USER),
  validateRequest(bookIssueValidation.createBookIssueSchema),
  bookIssueController.createBookIssue,
)

router.get(
  '/',
  auth(UserRoleEnum.SUPERADMIN),
  bookIssueController.getAllBookIssues,
)

router.get(
  '/:id',
  auth(UserRoleEnum.SUPERADMIN, UserRoleEnum.USER),
  bookIssueController.getSingleBookIssue,
)

router.patch(
  '/:id/return',
  auth(UserRoleEnum.SUPERADMIN, UserRoleEnum.USER),
  bookIssueController.returnBook,
)
router.patch(
  '/:id/renew',
  auth(UserRoleEnum.SUPERADMIN, UserRoleEnum.USER),
  bookIssueController.renewBook,
)

export const bookIssueRoute = router
