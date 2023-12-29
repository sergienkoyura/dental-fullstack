import { Link, NavLink, useHistory } from "react-router-dom";
import img from "../../assets/images/logo192.png";
import authService from "../../services/auth.service";
export const Header = () => {
    const history = useHistory();

    function logoutAction() {
        authService.logout().then(() => {
            history.push("/home");
            window.location.reload();
        })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark py-3 main-bg-aqua">
            <div className="container-fluid">
                <span className='navbar-brand'>
                    <Link className='nav-link' to={'/home'}>
                        <img src={img} width={48} height={48} alt="logo" />
                    </Link>
                </span>
                <button className='navbar-toggler' type='button'
                    data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
                    aria-controls='navbarNavDropdown' aria-expanded='false'
                    aria-label='Toggle Navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to={'/about-us'}>About us</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to={'/pricing'}>Pricing</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to={'/doctors'}>Doctors</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to={'/contact'}>Contact</NavLink>
                        </li>
                        {authService.getCurrentUser()?.accessToken &&
                            authService.getCurrentUser()?.role === "ROLE_USER" &&
                            <li className='nav-item'>
                                <NavLink className='nav-link' to={'/appointments'}>Appointments</NavLink>
                            </li>
                        }
                        {authService.getCurrentUser()?.accessToken &&
                            (authService.getCurrentUser()?.role === "ROLE_DOCTOR" ||
                                authService.getCurrentUser()?.role === "ROLE_ADMIN") &&
                            <li className='nav-item'>
                                <NavLink className='nav-link' to={'/hub'}>Hub</NavLink>
                            </li>
                        }
                        {authService.getCurrentUser()?.accessToken && authService.getCurrentUser()?.role === "ROLE_ADMIN" &&
                            <li className='nav-item'>
                                <NavLink className='nav-link' to={'/admin'}>Admin</NavLink>
                            </li>
                        }
                    </ul>
                    <ul className='navbar-nav ms-auto'>
                        {authService.getCurrentUser()?.accessToken ?
                            <li className='nav-item m-1'>
                                <Link className='btn main-button-outline-white' type="button" to={'/profile'}>Profile</Link>
                            </li>
                            :
                            <li className='nav-item m-1'>
                                <Link className='btn main-button-outline-white' type="button" to={'/register'}>Make an appointment!</Link>
                            </li>
                        }
                        {authService.getCurrentUser()?.accessToken ?
                            <li className='nav-item m-1'>
                                <button onClick={() => logoutAction()} className='btn main-button-outline-white' type="button">Logout</button>
                            </li>
                            :
                            <li className='nav-item m-1'>
                                <Link className='btn main-button-outline-white' type="button" to={'/login'}>Sign in</Link>
                            </li>
                        }

                    </ul>
                </div>
            </div>
        </nav>
    );
}