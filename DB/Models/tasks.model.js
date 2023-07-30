


//tasks collection-->schema(title , description , status{toDo , doing , done} , userId , assignTo , deadline)

import { Schema, Types, model } from "mongoose";



const tasksShema = Schema({
    title: String,
    description: String,
    status: {
        type: String,
        enum: ["toDo", "doing", "done"],
        default: "toDo"
    },
    userId: {
        type: Types.ObjectId,
        ref: "user",
        require: true
    },
    assignTo: {
        type: Types.ObjectId,
        ref: "user"
    },
    deadline: Date
})

const tasksModel = model("task", tasksShema)

export default tasksModel;