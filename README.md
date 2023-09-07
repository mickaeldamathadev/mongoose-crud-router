## Description

For example, you have A USer model like:

```
interface IUser extends Document {
  lastname: string;
  firstname: string;
  email: string;
  created_at: Date;
}

const userSchema = new Schema<IUser>({
  lastname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value: string) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value); // Switzerland phone number validation
      },
      message: "Invalid Email Address",
    },
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

```


You have to create a model using Core embedded schema in this package and create a CRUD express router using it:


´´´
import { createCrudRouter, Core } from "mongoose-crud-router";

const User = Core.discriminator("User", userSchema);

const userRouter = createCrudRouter<IUser>({ model: User });

export default userRouter;

´´´


## Add routes to your router

You can add extra routes or middleware to your router:


´´´

import userRouter from "./User"

// Extra route example
userRouter.get("/hello", (req, res) => {
  res.send("Hello World");
});

// Extra middleware example
userRouter.use((req, res,next) => {
  console.log(req.headers)
  next()
});


´´´


You can add them directly in your User.ts file before export router.
