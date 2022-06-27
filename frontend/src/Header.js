import './Header.css';
import { Link, useNavigate } from "react-router-dom";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'


function Header() {
    const navigate = useNavigate();
    function logOut() {

        delete_cookie('auth_access_token')
        let result = fetch('http://localhost:8080/api/auth/signout', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        })
        navigate("/login")
    }

    return (
        <div className="header">

            <nav className="nav navbar navbar-light navbar-expand-md">
                <div className="containerx-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">VTMC V</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav  pe-3">
                                <li className="nav-item">
                                    <Link to="/" className='text-link'>Pradinis</Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link to="/alltransaction" className='text-link'>Piniginės operacijos</Link>
                                </li> */}
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="user">
                <div className="user__name">
                    <h3>{read_cookie('username')}</h3>
                    <p>Vartotojas</p>
                </div>
                <button onClick={logOut} className="user__icon">
                    &#10006;
                </button>
            </div>
        </div>
    )
}

export default Header;