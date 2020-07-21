export class drink {
  /**
   * id del drink
   */
  _id: String;
  /**
   * bolleano que indica si esta habilitado
   */
  available: boolean;
  /**
   * nombre del drink
   */
  name: String;
  /**
   * descripccion del drink
   */
  description: String;
  /**
   * receta del drink
   */
  recipe: String;
  /**
   * lista de los ids de los ingredientes del drink
   */
  ingredients: String[];
  /**
   * creador de la bebida
   */
  owner: {
    /**
   * nomrbe del creador
   */
  name: String;
    /**
   * categoria del creador
   */
  category: String;
  };
  /**
   * foto del drink
   */
  pictures: String;
  /**
   * views de la pagina de recetas
   */
  views: Number;
}
