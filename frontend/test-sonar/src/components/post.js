import React from 'react';
import TYPES from './enums';
import { useLocation } from 'react-router-dom';


// post component
// fetches post data from backend
// displays post data
// displays like button
export default function Post() {
  const { state } = useLocation();
  const [post, setPost] = React.useState(state.post);
  const sendActivity = async (type) => {
    try {
        const response = await fetch('http://localhost:8000/test/api/posts/', {
            method: 'PATCH',
            body: JSON.stringify({
                interaction_type: type,
                id: post.id,
            }),
            headers: {
                'Authorization': 'Bearer '+ state.token,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
    } catch (err) {
        alert(err);
    }
  }

  React.useEffect(()=>{
    sendActivity(TYPES.VIEW);
  },[])
    return (
        <div className='row justify-content-center align-items-center mb-3'>
            <div className='card bg-dark col-8 px-0'>
                <img className='card-img-top ' alt="test" src='https://picsum.photos/700/350' />
                <div className="card-body">
                    <h5 className="text-white card-title">{post.title}</h5>
                    <p className="text-white card-text">{post.description}</p>
                    <a onClick={()=>sendActivity(TYPES.LIKE)} className="btn btn-primary">Like</a>
                    <b className="px-3  text-white">{post.likes} Likes</b>
                </div>
            </div>
        </div>
    );
}