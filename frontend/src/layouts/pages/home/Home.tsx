import { useEffect } from "react";
import { Carousel } from "./components/Carousel"
import { Explore } from "./components/Explore";
import { Welcome } from "./components/Welcome"

export const Home = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Welcome />
            <Carousel />
            <Explore />
        </div>
    );
}