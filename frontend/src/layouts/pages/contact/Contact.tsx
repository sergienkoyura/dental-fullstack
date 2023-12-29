import {useEffect} from "react";
import {ContactForm} from "./components/ContactForm";
import {Heading} from "./components/Heading";

export const Contact = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Heading />
            <ContactForm />
        </div>
    );
}