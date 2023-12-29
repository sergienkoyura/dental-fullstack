import { Link } from "react-router-dom";

export const Footer = () => {
    return(
        <div className="main-bg-aqua">
            <footer className="container d-flex flex-wrap justify-content-evenly align-items-center py-4">
                <p className="col-md-4 mb-0 main-text-beige">© SmileWorks, Inc</p>
                <ul className="nav navbar-dark col-md-8 justify-content-end">
                    <li className="nav-item">
                        <Link to={'/'} className="nav-link px-2 main-text-beige">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/about-us'} className="nav-link px-2 main-text-beige">
                            About us
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/pricing'} className="nav-link px-2 main-text-beige">
                            Pricing
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/doctors'} className="nav-link px-2 main-text-beige">
                            Doctors
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/contact'} className="nav-link px-2 main-text-beige">
                            Contact
                        </Link>
                    </li>
                </ul>
            </footer>
        </div>
    );
}