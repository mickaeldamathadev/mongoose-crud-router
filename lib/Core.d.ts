import mongoose, { Document, Types } from "mongoose";
export interface ICore extends Document<Types.ObjectId> {
    vector: number;
}
export declare const Core: mongoose.Model<ICore, {}, {}, {}, mongoose.Document<unknown, {}, ICore> & ICore & Required<{
    _id: Types.ObjectId;
}>, any>;
export default Core;
