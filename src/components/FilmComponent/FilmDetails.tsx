import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFilm } from '../../api.tsx';
import {Film} from "../../types.tsx";
import "../../assets/css/FilmDetail.css";



function FilmDetails(){
    const { id } = useParams(); // Get film ID from the URL
    const [film, setFilm] = useState<Film | null >(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (id) {
            getFilm(Number(id))
                .then(data => {
                    setFilm(data); // Set film data
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!film) return <p>Film not found</p>;

    return (
        <div className="filmactorlist">

            <h2>{film.title || 'N/A'}</h2>
            <GetFilmInfo film={film}/>

            <h3>Actors:</h3>
            <GetActorList actors={film.actors}/>
        </div>
    );
}

export default FilmDetails;


function GetActorList(props: { actors: Film['actors'] }) {
    const actors = props.actors;

    if (!actors || actors.length === 0) {
        return <p>No actors available</p>;
    }

    return (

        <div className="film-details-contianer">
            <ul>
                {actors.map(actor => (

                    <li key={actor.id}>

                        <Link to={`/actors/${actor.id}`}>
                            {actor.firstName} {actor.lastName}
                        </Link>

                    </li>

                ))}
            </ul>
        </div>

    );


}

function GetFilmInfo(props: { film: Film }) {
    const film = props.film;

    return (
        <div>
            <p><strong>Description:</strong> {film.description || 'No description available'}</p>
            <p><strong>Language:</strong> {film.language?.name || 'Unknown'}</p>
            <p><strong>Original Language:</strong> {film.originalLanguage || 'N/A'}</p>
            <p><strong>Rental Duration:</strong> {film.rentalDuration || 'N/A'} days</p>
            <p><strong>Rental Rate:</strong> £{film.rentalRate? film.rentalRate.toFixed(2) : 'N/A'}</p>
            <p><strong>Length:</strong> {film.length ? `${film.length} minutes` : 'N/A'}</p>
            <p><strong>Replacement Cost:</strong> £{film.replacementCost? film.replacementCost.toFixed(2) : 'N/A'}</p>
            <p><strong>Rating:</strong> {film.rating || 'N/A'}</p>
            <p><strong>Last Update:</strong> {film.lastUpdate ? new Date(film.lastUpdate).toLocaleString() : 'N/A'}</p>
        </div>
    );
}