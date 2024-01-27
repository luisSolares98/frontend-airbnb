import { Categorie } from "./categorie";

export interface Property {
    id: string;
    name: string;
    description: string;
    amount: number;
    state: string;
    userId: string;
    characteristics: Categorie[];
}