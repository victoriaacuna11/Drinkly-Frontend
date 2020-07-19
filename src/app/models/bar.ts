import { item } from './itemMenu';

export class Bar {
  /**
   * Nombre del bar.
   */
  name: string;
  /**
   * Imagen principal del bar.
   */
  main_image: String;
  /**
   * Dirección del bar.
   */
  address: string;
  /**
   * Zona donde se encuentra el bar (Foreign key).
   */
  zone: string;
  /**
   * Horario de trabajo.
   */
  working_hours: string;
  /**
   * Fotos del bar.
   */
  pictures: String[];
  /**
   * Puntaje del bar.
   */
  rating: number;
  /**
   * Teléfonos del bar.
   */
  phone: String[];
  /**
   * Descripción del bar.
   */
  description: string;
  /**
   * Link del instagram (opcional)
   */
  instagram: String;
  /**
   * Link del facebook (opcional)
   */
  facebook: String;
  /**
   * Link del twitter (opcional)
   */
  twitter: String;
  /**
   * Correo electrónico.
   */
  email: String;
  /**
   * @ignore
   */
  views: number;
  /**
   * Es o no socio (paga por estar en un buen lugar en la página).
   */
  associate: boolean;
  /**
   * Habilitado(True)/Deshabilitado(False)
   */
  available: boolean;
  /**
   * Costo promedio de lo que una persona gasta al ir al bar.
   */
  cost: number;
  /**
   * Tragos más relevantes del menú del bar.
   */
  menu: item[];
  /**
   * id del bar.
   */
  _id: String;
}