export class game {
  /**
   * id del juego.
   */
    _id: String;
  /**
   * Habilitado(True)/Deshabilitado(False)
   */
    available: boolean;
  /**
   * Nombre del juego
   */
    name: String;
  /**
   * Descripción del bar.
   */
    description: String;
    /**
     * Reglas del juego.
     */
    rules: String[];
    /**
     * Foto del juego (No se está usando)
     */
    photo: String;
  }