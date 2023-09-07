import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
const coreSchema = new mongoose.Schema({
    vector: { type: Number, required: true, unique: true },
}, { timestamps: true });
coreSchema.plugin(autoIncrement.plugin, {
    model: "Core",
    field: "vector",
    startAt: 0,
    incrementBy: 1,
});
export const Core = mongoose.model("Core", coreSchema);
export default Core;
//# sourceMappingURL=Core.js.map