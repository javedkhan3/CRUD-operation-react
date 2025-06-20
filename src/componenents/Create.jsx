import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const history = useNavigate();

    const header = { "Access-Control-Allow-Origin": "*" };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("clicked");

        axios
            .post("https://684fcb01e7c42cfd1795fa46.mockapi.io/api/v1/CRUD-2", {
                name: name,
                email: email,
                header,
            })
            .then(() => {
                history("/alldata");
            });
    };

    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center">
            <div
                className="card shadow p-5"
                style={{ width: "100%", maxWidth: "600px" }}
            >
                <div className="d-flex justify-content-between">
                     <h3 className="text-primary ">Create </h3>
                     <Link to="/alldata" 
                     className="btn btn-warning px-2">View Data</Link>
                </div>
               
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your name"
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            required
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary px-4 py-2">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Create;
