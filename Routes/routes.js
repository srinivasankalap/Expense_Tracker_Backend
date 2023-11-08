
const express = require('express');

const router = express.Router();
const controller = require('../controllers/controller');

router.get('/',controller.getExpense);
router.post('/add-expense',controller.AddExpense);
router.get('/delete-expense/:productId',controller.DeleteExpense);
router.get('/:productId', controller.getEditProduct);

router.post('/edit-expense', controller.postEditProduct);
// router.put('/:id',controller.editingExpense);

module.exports = router;