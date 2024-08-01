import { useEffect, useState } from 'react';
import { Actor } from '../../types.tsx';
import { getAllActors } from '../../api.tsx';
import {Link} from "react-router-dom";
import "../../assets/css/ActorList.css"

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
        <div className="actor-list-container">
            <h2>Actors</h2>
            <div className="film-grid">
                {actors.map(actor => (
                    <Link to={`/actors/${actor.id}`} key={actor.id} className="actor-card-link">
                        <div className="actor-card">
                            <img src="https://via.placeholder.com/150"  className="actor-image"/>
                            <div className="container">
                                <h4 className="actor-title"><b>{actor.firstName} {actor.lastName}</b></h4>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ActorList;