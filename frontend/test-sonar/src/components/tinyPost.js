import React from 'react';

export default function TinyPost({ post }) {
    const getToken = () => {
        const tokenData = JSON.parse(sessionStorage.getItem('token'));
        return tokenData?.access
      };
    const token = getToken()

    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:8000/test/api/logs/', {
                method: 'POST',
                body: JSON.stringify({
                    interaction_type: 1,
                    post: post.id,
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
        <div className='row justify-content-center align-items-center mb-3'>
            <div className='card bg-dark col-6'>
                <img className='card-img-top' style={{ 'height': '300px' }} src='https://picsum.photos/400/500' />
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <a onClick={handleClick} className="btn btn-primary">Like</a>
                    <a className="btn btn-secondary ms-2">See Full Post</a>
                </div>
            </div>
        </div>
    );
}