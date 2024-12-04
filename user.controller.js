const { request, response } = require('express')
const { date } = require('joi')

const userModel =require('../models/index').user

const Op =require('sequelize').Op

const md5 = require (`md5`)
const { where } = require('sequelize')

exports.addUser = (request, response) => {
    let newUser = {
        name: request.body.name,
        username: request.body.username,
        password: md5(request.body.password),
        role: request.body.role
    }

   userModel.create(newUser).then(result => {
        let userData = {
            id: result.id,
            name: result.name,
            username: result.username,
            role: result.role,
        }
        return response.json({
            status: `success`,
            message: `Pengguna berhasil ditambahkan`,
            data: userData
        })
   })
   .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
   })
}

exports.updateUser = (request, response) =>{
    let dataUser = {
        name:request.body.name,
        username: request.body.username,
        password: md5(request.body.password),
        role: request.body.role
    }

    let id = request.params.id

    userModel.update(dataUser, {where: {id: id} }).then(() => {
        userModel.findOne({ where: { id: id} }).then(updateUser => {
            let userData = {
                id: updateUser.id,
                name: updateUser.name,
                username: updateUser.username,
                role: updateUser.role,
            }
            return response.json({
                status: `success`,
                message: `Pengguna berhasil diubah`,
                data: userData
            })
        })
        .catch(error => {
            return response.json({
                status: `error`,
                message: `Gagal mengambil data pengguna setelah update`,
                error: error.message
            })
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            messagae: error.messagae
        })
    })
}

exports.getUserById = async (request, response) => {
    const { id } = request.params
    let userData = await userModel.findOne({ where: { id: id } })
    if (!userData) {
        return response.status(404).json({
            success: false,
            message: `User with ID ${id} not found`
        })
    }
    userData = {
        id: userData.id,
        name: userData.name,
        username: userData.username,
        role: userData.role
    }
    return response.json({
        status: `success`,
        data: userData
    })
}

exports.deleteUser = (request,response) => {
    const { id } = request.params
    userModel.findOne({where: {id: id} }).then(user => {
        if (!user) {
            return response.status(404).json({
                success: false,
                message: `User with ID ${id} not found`
            })
        }
        return userModel.destroy({ where: { id: id } }).then(() => {
            response.json({
                success: true,
                message: `User with ID ${id} has been deleted`
            })
        })
    })
    .catch(error => {
        return response.status(500).json({
            success: false,
            messagae: error.messagae
        })
    })
}

