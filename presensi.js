'use strict';
const{
    Model,
    DataTypes
} = require('sequelize');
const { sequelize } = require('.');
module.exports = (sequelize, DataTypes) =>{
    class presensi extends Model {
        static associate(models){
            this.belongsTo(models.user)

        }
    }
    presensi.init({
        user_id: DataTypes.INTEGER,
        date: DataTypes.DATE,
        time:DataTypes.TIME,
        status: DataTypes.ENUM('hadir','izin','sakit','alpha')
    }, {
        sequelize,
        modelName: 'presensi',
    });
    presensi.associate = function(models) {
        presensi.belongsTo(models.user, { foreignKey: 'user_id' })
    }
    return presensi;
}