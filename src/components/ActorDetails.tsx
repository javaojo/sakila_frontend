
import {Actor} from '../types';
import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import {getActor} from "../api.tsx";


function ActorDetails() {


    const { id } = useParams();
    const [actor, setActor] = useState<Actor | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (id) {
            getActor(Number(id))
                .then(data => {
                    setActor(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading){
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }
    if (!actor){
        return <p>Actor not found</p>;
    }


    return (
        <div>
            <GetActorInfo actor={actor}/>
            <GetFilmList films={actor.films}/>
        </div>
    );
}

export default ActorDetails;


function GetActorInfo(props: {actor: Actor}) {

    const actor=props.actor;

    return (
        <div>
            <h2>{actor.firstName} {actor.lastName}</h2>
        </div>
    );
}
// pass in prop, expecting attribute films from
function GetFilmList(props: {films: Actor['films']}) {

    const films=props.films;

    if (!films || films.length === 0) {
        return <p>No films available</p>;
    }


    return (
        <ul>
            {films.map(film => (

                <li key={film.id}>

                    <Link to={`/films/${film.id}`}>
                        {film.title}
                    </Link>

                </li>

            ))}
        </ul>
    );
}