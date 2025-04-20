import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../utils/auth';
const Navbar = () => {
    const [isloggedIn, setIsLoggedin] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setIsLoggedin(auth.loggedIn());
    }, []); // only when loading
    const handleLogout = () => {
        auth.logout(); //Delete token
        setIsLoggedin(false); //Updating view
        navigate('/login'); // Redirects to login
    };
    return (_jsxs("div", { className: 'nav', children: [_jsx("div", { className: 'nav-title', children: _jsx(Link, { to: '/', children: "Krazy Kanban Board" }) }), _jsx("ul", { children: !isloggedIn ? (_jsx("li", { className: 'nav-item', children: _jsx(Link, { to: '/login', children: _jsx("button", { type: 'button', children: "Login" }) }) })) : (_jsx("li", { className: 'nav-item', children: _jsx("button", { type: 'button', onClick: handleLogout, children: "Logout" }) })) })] }));
};
export default Navbar;
