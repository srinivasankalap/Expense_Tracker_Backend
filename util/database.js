const Sequelize = require('sequelize');

const sequelize =  new Sequelize('expense2','root','123456',{dialect:'mysql',host:'localhost', port: '3307'});

module.exports = sequelize;