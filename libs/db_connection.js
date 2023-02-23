const {Sequelize} = require('sequelize');

const conn = new Sequelize('bot-o4f','root','',{
    'host':'localhost',
    'dialect':'mysql',
    'logging':false
});

module.exports = conn;