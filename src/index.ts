import { Request, Response, Router } from "express";
import { Document, Model } from "mongoose";
import Core from "./Core";
type CrudRouterOptions<T extends Document> = {
  model: Model<T>;
};

function createCrudRouter<T extends Document>({
  model,
}: CrudRouterOptions<T>): Router {
  const router = Router();

  // GET / - Get all documents
  router.get("/", async (req: Request, res: Response) => {
    try {
      const documents = await model.find();
      res.json(documents);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // GET /:id - Get a document by ID
  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const document = await model.findById(req.params.id);
      if (!document) {
        res.status(404).json({ error: "Document not found" });
      } else {
        res.json(document);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get("/filter/:filter", async (req: Request, res: Response) => {
    try {
      const document = await model.find({
        $or: [
          { firstname: { $regex: req.params.filter, $options: "i" } },
          { lastname: { $regex: req.params.filter, $options: "i" } },
          { title: { $regex: req.params.filter, $options: "i" } },
          { description: { $regex: req.params.filter, $options: "i" } },
          { reference: { $regex: req.params.filter, $options: "i" } },
          { name: { $regex: req.params.filter, $options: "i" } },
        ],
      });
      if (!document) {
        res.status(404).json({ error: "Document not found" });
      } else {
        res.json(document);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // POST / - Create a new document
  router.post("/", async (req: Request, res: Response) => {
    const documentData = req.body;
    if (!documentData) {
      res.status(400).json({ error: "Bad request" });
      return;
    }

    try {
      const document = await model.create(documentData);
      res.status(201).json(document);
    } catch (error: any) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // PUT /:id - Replace a document
  router.put("/:id", async (req: Request, res: Response) => {
    const documentData = req.body;
    try {
      const document = await model.findByIdAndUpdate(
        req.params.id,
        documentData,
        { new: true },
      );
      if (!document) {
        res.status(404).json({ error: "Document not found" });
      } else {
        res.json(document);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // PATCH /:id - Update a document
  router.patch("/:id", async (req: Request, res: Response) => {
    const documentData = req.body;
    try {
      const document = await model.findByIdAndUpdate(
        req.params.id,
        documentData,
        { new: true },
      );
      if (!document) {
        res.status(404).json({ error: "Document not found" });
      } else {
        res.json(document);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // DELETE /:id - Delete a document
  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const document = await model.findByIdAndDelete(req.params.id);
      if (!document) {
        res.status(404).json({ error: "Document not found" });
      } else {
        res.sendStatus(204);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
}

export { Core, createCrudRouter };

