import {useEffect, useState} from "react";
import publicService from "../../../../services/public.service";
import PricingDTO from "../../../../models/PricingDTO";
import {SpinnerLoading} from "../../../utils/SpinnerLoading";
import {DateCalendar} from "@mui/x-date-pickers/DateCalendar";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, {Dayjs} from "dayjs";
import TimeEnum from "../../../../models/TimeEnum";
import appointmentService from "../../../../services/appointment.service";
import AppointmentRequest from "../../../../models/AppointmentRequest";
import TokenService from "../../../../services/token.service";

type Data = {
    [key: string]: string[];
};

export const MakeAppointment: React.FC<{}> = (props) => {

    const [priceList, setPriceList] = useState<PricingDTO[]>();

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [selectedService, setSelectedService] = useState<PricingDTO>();
    const [date, setDate] = useState<Dayjs | null>(); //dayjs(Date.now())
    const [possibleTime, setPossibleTime] = useState<string[]>();

    const [loadingIntervals, setLoadingIntervals] = useState(false);
    const [intervals, setIntervals] = useState<Data>();
    const [choice, setChoice] = useState({ key: '', value: '' });

    useEffect(() => {
        publicService.getAllPricings()
            .then((res) => {
                setPriceList(res.data);
                window.scrollTo(0, 0);
            })
            .catch((err) => setHttpError(err.message))
            .finally(() => setIsLoading(false))
    }, []);

    useEffect(() => {
        if (date) {
            setLoadingIntervals(true)
            appointmentService.getAvailableIntervals(date.format("YYYY-MM-DD"), selectedService?.time)
                .then((res) => {
                    setIntervals(res.data)
                })
                .finally(() => {
                    setLoadingIntervals(false)
                    setChoice({ key: '', value: '' })
                })
        } else {
            setIntervals(undefined);
            setChoice({ key: '', value: '' });
        }

    }, [date]);

    if (isLoading) {
        return <SpinnerLoading />;
    }

    if (httpError) {
        return (
            <div className="text-danger container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    function bookAppointment() {
        const appointment: AppointmentRequest = new AppointmentRequest(
            selectedService?.category + ": " + selectedService?.service,
            "scheduled", choice.key, selectedService?.cost, selectedService?.time,
            TokenService.getUser()?.email, dayjs(choice.value).format("YYYY-MM-DDTHH:mm")
        );

        appointmentService.bookAppointment(appointment)
            .then(() => {
                document.getElementById("scheduled-visits-tab")?.click();
            })
    }

    return (
        <div className="container main-text-dark my-4">
            <form className="d-flex flex-column justify-content-center align-items-center">
                <div>
                    <h1>Make an appointment</h1>
                </div>
                <div className="container-fluid">
                    <div className="form-group mb-4 dropdown">
                        <label htmlFor="dropdownMenuButton1">Select a Service</label>
                        <button className="btn main-button-outline-dark dropdown-toggle w-100 text-center" style={{ overflow: "hidden", textOverflow: "ellipsis" }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {!selectedService ? "Select a Service " : selectedService?.service}
                        </button>
                        <ul className="dropdown-menu w-100 table-scrollable" aria-labelledby="dropdownMenuButton1">
                            {priceList?.map(el => (
                                <li key={el.id} style={{ cursor: "pointer" }} onClick={() => { setSelectedService(el); setDate(undefined) }}>
                                    <a className="dropdown-item">
                                        {el.category}: {el.service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        {selectedService &&
                            <>
                                <span>Cost: {selectedService?.cost} UAH<br /></span>
                                <span>Estimated time: {TimeEnum[selectedService?.time as keyof typeof TimeEnum]}</span>
                            </>
                        }
                    </div>
                </div>
                {selectedService &&
                    <>
                        <div className="row container-xl">
                            <div className="col-md-6 col-sm-12 d-flex flex-column align-items-center">
                                <h3>Pick a date</h3>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateCalendar value={date || null} onChange={(newValue) => setDate(newValue)}
                                        disablePast={true} shouldDisableDate={(date) => date.day() === 0} />
                                </LocalizationProvider>
                            </div>
                            <div className="col-md-6 col-sm-12 d-flex flex-column align-items-center ">
                                {date &&
                                    <>
                                        <h3>Pick the time</h3>
                                        <div>
                                            <h6>{date.format("MMMM DD, YYYY").toString()}</h6>
                                        </div>
                                        {loadingIntervals ?
                                            <div>
                                                <SpinnerLoading />
                                            </div>
                                            :
                                            <div>
                                                {intervals &&
                                                    Object.keys(intervals).map((key) => (
                                                        intervals[key].length > 0 &&
                                                        <div key={key} className="mb-3">
                                                            <h3>{key}</h3>
                                                            {intervals[key].map((value, index) => (
                                                                <button type="button" className={`btn d-inline m-1 ${choice.key == key && choice.value == value ? "main-button-dark-nh" : "main-button-outline-dark"}`} key={index} onClick={() => setChoice({ key: key, value: value })}>{dayjs(value).format('HH:mm')}</button>
                                                            ))}
                                                        </div>
                                                    ))}
                                            </div>
                                        }
                                    </>

                                }
                            </div>
                        </div>
                        {choice.key.length > 0 &&
                            <div className="row container-xl">
                                <div className="d-flex justify-content-center">
                                    <button onClick={() => bookAppointment()} type="button" className="btn btn-lg main-button-outline-dark">Book</button>
                                </div>
                            </div>
                        }

                    </>

                }
            </form>
        </div>
    );
}
export default MakeAppointment;