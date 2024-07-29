import { useEffect, useState } from 'react';
import { Film } from '../types';
import { getAllFilms } from '../api';
import {Link} from "react-router-dom";

function ActorList() {

    const [films, setFilms] = useState<Film[]>([]);


    const [loading, setLoading] = useState(true);


    const [error, setError] = useState<Error | null>(null);



    useEffect(() => {
        getAllFilms()
            .then(setFilms)
            .catch(setError)
            .finally(() =>
                setLoading(false));
    }, []);


    if (loading){
        return <p>Loading...</p>;
    }

    if (error){
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h2>Films</h2>
            <ul>
                {films.map(films => (

                    <li key={films.id}>
                        <Link to={`/films/${films.id}`}>{films.title}</Link>
                    </li>

                ))}
            </ul>
        </div>
    );
}

export default ActorList;