const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Expense = sequelize.define('expense',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    Name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Desc:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Price:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
});

module.exports = Expense;