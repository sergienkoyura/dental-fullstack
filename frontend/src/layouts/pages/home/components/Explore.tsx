import {Link} from "react-router-dom";

export const Explore = () => {
    return (
        <div className="explore-content">
            <div className="mt-5 bg-fixed px-3">
                <div className="pt-3">
                    <div className="card rounded-4 m-md-5 m-sm-0 col-md-6 col-sm-12 main-text-dark d-flex align-items-center">
                        <div className="p-4">
                            <h3 className="fw-semibold">What sets your dental clinic apart from others?</h3>
                            <p>Our dental clinic stands out due to our commitment to personalized care. We prioritize patient comfort and utilize cutting-edge technology to deliver precise and efficient treatments. Our team's expertise, combined with a welcoming environment, ensures a stress-free and enjoyable dental experience.</p>
                        </div>
                    </div>
                </div>
                <div className="pt-3 d-flex justify-content-end">
                    <div className="card rounded-4 m-md-5 m-sm-0 col-md-6 col-sm-12 main-text-dark d-flex align-items-center">
                        <div className="p-4">
                            <h3 className="fw-semibold">How do you ensure patient satisfaction and comfort during treatments?</h3>
                            <p>At our clinic, patient satisfaction is our top priority. We prioritize open communication, actively listen to our patients' concerns, and tailor treatment plans to meet individual needs. Our staff is trained to create a comfortable atmosphere, and we offer amenities aimed at easing anxiety and promoting relaxation throughout the visit.</p>
                        </div>
                    </div>
                </div>
                <div className="pt-3">
                    <div className="card rounded-4 m-md-5 m-sm-0 col-md-6 col-sm-12 main-text-dark d-flex align-items-center">
                        <div className="p-4">
                            <h3 className="fw-semibold">What advantages do patients gain by choosing your clinic?</h3>
                            <p>By choosing our clinic, patients benefit from a comprehensive range of services, including preventive care, cosmetic treatments, and specialized procedures. We focus on education, empowering patients with knowledge to maintain optimal oral health. Additionally, our commitment to using the latest techniques and materials ensures quality care and lasting results for our patients.</p>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center p-5">
                    <Link className="btn main-button-dark btn-lg" to={'/pricing'}>Check the prices</Link>
                </div>
            </div>
        </div>
    );
}