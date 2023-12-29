import {useEffect} from "react";
import {DoctorsList} from "./components/DoctorsList";
import {Heading} from "./components/Heading";

export const Doctors = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <div>
            <Heading />
            <DoctorsList />
        </div>
    );
}