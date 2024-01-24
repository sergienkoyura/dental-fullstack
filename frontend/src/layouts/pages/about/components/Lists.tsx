import {Link} from "react-router-dom";
import authService from "../../../../services/auth.service";

export const Lists = () => {
    return (
        <div className="lists-content">
            <div className="img-bg-about">
            </div>
            <div className="mt-3">
                <div className="row m-0">
                    <div className="col-12 main-text-dark">
                        <div className="px-5">
                            <h3 className="fw-semibold text-center py-2">Why Choose SmileWorks?</h3>
                            <ul className="fs-6">
                                <li className="mt-1"><b>Expertise and Experience:</b> Our team consists of highly skilled dental professionals who are dedicated to staying at the forefront of dental techniques and technologies.</li>
                                <li className="mt-2"><b>Patient-Centered Approach:</b> Your comfort and satisfaction are our top priorities. We listen attentively to your concerns, explain procedures thoroughly, and work with you to create personalized treatment plans that align with your goals.</li>
                                <li className="mt-2"><b>State-of-the-Art Facilities:</b> We invest in the latest dental equipment and technologies to ensure precise diagnostics, efficient treatments, and outstanding results.</li>
                                <li className="mt-2"><b>Comprehensive Services:</b> From routine check-ups and cleanings to advanced cosmetic and restorative procedures, we offer a wide range of services designed to address various dental needs.</li>
                                <li className="mt-2"><b>Friendly and Caring Atmosphere:</b> We understand that visiting the dentist can be daunting for some. That's why we've created a warm, friendly atmosphere where you can feel relaxed and at ease throughout your visit.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-2 mb-5 d-flex justify-content-center">
                    <Link className="btn main-button-outline-dark btn-lg" to={authService.getCurrentUser()?.accessToken ? '/appointments' : '/register'}>Book an appointment!</Link>
                </div>
            </div>
        </div>
    );
}