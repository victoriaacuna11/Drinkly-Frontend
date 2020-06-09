export class drink {
  _id: String;
  available: boolean;
  name: String;
  description: String;
  recipe: String;
  ingredients: String[];
  owner: {
    name: String;
    category: String;
  };
  pictures: String;
  views: Number;
}
