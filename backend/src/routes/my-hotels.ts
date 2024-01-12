import express, { Request, Response } from "express";
import multer, { memoryStorage } from "multer";
import cloudinary from "cloudinary";
import { HotelType } from "../shared/types";
import Hotel from "../modals/hotel";
import { body } from "express-validator";
import { verifyToken } from "../middleware/auth";

const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 5 * 1024 * 1024, // 5Mb
  },
});
// api/my-hotels

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("starRating").notEmpty().isNumeric().withMessage("This is Required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per Night is required"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("This is a required field"),
  ],

  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      // console.log(newHotel);

      let dataUri = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });

      const imageUrls = await Promise.all(dataUri);
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      const hotel = new Hotel(newHotel);
      await hotel.save();
      res.status(201).send(hotel);
    } catch (e) {
      console.log("error in creating in hotel : ", e);
      res.status(500).send({ message: " Something went wrong!" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });

    res.json(hotels);
  } catch (e) {
    res.status(500).send({ messsage: "some thing went wrong" });
  }
});

export default router;
