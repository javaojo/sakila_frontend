export interface Film {
    id: number;
    title: string;
    releaseYear: number;
    description?: string;
    actors?: Actor[];
    language?: { id: number; name: string };
    originalLanguage?: null | string;
    rentalDuration?: number;
    rentalRate?: number;
    length?: number;
    replacementCost?: number;
    rating?: string;
    lastUpdate?: string;
}

export interface Actor {
    id: number;
    firstName: string;
    lastName: string;
    films: Film[];
}