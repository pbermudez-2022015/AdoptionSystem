'use strict'

import User from './user.model.js'
import { checkPassword, checkUpdate, encrypt } from '../utils/validator.js' 

export const test = (req, res) => {
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const register = async(req, res)=>{
    try{
        // Siguimento que hace Google (gmail)
        // Capturar el formulario (body)
        let data = req.body
        console.log(data)
        // Encriptar la contrasena
        data.password = await encrypt(data.password)
        // Asignar el rol por defecto
        data.role = 'CLIENT'
        // Guardar la informacion en la BD
        let user = new User(data)
        await user.save()
        // Responder al usuario
        return res.send({message: `Registered successfully, can be logged with ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user', err: err})
    }
}

export const  login = async(req, res)=>{
    try {
       //Capturar los datos (body)
       let { username, password } = req.body
       //validar que el usuario exista
       let user = await User.findOne({username})//buscar un solo registro username: 'jprime'
       //verifico que la contrase;a conincida
       if(user && checkPassword(password, user.password)){
        let loggedUser = {
            user: user.username,
            role: user.role
        }
        return res.send({message: `Welcome ${user.name}`, loggedUser}) 
       }
        return res.status(404).send({message: 'Invalid credentials'})
       //Responde al usuario
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error to login'})        
    }
}

export const update = async(req, res) =>{ //datos generales (no password)
    
    try {
        //Obtener el id del usuario actualizar
        let { id } = req.params
        //Obtener los datos a actualizar
        let data = req.body
        //Validar si tiene permisos (tokenizacion) X hoy no lo vemos X
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have sumitted data that update'})
        //Actualizar (DB)
        let updateUser = await User.findOneAndUpdate(
            {_id: id}, //ObjectId <- hexadecimales (hora sys, Bersion Mongo, llave private)
            data, //Los datos que se van actualizar
            { new: true }

            )
        //Validar la actualización
        if(!updateUser) return res.status(401).send({message: 'User not found'})
        //Respondo al usuario
            return res.send({message: 'Update User', updateUser})
    } catch (err) {
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is already taken`})
            return res.status(500).send({message: 'Error upting account'})
    }
}

    export const deleteU = async(req, res)=>{
        try {
            //Obtener el Id
            let { id } = req.params
            //Validar si esta logeando y es el mismo X nolo vremos hoy x
            //eliminar (deleteOne / indOneand delete)
                let deleteUser = await User.findOneAndDelete({_id: id})
            //verificar que se elimino
            if(!deleteUser) return res.satatus(404).send({message: 'Account not found and not deleted'})
            //responder
            return res.send({message: `Account with username ${deleteUser.username} deleted successfully`})
        } catch (err) {
            console.error(err)
            return res.status(500).send({message: 'Error deleting account'})
        }

    }