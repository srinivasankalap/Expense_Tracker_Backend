const Expense = require('../Models/expense');

exports.AddExpense = (req, res, next) => {
    const Name = req.body.Name;
    const Desc = req.body.Desc;
    const Price = req.body.Price;
    return Expense.create({
        Name: Name,
        Desc: Desc,
        Price: Price
    }).then(data => {
        console.log('Successfully added to the database from the page');
        res.redirect('/');
    }).catch(err => console.log(err));
}

exports.getExpense = (req, res, next) => {
    Expense.findAll()
        .then(ExpenseRowData => {
            res.render('index', { expenses: ExpenseRowData, editing: false});
        })
        .catch(err => console.log(err));
}

exports.DeleteExpense = (req, res, next) => {
    const id = req.params.productId;
    console.log(id);
    Expense.findByPk(id)
        .then(Row => {
            return Row.destroy();
        }).then(() => {
            console.log('Successfully deleted ---------------');
            res.redirect('/');
        }).catch(err => console.log(err));
}
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;

    if (!editMode) {
        return res.redirect("/");
    }

    Expense.findAll()
        .then(ExpenseRowData => {
            const productPromise = prodId
                ? Expense.findAll({ where: { id: prodId } })
                : Promise.resolve([]);

            return Promise.all([ExpenseRowData, productPromise]);
        })
        .then(([ExpenseRowData, product]) => {
            const editingProduct = product[0] ? product[0].dataValues : null;
            res.render('index', { expenses: ExpenseRowData, editing: editMode, expense: editingProduct });
        })
        .catch(err => console.log(err));
};

  exports.postEditProduct = (req, res, next) => {
    console.log(req.body);
    const prodId = req.body.productId;
    const updatedName = req.body.Name;
    const updatedPrice = req.body.Price;
    const updatedDesc = req.body.Desc;
    Expense.findByPk(prodId).then(product=>{
      product.Name=updatedName;
      product.Price=updatedPrice;
      product.Desc=updatedDesc;
      return product.save();
    }).then(result=>{
      console.log('UPDATED PRODUCT') 
      console.log(result); 
      res.redirect("/");
    }).catch(err=>console.log(err))
  };
  

exports.editingExpense = (req, res, next) => {
    const id = req.params.id;
    const Name = req.body.Name;
    const Desc = req.body.Desc;
    const Price = req.body.Price;

    Expense.findByPk(id)
        .then(Row => {
            if (Row) {
                Row.Name = Name;
                Row.Desc = Desc;
                Row.Price = Price;
                return Row.save()
                    .then(data => {
                        console.log('Successfully Updated ------');
                        res.redirect('/');
                    });
            } else {
                console.log('Expense not found');
                res.redirect('/');
            }
        })
        .catch(err => {
            console.log('Error updating expense:', err);
            res.redirect('/');
        });
}
