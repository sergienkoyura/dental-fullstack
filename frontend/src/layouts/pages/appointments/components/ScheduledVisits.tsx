import {useEffect, useState} from "react";
import appointmentService from "../../../../services/appointment.service";
import AppointmentDTO from "../../../../models/AppointmentDTO";
import {SpinnerLoading} from "../../../utils/SpinnerLoading";
import AppointmentBlock from "./AppointmentBlock";
import {Pagination} from "../../../utils/Pagination";
import PaymentModal from "./PaymentModal";

export const ScheduledVisits: React.FC<{}> = (props) => {

    const [scheduled, setScheduled] = useState<AppointmentDTO[]>();

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [item, setItem] = useState<AppointmentDTO>();

    const [state, setState] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        appointmentService.getScheduledAppointments(currentPage - 1, itemsPerPage)
            .then((res) => {
                setScheduled(res.data.appointments);
                window.scrollTo(0, 0);
                setTotalAmount(res.data.totalElements);
                setTotalPages(res.data.totalPages);
            })
            .catch((err) => setHttpError(err.message))
            .finally(() => {
                setIsLoading(false);
            })
    }, [state, currentPage]);

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

    const indexOfLastReview: number = currentPage * itemsPerPage;
    const indexOfFirstReview: number = indexOfLastReview - itemsPerPage;

    let lastItem = indexOfLastReview <= totalAmount ? indexOfLastReview : totalAmount;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="main-text-dark d-flex justify-content-center align-items-center flex-column">
            <div className="my-3">
                <h1>Scheduled Visits</h1>
                <p>
                    {totalAmount > 0 ?
                        `${indexOfFirstReview + 1} to ${lastItem} of ${totalAmount} items:`
                        :
                        `There will be your scheduled visits`
                    }
                </p>
            </div>
            {scheduled?.map(el => (
                <AppointmentBlock key={el.id} item={el} setState={() => setState(!state)} isHistory={false} setItem={setItem} />
            ))}

            <PaymentModal item={item} changeState={() => setState(!state)} />

            {totalPages > 1 &&
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            }

        </div>
    );
}
export default ScheduledVisits;