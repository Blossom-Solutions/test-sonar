import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenData = JSON.parse(sessionStorage.getItem('token'));
        return tokenData?.access
      };
    
    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('token', userToken);
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token
    }
  
}