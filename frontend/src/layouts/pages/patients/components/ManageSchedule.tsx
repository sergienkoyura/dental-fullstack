import { useEffect, useState } from "react";
import publicService from "../../../../services/public.service";
import PricingDTO from "../../../../models/PricingDTO";
import { SpinnerLoading } from "../../../utils/SpinnerLoading";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import TimeEnum from "../../../../models/TimeEnum";
import TokenService from "../../../../services/token.service";
import doctorService from "../../../../services/doctor.service";
import AppointmentDTO from "../../../../models/AppointmentDTO";
import adminService from "../../../../services/admin.service";


export const ManageSchedule: React.FC<{}> = (props) => {

    const [appointments, setAppointments] = useState<AppointmentDTO[]>();

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [state, setState] = useState(false);

    const isDoctor = TokenService.getUser()?.role === "ROLE_DOCTOR";

    const [date, setDate] = useState<Dayjs | null>(dayjs(Date.now()));

    useEffect(() => {
        setIsLoading(true);
        if (isDoctor){
            doctorService.getAppointmentsByDate(date?.format("YYYY-MM-DD"))
            .then((res) => {
                setAppointments(res.data);
                window.scrollTo(0, 0);
            })
            .catch((err) => setHttpError(err.message))
            .finally(() => setIsLoading(false))
        } else {
            adminService.getAppointmentsByDate(date?.format("YYYY-MM-DD"))
            .then((res) => {
                setAppointments(res.data);
                window.scrollTo(0, 0);
            })
            .catch((err) => setHttpError(err.message))
            .finally(() => setIsLoading(false))
        }
        
    }, [date, state]);

    if (httpError) {
        return (
            <div className="text-danger container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    function handleComplete(item: AppointmentDTO) {
        doctorService.completeAppointment(item)
            .then(() => {
                setState(!state);
            })
            .catch((err) => {
                setHttpError(err.message)
            })
    }

    return (
        <div className="container main-text-dark my-4">
            <div>
                <h2 className="text-center">{isDoctor ? "Your Schedule" : "Schedule"}</h2>
            </div>
            <div className="row container-xl">
                <div className="col-md-6 col-sm-12 d-flex flex-column align-items-center">
                    <h3>Pick a date</h3>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar value={date || null} onChange={(newValue) => setDate(newValue)}
                            disablePast={true} shouldDisableDate={(date) => date.day() === 0} />
                    </LocalizationProvider>
                </div>
                <div className="col-md-6 col-sm-12 d-flex flex-column align-items-center ">
                    <h3>{isDoctor ? "Patients" : "Records"}</h3>
                    <div>
                        <h6>{date?.format("MMMM DD, YYYY").toString()}</h6>
                    </div>
                    {isLoading ?
                        <div>
                            <SpinnerLoading />
                        </div>
                        :
                        <div className="table-scrollable">
                            {appointments && appointments.length > 0 ?
                                appointments?.map(el => (
                                    <div key={el.id} className="card rounded-3 main-text-dark mb-3 p-2">
                                        {!isDoctor && <h4>{el.doctor.fullName}</h4>}
                                        <h6>{el.patient.fullName}</h6>
                                        <h6>{el.patient.email}</h6>
                                        <h6>{dayjs(el.date).format("MMMM DD, YYYY, HH:mm")}</h6>
                                        <p>{el.description}</p>
                                        <button className="btn main-button-dark" onClick={() => { handleComplete(el) }}>Complete</button>
                                    </div>
                                ))
                                :
                                <p>
                                    Nothing to show!
                                </p>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
export default ManageSchedule;