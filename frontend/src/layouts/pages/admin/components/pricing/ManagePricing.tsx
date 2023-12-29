import {useEffect, useState} from "react";
import PricingDTO from "../../../../../models/PricingDTO";
import {SpinnerLoading} from "../../../../utils/SpinnerLoading";
import PricingList from "./PricingList";
import PricingForm from "./PricingForm";
import publicService from "../../../../../services/public.service";

export const ManagePricing = () => {

    const [pricings, setPricings] = useState<PricingDTO[]>([]);

    const [editedItem, setEditedItem] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [itemToEdit, setItemToEdit] = useState<PricingDTO>(new PricingDTO("", "CT", 0.0, "MIN_15", 0));

    const [state, setState] = useState(false);

    useEffect(() => {
        publicService.getAllPricings()
            .then((res) => {
                setPricings(res.data);
            })
            .catch((err) => {
                setHttpError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [state]);

    if (isLoading) {
        return <SpinnerLoading />;
    }

    if (httpError) {
        return (
            <div className="container m-5 text-danger">
                <p>{httpError}</p>
            </div>
        );
    }

    function setItem(item: PricingDTO) {
        setItemToEdit(item);
    }

    function setEdited(id: number) {
        setEditedItem(id);
        setState(!state);
    }

    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <PricingList items={pricings} setItem={setItem} setEdited={setEdited} editedItem={editedItem} />
            <PricingForm itemToEdit={itemToEdit} setEdited={setEdited} />
        </div>
    );
}
export default ManagePricing;