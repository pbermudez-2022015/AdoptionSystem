import mongoose, { mongo } from "mongoose";

const animalShema = mongoose.Schema({

    nameAnimal: {
        type: String,
        required: true
    },

    raza: {
        type: String,
        required: true
    },

    color: {
        type: String,
        required: true
    },

    paws: {
        type: String,
        required: true
    },

    characteristics: {
        type: String,
        require: true
    }


})

export default mongoose.model('animal', animalShema)