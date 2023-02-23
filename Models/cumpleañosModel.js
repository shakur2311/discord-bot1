const conn = require('../libs/db_connection');
const {DataTypes} = require('sequelize');

const cumpleañosModel = conn.define('cumpleanos',{
    idCumpleanos:{type: DataTypes.INTEGER,
                    primaryKey:true,autoIncrement:true},
    nombreCumpleanos:{type: DataTypes.STRING},
    nickCumpleanos: {type: DataTypes.STRING},
    fechaCumpleanos: {type: DataTypes.STRING}
},{timestamps:false});

module.exports = cumpleañosModel