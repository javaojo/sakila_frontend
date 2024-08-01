
import {Actor} from '../../types.tsx';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import {deleteActor, getActor} from "../../api.tsx";
import "../../assets/css/ActotDetails.css";


function ActorDetails() {

    const navigate = useNavigate();


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


    async function handleDelete() {
        const confirmed = window.confirm("Are you sure you want to delete this actor?");

        // check if user alive and confirmation made then delete
        if (confirmed && actor) {
            try {
                await deleteActor(actor.id);
                navigate("/actors");
            } catch (err) {
                console.error("Failed to delete actor:", err);
            }
        }
    }

    return (
        <div className="actor-details">

            <GetActorInfo actor={actor} />
            <GetFilmList films={actor.films} />

            <div className="actor-actions">
                <button onClick={handleDelete}>Delete Actor</button>

                <Link to={`/actors/${actor.id}/update`} className="update-link">
                    <button>Update Actor</button>
                </Link>

            </div>
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
        <ul className="film-list">
            {films.map(film => (
                <li key={film.id} className="film-item">
                    <Link to={`/films/${film.id}`}>
                        <strong>{film.title}</strong> ({film.releaseYear})
                    </Link>
                </li>
            ))}
        </ul>
    );
}