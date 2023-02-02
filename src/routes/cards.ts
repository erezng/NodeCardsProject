import { Router } from "express";
import { Card } from "../db/models/card.js";
import { cardsSchema } from "../validators/cards.js";
import _ from "underscore";

const router = Router();

//add cards to db:
router.post("/", (req, res) => {
  const body = _.pick(
    req.body,
    "name",
    "description",
    "address",
    "bizNumber",
    "image",
    "phone"
  );
  // const body = {
  //   name: req.body.name,
  //   description: req.body.description,
  //   address: req.body.address,
  //   bizNumber: req.body.bizNumber,
  //   image: req.body.image,
  //   phone: req.body.phone,
  // };
  //[{message:"", path:""}]=>[message:""]
  const validationResult = cardsSchema.validate(body);

  const err = validationResult.error;
  if (err) {
    //bad request = 400 => validation errors
    return res.status(400).json(err.details.map((o) => o.message));
  }

  const card = new Card(body);

  card
    .save()
    .then((saved) => {
      res.json({
        message: "Successfully saved your card",
        id: saved._id,
        card: saved,
      });
    })
    .catch((e) => {
      res.status(500).json({ message: `Error: ${e}` });
    });
});

export { router as cardsRouter };
