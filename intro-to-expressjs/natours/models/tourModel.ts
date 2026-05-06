import mongoose from "mongoose";
import slugify from "slugify";

interface ITour {
  name: string;
  duration: number;
  slug: string;
}

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A name must be specified"],
      unique: true,
      trim: true,
      minlength: [10, "Name should not be lower than 10 characters"],
      maxlength: [40, "Name should not be lower than 40 characters"],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, " Tour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either: easy, medium, difficult",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour my have a description"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      trim: true,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual("durationWeeks").get(function (this: ITour) {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create() but doesn't work for .insertMany()
// tourSchema.pre("save", function (this: ITour, next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

// tourSchema.post("save", (doc, next) => {
//   console.log(doc);
//   next();
// });

// // QUERY MIDDLEWARE
// tourSchema.pre(/^find/, function (next) {
//   console.log("Searching for Documents");
//   next();
// });
// tourSchema.post(/^find/, function (docs, next) {
//   console.log("Found Documents", docs);
//   next();
// });

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
