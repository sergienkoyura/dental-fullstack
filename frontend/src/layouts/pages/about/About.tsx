import {useEffect} from "react";
import {Heading} from "./components/Heading";
import {Lists} from "./components/Lists";

export const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Heading />
            <Lists />
        </div>
    );
}