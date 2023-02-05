import { Router } from "express";
import _ from "underscore";
import { User } from "../db/models/user.js";
import { userAlreadyExists } from "../middleware/userAlreadyExists.js";
import { validateSignUp } from "../middleware/verifySignupBody.js";

const router = Router();

//api/auth/signup
router.post("/signup", validateSignUp, userAlreadyExists, async (req, res) => {
  const body = _.pick(req.body, "username", "email", "password");

  try {
    //find ({email})

    //TODO: email and username already exsists

    const user = await new User(body).save();
    return res.json({ message: "user saved", id: user._id });
  } catch (e) {
    return res.status(500).json({ message: "Server DB Error", error: e });
  }
});

export { router as authRouter };
