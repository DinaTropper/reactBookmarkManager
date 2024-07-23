import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const AuthorizationContext = createContext();

const AuthorizationContextComponent = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const loadUser = async () => {
            const { data } = await axios.get('/api/account/getcurrentuser');
            setUser(data);
            setIsLoading(false);
        }
        loadUser();
    }, []);
    const obj = {
        user,
        setUser
    }

    if (isLoading) {
        return <h1>Loading....</h1>
    }

    return (
        <AuthorizationContext.Provider value={obj}>
            {children}
        </AuthorizationContext.Provider>
    )

}
const useAuth = () => {
    return useContext(AuthorizationContext);
}

export { AuthorizationContextComponent, useAuth };