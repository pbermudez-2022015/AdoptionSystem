import mongoose, { mongo } from "mongoose";

const animalShema = mongoose.Schema({

    animal: {
        type: String,
        required: true
    },

    raza: {
        type: String,
    }




})