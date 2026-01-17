/* This file is contains helper functions/classes for endpoints  */

export default class APIFeatures {
  queryString: { [key: string]: any };
  query;

  constructor(queryString: { [key: string]: any }, query: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];

    excludedFields.forEach((el) => delete queryObj[el]);

    // ADVANCED FILTERING FOR <, >, <=, >=

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|lte|lt|gt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      let sortBy = this.queryString.sort as string;
      sortBy = sortBy.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields as string;
      fields = fields.split(",").join(" ");

      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    if (this.queryString.page && this.queryString.limit) {
      const page: number = Number(this.queryString.page as string) || 1;
      const limit: number = Number(this.queryString.limit as string) || 100;
      const skip = (page - 1) * limit;

      this.query = this.query.sort("price").skip(skip).limit(limit);
    }

    return this;
  }
}
