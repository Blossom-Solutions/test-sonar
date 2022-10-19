import React from 'react';
import TYPES from './enums';
import { Navigate } from "react-router-dom";

export default function TinyPost({ post }) {
    const getToken = () => {
        const tokenData = JSON.parse(sessionStorage.getItem('token'));
        return tokenData?.access
      };
    const token = getToken()
    const [navigate, setNavigate] = React.useState(false);

    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:8000/test/api/posts/', {
                method: 'PATCH',
                body: JSON.stringify({
                    interaction_type: TYPES.LIKE,
                    id: post.id,
                }),
                headers: {
                    'Authorization': 'Bearer '+ token,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            alert("Liked post")
        } catch (err) {
            alert(err);
        }
    }
    return (
        <div className='row my-2 justify-content-center align-items-center mb-3'>
            <div className='card bg-dark col-8 px-0'>
                <img className='card-img-top ' alt="test" src='https://picsum.photos/700/350' />
                <div className="card-body">
                    <h5 className="text-white card-title">{post.title}</h5>
                    <a onClick={handleClick} className="btn btn-primary">Like</a>
                    <a onClick={()=>setNavigate(true)} className="mx-2 btn btn-primary">See Full Post </a>
                    {navigate && <Navigate to="/post" state={{post, token}} />}
                </div>
            </div>
        </div>
    );
}