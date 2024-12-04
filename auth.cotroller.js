const express = require(`express`)
const md5 = require(`md5`)
const jwt = require(`jsonwebtoken`)
const userModel = require(`../models/index`).user
const authenticate = async (request,response)=> {
    let dataLogin = {
        username: request.body.username,
        password: md5 (request.body.password)
    }
    let dataUser = await userModel.findOne({where: dataLogin})

    if(dataUser){
        let payload = JSON.stringify(dataUser)
        let secret = `mokleters`
        let token = jwt.sign(payload,secret)
        return response.json({
            success: true,
            // logged:true,
            message:`Authentication Successed`,
            token: token,
            // data: dataUser

        })
    }

    return response.json({
        success:false,
        logged:false,
        message: `Authentication Failed. Invalid username or password`
    })
    
}
      module.exports={authenticate}

