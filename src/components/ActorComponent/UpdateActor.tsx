import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Actor } from '../../types.tsx';
import { getActor, updateActor } from '../../api.tsx';
import '../../assets/css/Form.css'; // Use the same CSS file

function UpdateActor() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [actor, setActor] = useState<Actor | null>(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (id) {
            getActor(Number(id))
                .then(data => {
                    setActor(data);
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err as Error);
                    setLoading(false);
                });
        }
    }, [id]);

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (id) {
            updateActor(Number(id), { firstName, lastName })
                .then(updatedActor => {
                    setActor(updatedActor);
                    navigate(`/actors/${id}`);
                })
                .catch(err => {
                    setError(err as Error);
                });
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!actor) return <p>Actor not found</p>;

    return (
        <div className="form-container">

            <div className="form">
                <h2>Update Actor</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input
                            id="firstname-form"
                            type="text"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            id="lastname-form"
                            type="text"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Update Actor</button>
                </form>
            </div>

        </div>
    );
}

export default UpdateActor;