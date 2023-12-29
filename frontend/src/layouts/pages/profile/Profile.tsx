import { useState } from "react";
import ManageAccount from "./components/ManageAccount";
import ManageCard from "./components/ManageCard";
import Verification from "../../utils/Verification";

export const Profile = () => {
    const [tabClick, setTabClick] = useState(false);

    return (
        <div className="container">
            <div className="mt-3 mb-2">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button onClick={() => setTabClick(false)} className="nav-link active main-tab-link"
                            id="nav-profile-tab" data-bs-toggle='tab' data-bs-target="#nav-profile"
                            type="button" role="tab" aria-controls="nav-profile" aria-selected="true">
                            Profile
                        </button>
                        <button onClick={() => setTabClick(true)} className="nav-link main-tab-link"
                            id="nav-card-tab" data-bs-toggle='tab' data-bs-target="#nav-card"
                            type="button" role="tab" aria-controls="nav-card" aria-selected="false">
                            Medical Card
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-profile" role="tabpanel"
                        aria-labelledby="nav-profile-tab">
                        {!tabClick ? <ManageAccount /> : <></>}
                    </div>
                    <div className="tab-pane fade" id="nav-card" role="tabpanel"
                        aria-labelledby="nav-card-tab">
                        {tabClick ? <ManageCard /> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;