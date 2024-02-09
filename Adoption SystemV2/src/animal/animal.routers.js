import  express  from 'express'
import { registerAnimal, testAnimal, updateAnimal, deleteA } from './animal.controller.js'


const api = express.Router()

api.get('/testAnimal', testAnimal)
api.post('/registerAnimal', registerAnimal)
api.put('/updateAnimal/:id', updateAnimal)
api.delete('/deleteA/:id', deleteA)
export default api