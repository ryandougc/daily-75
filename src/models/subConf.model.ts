import { Schema } from "mongoose";

export interface ISubConf {
    userId: string,
    userEmail: string,
    token: string,
    expiryDate: Date
}

export const subConfSchema = new Schema<ISubConf>({
    userId: {
        required: true,
        type: String
    },
    userEmail: {
        required: true,
        type: String
    },
    token: {
        required: true,
        type: String,
    },
    expiryDate: {
        required: false,
        type: Date
    }
});