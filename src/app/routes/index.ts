import express from 'express';
import { AuthRouters } from '../modules/Auth/auth.routes';
import { UserRouters } from '../modules/User/user.routes';
import { bookRoute } from '../modules/books/book.routes';
import { bookIssueRoute } from '../modules/book_issue/book_issue.routes';
import { paymentRoutes } from '../modules/payment/payment.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouters,
  },
  {
    path: '/user',
    route: UserRouters,
  },
  {
    path: '/book',
    route: bookRoute,
  },
  {
    path: '/book-issue',
    route: bookIssueRoute,
  },
  {
    path: '/payment',
    route: paymentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
// This file is used to define the routes for the application.
