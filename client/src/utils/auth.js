import { jwtDecode } from 'jwt-decode';
class AuthService {
    getProfile() {
        // TODO: return the decoded token
        const token = this.getToken();
        return token ? jwtDecode(token) : null;
    }
    loggedIn() {
        // TODO: return a value that indicates if the user is logged in
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }
    isTokenExpired(token) {
        // TODO: return a value that indicates if the token is expired
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp) {
                return decoded.exp * 1000 < Date.now();
            }
            return true;
        }
        catch {
            return true;
        }
    }
    getToken() {
        // TODO: return the token
        return localStorage.getItem('id_token') || '';
    }
    login(idToken) {
        // TODO: set the token to localStorage
        // TODO: redirect to the home page
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }
    logout() {
        // TODO: remove the token from localStorage
        // TODO: redirect to the login page
        localStorage.removeItem('id_token');
        window.location.assign('/login');
    }
}
export default new AuthService();
