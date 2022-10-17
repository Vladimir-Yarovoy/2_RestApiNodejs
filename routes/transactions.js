import Router from 'express';

import TransactionController from '../controllers/transactions.js';

const transactionsRoutes = new Router();

transactionsRoutes.get('/', TransactionController.getAllTransactions);

transactionsRoutes.post('/', TransactionController.createTransaction);

transactionsRoutes.get('/:id', TransactionController.getTransaction);

transactionsRoutes.delete('/:id', TransactionController.deleteTransaction);

transactionsRoutes.patch('/:id', TransactionController.updateTransaction);

export default transactionsRoutes