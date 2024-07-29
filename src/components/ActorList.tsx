import { useEffect, useState } from 'react';
import { Actor } from '../types';
import { getAllActors } from '../api';
import {Link} from "react-router-dom";
import "../assets/css/ActorList.css"

function ActorList() {
    const [actors, setActors] = useState<Actor[]>([]);

    // sets tp true to show data is loading
    const [loading, setLoading] = useState(true);

    // displays an error message if there’s an issue with the fetch operation.
    const [error, setError] = useState<Error | null>(null);


    // setActors updates the value of actor list when new data is fetched
    useEffect(() => {
        getAllActors()
            .then(setActors)
            .catch(setError)
            .finally(() =>
                setLoading(false));// set to false when data is loaded or error happened
    }, []);

    // if loading is true show loading message
    if (loading){
        return <p>Loading...</p>;
    }

    if (error){
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="actor-list">
            <h2>Actors</h2>
            <div className="card-container">

                {actors.map(actor => (

                    <div className="card" key={actor.id}>

                        <Link to={`/actors/${actor.id}`}>
                            <div className="card-content">
                                <h3>{actor.firstName} {actor.lastName}</h3>
                            </div>
                        </Link>

                    </div>

                ))}
            </div>
        </div>
    );
}

export default ActorList;