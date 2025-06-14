import { Router } from 'express';
import { bookValidation } from './book.validation';
import { bookControllers } from './book.controllers';
import { UserRoleEnum } from '@prisma/client';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserRole } from '../../utils/role';

const router = Router();

router.post(
  '/',
  auth(UserRoleEnum.SUPERADMIN),
  validateRequest(bookValidation.createBookSchema),
  bookControllers.createBook,
);
router.get(
  '/:id',
  auth(UserRoleEnum.SUPERADMIN, UserRoleEnum.USER),
  bookControllers.getSingleBook,
);
router.get('/', auth(UserRoleEnum.SUPERADMIN), bookControllers.getBook);

router.post('/issue-book', bookControllers.issueBook);
export const bookRoute = router;
//test