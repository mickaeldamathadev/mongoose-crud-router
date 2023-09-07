import mongoose, { Document, Types } from "mongoose";
import autoIncrement from "mongoose-auto-increment";
export interface ICore extends Document<Types.ObjectId> {
  vector: number;
}

const coreSchema = new mongoose.Schema<ICore>(
  {
    vector: { type: Number, required: true, unique: true },
  },
  { timestamps: true },
);

coreSchema.plugin(autoIncrement.plugin, {
  model: "Core",
  field: "vector",
  startAt: 0,
  incrementBy: 1,
});

export const Core = mongoose.model<ICore>("Core", coreSchema);

export default Core;