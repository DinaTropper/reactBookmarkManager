import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthorizationContext.jsx';

const Login = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isValidLogin, setIsValidLogin] = useState(true);
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const onTextChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
        console.log(formData)
    }
    const onSubmitClick = async () => {
        const { data } = await axios.post('/api/account/login', formData);
        const isValid = Boolean(data);
        console.log(isValid);
        setIsValidLogin(isValid);
        if (isValid) {
            setUser(data);
            navigate('/mybookmarks');
        }
        console.log(data);
    }
    return (
        <div className="row" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                <h3>Log in to your account</h3>
                {!isValidLogin && <span className='text-danger'>Invalid username/password. Please try again.</span>}
                    <input onChange={onTextChange} value={formData.email} type="text" name="email" placeholder="Email" />
                    <br />
                    <input onChange={onTextChange} value={formData.password} type="password" name="password" placeholder="Password" />
                    <br />
                    <button onClick={onSubmitClick} className="btn btn-primary">Login</button>             
                <Link to="/signup">Sign up for a new account</Link>
            </div>
        </div>
    );
}
export default Login;