import { Schema, model } from "mongoose";

export interface IUser {
    _id? : string;
    username : string;
    password :string ;
    availableMoney : number;
    // puchasedItems : string[];
}

const UserSchema = new Schema<IUser>({
    username : {type : String, required : true, unique : true},
    password : {type : String , unique : true},
    availableMoney : {type : Number, default : 5000},
    //purchasedItems
})
 export const  UserModel = model<IUser>("user",UserSchema)