import { Actor, Film } from './types';


const API_URL = 'http://localhost:8080';



function getAllFilms(): Promise<Film[]> {

    return fetch(`${API_URL}/films`).

    then(res => {

        if (!res.ok) {
            throw new Error('Network response was not ok');
        } else {
            return res.json();
        }
    }).then(function(data) {
        return data as Film[];
    });

}

function getAllActors(): Promise<Actor[]> {

    return fetch(`${API_URL}/actors`).

    then(res => {

        if (!res.ok) {
            throw new Error('Network response was not ok');
        } else {
            return res.json();
        }
    }).then(function(data) {
        return data as Actor[];
    });

}

function getActor(actorId: number): Promise<Actor> {
    return fetch(`${API_URL}/actors/${actorId}`).

    then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        } else {
            return res.json();
        }
    }).then(function(data) {
        return data as Actor;
    });
}

function getFilm(filmId: number): Promise<Film> {
    return fetch(`${API_URL}/films/${filmId}`).

    then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        } else {
            return res.json();
        }
    }).then(function(data) {
        return data as Film;
    });
}



async function postActor(actor: { firstName: string; lastName: string }) {
    const response = await fetch(`${API_URL}/actors`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(actor)
    });
    if (!response.ok) {
        throw new Error('Failed to add actor');
    }
    return await response.json();
}

export { getAllActors,getActor,getAllFilms, getFilm, postActor };

