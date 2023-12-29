import AppointmentDTO from "../../../../models/AppointmentDTO";
import dayjs from "dayjs";
import TimeEnum from "../../../../models/TimeEnum";
import appointmentService from "../../../../services/appointment.service";

export const AppointmentBlock: React.FC<{ item: AppointmentDTO, setState: any, isHistory: boolean, setItem?: any }> = (props) => {

    function cancelAppointment() {
        appointmentService.cancelAppointment(props.item)
            .then(() => {
                props.setState();
            })
    }

    return (
        <div className="row border-3 border rounded-5 main-text-dark container-xl p-2 my-3">
            <div className="col-md-6 col-sm-12 p-3 d-flex justify-content-between flex-column">
                <div className="container-fluid">
                    <h2>{dayjs(props.item.date).format("MMMM DD, YYYY, HH:mm")}</h2>
                    <h5>Estimated time: {TimeEnum[props.item.duration as keyof typeof TimeEnum]}</h5>
                    <p className="lead">{props.item.description}</p>
                </div>
                <div className="container-fluid">
                    <div className="col-12 d-flex align-items-center">
                        <p className="text-start m-0">Cost: {props.item.cost} UAH</p>
                    </div>
                    {!props.isHistory && !props.item.paid &&
                        <div className="col-12 p-0">
                            <button className="btn main-button-dark d-inline my-1 me-2" aria-current="true"
                                data-bs-toggle="modal" data-bs-target={`#modal`} onClick={() => props.setItem(props.item)}>
                                Pay in advance
                            </button>
                            <button onClick={() => { cancelAppointment() }} className="btn btn-danger d-inline my-1">Cancel</button>
                        </div>
                    }
                    {!props.isHistory && props.item.paid &&
                        <p className="alert alert-success d-inline-block">
                            Paid Successfully!
                        </p>
                    }
                </div>
            </div>
            <div className="col-md-6 col-sm-12 d-flex flex-column align-items-center p-3">
                <h4 className="text-center">{props.item.doctor.fullName}</h4>
                <img className="rounded-4" src={"data:image/jpeg;base64," + props.item.doctor.image} width={200} height={200} />
            </div>
        </div>
    )
}
export default AppointmentBlock;