import { ExternalUrl, Followers, Image } from "./common/common.interface";

export  interface Artist {
    external_urls: ExternalUrl;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

  
//   function matchesModel(data: any, model: any): boolean {
//     return Object.keys(model).every(key =>
//       typeof model[key] === 'object' ? matchesModel(data[key], model[key]) : typeof data[key] === typeof model[key]
//     );
//   }
  
//   // Uso:
//   const data = { /* tus datos aquí */ };
//   console.log(matchesModel(data, artistModel)); // Devuelve true si data cumple con el modelo, false en caso contrario