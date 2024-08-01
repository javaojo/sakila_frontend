import { useEffect, useState } from 'react';
import { Film } from '../../types.tsx';
import { getAllFilms } from '../../api.tsx';
import {Link} from "react-router-dom";
import "../../assets/css/FilmList.css";

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
        <div className="film-list-container">
            <h2>Films</h2>
            <div className="film-grid">

                {films.map(film => (

                    <Link to={`/films/${film.id}`} key={film.id} className="film-card-link">

                        <div className="film-card">

                            <img src="https://via.placeholder.com/150" alt={film.title} className="film-image"/>

                            <div className="container">
                                <h4 className="film-title"><b>{film.title}</b></h4>
                                <p className="film-description">{film.description || 'No description available'}</p>
                            </div>

                        </div>

                    </Link>

                ))}
            </div>
        </div>
    );
}

export default ActorList;