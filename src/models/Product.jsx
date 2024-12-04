import { imageMap } from "./Image";

export class Product {
  id;
  name;
  price;
  image;
  description;
  slug;

  constructor(
    id,
    name,
    price,
    image,
    description,
    slug
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = imageMap.get(image);
    this.description = description;
    this.slug = slug;
  }
}
