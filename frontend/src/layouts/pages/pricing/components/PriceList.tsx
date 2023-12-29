import {useEffect, useState} from "react";
import PriceTable from "./PriceTable";
import PricingDTO from "../../../../models/PricingDTO";
import {SpinnerLoading} from "../../../utils/SpinnerLoading";
import PricingCategoryEnum from "../../../../models/PricingCategoryEnum";
import publicService from "../../../../services/public.service";

export const PriceList = () => {

    const [priceList, setPriceList] = useState<PricingDTO[]>();

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        publicService.getAllPricings()
            .then((res) => {
                setPriceList(res.data);
            })
            .catch((err) => setHttpError(err.message))
            .finally(() => setIsLoading(false))
    }, [])


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
            <div className="price-wrap d-flex justify-content-center align-items-center flex-column mb-5">
                <PriceTable category={PricingCategoryEnum.CT} items={priceList?.filter(el => el.category === "CT")}/>
                <PriceTable category={PricingCategoryEnum.TD} items={priceList?.filter(el => el.category === "TD")}/>
                <PriceTable category={PricingCategoryEnum.SD} items={priceList?.filter(el => el.category === "SD")}/>
                <PriceTable category={PricingCategoryEnum.OD} items={priceList?.filter(el => el.category === "OD")}/>
            </div>

        </div>
    );
}