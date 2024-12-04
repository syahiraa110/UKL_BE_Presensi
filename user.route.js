/** load library express */
const express = require(`express`)

/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */
app.use(express.json())

/** load user's controller */
const userController = require(`../controllers/user.controller`)
let {validateUser}= require(`../middlewares/user_validation`)

/** create route to add new user using method POST */
app.post("/", userController.addUser)

/**create route to update user using method "PUT" and define parameter for "id" */
app.put("/:id", userController.updateUser)
app.get("/:id", userController.getUserById);

/** method DELETE */
app.delete("/:id", userController.deleteUser)

/** export app in order to load in another file */
module.exports = app



