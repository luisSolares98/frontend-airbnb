import { Categorie } from "./categorie";

export interface Property {
    id: string;
    title: string;
    description: string;
    categories: Categorie[];
}