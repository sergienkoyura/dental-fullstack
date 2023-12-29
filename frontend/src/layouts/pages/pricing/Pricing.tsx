import { useEffect } from "react";
import { Heading } from "./components/Heading";
import { PriceList } from "./components/PriceList";

export const Pricing = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Heading />
            <PriceList />
        </div>
    );
}