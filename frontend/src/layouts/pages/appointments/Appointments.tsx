import {useEffect, useState} from "react";
import MakeAppointment from "./components/MakeAppointment";
import ScheduledVisits from "./components/ScheduledVisits";
import HistoryVisits from "./components/HistoryVisits";
import userService from "../../../services/user.service";
import Verification from "../../utils/Verification";

export const Appointments = () => {
    const [tabBookClick, setTabBookClick] = useState(true);
    const [tabScheduleClick, setTabScheduleClick] = useState(false);
    const [tabHistoryClick, setTabHistoryClick] = useState(false);

    const [verified, setVerified] = useState(true);

    useEffect(() => {
        userService.getUserData()
            .then((res) => {
                setVerified(res.data.verified);
            })
    }, []);

    function bookClick() {
        setTabBookClick(true);
        setTabHistoryClick(false);
        setTabScheduleClick(false);
    }

    function scheduleClick() {
        setTabBookClick(false);
        setTabHistoryClick(false);
        setTabScheduleClick(true);
    }

    function historyClick() {
        setTabBookClick(false);
        setTabHistoryClick(true);
        setTabScheduleClick(false);
    }

    return (
        <div className="container flex-grow-1">
            {verified ?
                <div className="mt-3 mb-2">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button onClick={() => bookClick()} className="nav-link active main-tab-link"
                                id="make-appointment-tab" data-bs-toggle='tab' data-bs-target="#make-appointment"
                                type="button" role="tab" aria-controls="make-appointment" aria-selected="true">
                                Book
                            </button>
                            <button onClick={() => scheduleClick()} className="nav-link main-tab-link"
                                id="scheduled-visits-tab" data-bs-toggle='tab' data-bs-target="#scheduled-visits"
                                type="button" role="tab" aria-controls="scheduled-visits" aria-selected="false">
                                Scheduled
                            </button>
                            <button onClick={() => historyClick()} className="nav-link main-tab-link"
                                id="history-visits-tab" data-bs-toggle='tab' data-bs-target="#history-visits"
                                type="button" role="tab" aria-controls="history-visits" aria-selected="false">
                                History
                            </button>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="make-appointment" role="tabpanel"
                            aria-labelledby="make-appointment-tab">
                            {tabBookClick ? <MakeAppointment /> : <></>}
                        </div>
                        <div className="tab-pane fade show" id="scheduled-visits" role="tabpanel"
                            aria-labelledby="scheduled-visits-tab">
                            {tabScheduleClick ? <ScheduledVisits /> : <></>}
                        </div>
                        <div className="tab-pane fade" id="history-visits" role="tabpanel"
                            aria-labelledby="history-visits-tab">
                            {tabHistoryClick ? <HistoryVisits /> : <></>}
                        </div>
                    </div>
                </div>
                :
                <div className="m-5">
                    <Verification />
                </div>
            }

        </div>
    );
};

export default Appointments;