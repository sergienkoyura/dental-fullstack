import { Link } from "react-router-dom";
import authService from "../../../../services/auth.service";

export const Carousel = () => {
    return (
        <div className="carousel-content">
            <div className="container mt-5 mb-5">
                <div className="main-text-dark text-center ">
                    <h3 className=" fw-semibold">Delighting patients with exceptional dental care!</h3>
                </div>
                <div id="carouselControls" className="carousel carousel-dark slide mt-5 d-none d-lg-block" data-bs-interval="false">
                    {/* Desktop */}
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <div className="text-center">
                                        <img className="img-card" src={require('./../../../../assets/images/patients/p1.jpg')} width={300} height={200} alt="patient" />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <div className="text-center">
                                        <img className="img-card" src={require('./../../../../assets/images/patients/p2.jpeg')} width={300} height={200} alt="patient" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <div className="text-center">
                                        <img className="img-card" src={require('./../../../../assets/images/patients/p3.jpg')} width={300} height={200} alt="patient" />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <div className="text-center">
                                        <img className="img-card" src={require('./../../../../assets/images/patients/p4.jpeg')} width={300} height={200} alt="patient" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <div className="text-center">
                                        <img className="img-card" src={require('./../../../../assets/images/patients/p5.jpg')} width={300} height={200} alt="patient" />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <div className="text-center">
                                        <img className="img-card" src={require('./../../../../assets/images/patients/p6.jpg')} width={300} height={200} alt="patient" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button"
                        data-bs-target="#carouselControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button"
                        data-bs-target="#carouselControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                {/* Mobile */}
                <div className="d-lg-none mt-3">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-12 mb-3">
                            <div className="text-center">
                                <img className="img-card" src={require('./../../../../assets/images/patients/p1.jpg')} width={300} height={200} alt="patient" />
                            </div>
                        </div>
                        <div className="col-12 mb-3">
                            <div className="text-center">
                                <img className="img-card" src={require('./../../../../assets/images/patients/p2.jpeg')} width={300} height={200} alt="patient" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3 d-flex justify-content-center">
                    <Link className="btn main-button-outline-dark btn-lg" to={authService.getCurrentUser()?.accessToken ? '/appointments' : '/register'}>Book an appointment!</Link>
                </div>
            </div>
        </div>
    );
}