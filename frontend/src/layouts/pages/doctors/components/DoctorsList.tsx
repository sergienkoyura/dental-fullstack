import {useEffect, useState} from "react";
import UserDTO from "../../../../models/UserDTO";
import publicService from "../../../../services/public.service";
import Doctor from "./Doctor";
import {SpinnerLoading} from "../../../utils/SpinnerLoading";

export const DoctorsList = () => {

    const [doctors, setDoctors] = useState<UserDTO[]>();

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);


    useEffect(() => {
        publicService.getAllDoctors()
            .then((res) => {
                setDoctors(res.data)
            })
            .catch((err) => {
                setHttpError(err.message)
            })
            .finally(() => {
                setIsLoading(false);
            })
    },[])


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
    return (
        <div>
            <div className="container-fluid d-flex justify-content-center align-items-center flex-column">
                {doctors?.map(el => (
                    <Doctor item={el} key={el.id}/>
                ))}
            </div>
        </div>
    );
}