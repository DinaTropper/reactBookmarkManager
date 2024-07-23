import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import MyBookmarks from './Pages/MyBookmarks.jsx';
import AddBookmark from './Pages/AddBookmark.jsx';
import Logout from './components/Logout.jsx';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import { AuthorizationContextComponent } from './AuthorizationContext';
import PrivateRoute from './components/PrivateRoute';
const App = () => {
    return (
        <AuthorizationContextComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/mybookmarks' element=
                        {<PrivateRoute><MyBookmarks /></PrivateRoute>} />
                    <Route path='/addbookmark' element=
                        {<PrivateRoute><AddBookmark /></PrivateRoute>} />
                    <Route path='/logout' element={<Logout />} />
                </Routes>
            </Layout>
        </AuthorizationContextComponent>
    );
}

export default App;