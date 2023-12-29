import { useEffect, useState } from "react";
import PricingDTO from "../../../../../models/PricingDTO";
import adminService from "../../../../../services/admin.service";
import TimeEnum from "../../../../../models/TimeEnum";
import PricingCategoryEnum from "../../../../../models/PricingCategoryEnum";

export const PricingForm: React.FC<{ itemToEdit: PricingDTO, setEdited: any }> = (props) => {

    const [pricing, setPricing] = useState<PricingDTO>(props.itemToEdit);
    const [message, setMessage] = useState('');

    const [submitting, setSubmitting] = useState(false);
    const [alertStyle, setAlertStyle] = useState("alert-info");

    useEffect(() => {
        setPricing(props.itemToEdit);
        setMessage("");

        props.itemToEdit.id === 0 ? window.scrollTo(0, 0) : document.getElementById("pricingFormId")?.scrollIntoView();

    }, [props.itemToEdit]);

    function savePricing() {
        setSubmitting(true);
        
        adminService.savePricing(pricing)
            .then((res) => {
                setPricing(prev => ({ ...prev, id: res.data.id }))
                setMessage("Saved!");
                setAlertStyle("alert-info");
                props.setEdited(res.data.id);
                window.scrollTo(0, 0)
            })
            .catch((err) => {
                setMessage(err.response?.data?.message || 'An error occurred')
                setAlertStyle("alert-danger");
            })
            .finally(() => {
                setSubmitting(false);
            });
    }

    function timeField(el: string) {
        setPricing(prev => ({ ...prev, time: el }))
    }

    function categoryField(el: string) {
        setPricing(prev => ({ ...prev, category: el }))
    }

    return (
        <div className="container" id="pricingFormId">
            <form className="p-3 main-text-dark d-flex justify-content-center align-items-center flex-column">
                <div className="text-center mb-4">
                    <h3 className="fw-semibold">Manage Pricing</h3>
                </div>


                <div className="col-md-8 col-sm-12 p-2">
                    {message && (
                        <div className="d-flex justify-content-center w-100">
                            <div className={"alert py-1 text-center w-100 " + alertStyle} role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <div className="form-group mb-4">
                        <label htmlFor="service">Service</label>
                        <input
                            id="service"
                            type="text"
                            name="service"
                            value={pricing.service || ''}
                            onChange={(e) => setPricing(prev => ({ ...prev, service: e.target.value }))}
                            className="form-control"
                            required
                            placeholder="Service name"
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="cost">Cost</label>
                        <input
                            id="cost"
                            type="number"
                            name="cost"
                            value={pricing.cost || 0.0}
                            onChange={(e) => setPricing(prev => ({ ...prev, cost: parseInt(e.target.value) }))}
                            className="form-control"
                            required
                            placeholder="Cost"
                        />
                    </div>

                    <div className="form-group mb-4 dropdown">
                        <label htmlFor="dropdownMenuButton1">Select Time Option</label>
                        <button className="btn main-button-outline-dark dropdown-toggle w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {TimeEnum[pricing.time as keyof typeof TimeEnum]}
                        </button>
                        <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton1">
                            <li style={{ cursor: "pointer" }} onClick={() => timeField("MIN_15")}>
                                <a className="dropdown-item">
                                    {TimeEnum.MIN_15}
                                </a>
                            </li>
                            <li style={{ cursor: "pointer" }} onClick={() => timeField("MIN_30")}>
                                <a className="dropdown-item">
                                    {TimeEnum.MIN_30}
                                </a>
                            </li>
                            <li style={{ cursor: "pointer" }} onClick={() => timeField("HOUR_1")}>
                                <a className="dropdown-item">
                                    {TimeEnum.HOUR_1}
                                </a>
                            </li>
                            <li style={{ cursor: "pointer" }} onClick={() => timeField("HOUR_1_30")}>
                                <a className="dropdown-item">
                                    {TimeEnum.HOUR_1_30}
                                </a>
                            </li>
                            <li style={{ cursor: "pointer" }} onClick={() => timeField("HOUR_2")}>
                                <a className="dropdown-item">
                                    {TimeEnum.HOUR_2}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="form-group mb-4 dropdown">
                        <label htmlFor="dropdownMenuButton2">Select Category</label>
                        <button className="btn main-button-outline-dark dropdown-toggle w-100" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                            {PricingCategoryEnum[pricing.category as keyof typeof PricingCategoryEnum]}
                        </button>
                        <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton2">
                            <li style={{ cursor: "pointer" }} onClick={() => categoryField("CT")}>
                                <a className="dropdown-item">
                                    {PricingCategoryEnum.CT}
                                </a>
                            </li>
                            <li style={{ cursor: "pointer" }} onClick={() => categoryField("OD")}>
                                <a className="dropdown-item">
                                    {PricingCategoryEnum.OD}
                                </a>
                            </li>
                            <li style={{ cursor: "pointer" }} onClick={() => categoryField("SD")}>
                                <a className="dropdown-item">
                                    {PricingCategoryEnum.SD}
                                </a>
                            </li>
                            <li style={{ cursor: "pointer" }} onClick={() => categoryField("TD")}>
                                <a className="dropdown-item">
                                    {PricingCategoryEnum.TD}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="form-group d-flex justify-content-center">
                    <button onClick={savePricing} type="button" className="btn btn-md main-button-outline-dark btn-block" disabled={submitting}>
                        {submitting && <span className="spinner-border spinner-border-sm"></span>}
                        <span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PricingForm;