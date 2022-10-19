import { useState } from "react";

// register component
export default function Register() {
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        await registerUser({
            username,
            password
        });
        window.location.replace("http://localhost:3000/login")

    }

    async function registerUser(credentials) {
        return fetch('http://localhost:8000/test/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(response =>{
                if(!response.ok){
                    throw new Error("invalid credentials")
                } else {
                    return response.json()
                }
            }).catch((e)=>{
                console.error(e)
                alert(e)
            })
    }

    return (
        <div className="row h-100 text-white justify-content-center align-items-center">
            <form className="col-6">
                <h2>Register</h2>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" className="form-control" id="username" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="password" className="form-control" id="confirmPassword" />
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                <a href="/login" className="mx-3 btn btn-primary">Login</a>
            </form>
        </div>
    );
}   