import React, { useState } from 'react';
import { postActor } from '../../api.tsx';
import "../../assets/css/Form.css";

function ActorForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');

    // handles firstName input change
    function handleFirstNameChange(event:React.ChangeEvent<HTMLInputElement>) {
        setFirstName(event.target.value);
    }

    // handles lastName input change
    function handleLastNameChange(event:React.ChangeEvent<HTMLInputElement>) {
        setLastName(event.target.value);
    }

    //form submission
    function handleSubmit(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // stop page refresh after sumbit

        const actor = {
            firstName: firstName,
            lastName: lastName
        };

        postActor(actor)
            .then(() => {
                setMessage('Actor added successfully!');
                setFirstName(''); // clear fields
                setLastName('');
            })
            .catch(() => {
                setMessage('An error occurred while adding the actor.');
            });
    }

    return (
        <div className="form-container">
            <div className="form">
                <h2>Add a New Actor</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input
                            id="firstname"
                            type="text"
                            value={firstName} // user input value
                            onChange={handleFirstNameChange}
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            id="lastname"
                            type="text"
                            value={lastName} // user input value
                            onChange={handleLastNameChange}
                        />
                    </div>
                    <button id="submit-actor" type="submit">Add Actor</button>
                </form>
                <div className="message">
                    {message ? <p id="success-message">{message}</p> : null}
                </div>
            </div>
        </div>
    );
}

export default ActorForm;