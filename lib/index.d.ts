import { Router } from "express";
import { Document, Model } from "mongoose";
import Core from "./Core";
type CrudRouterOptions<T extends Document> = {
    model: Model<T>;
};
declare function createCrudRouter<T extends Document>({ model, }: CrudRouterOptions<T>): Router;
export { Core, createCrudRouter };
