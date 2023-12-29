import { useState } from "react";
import PricingDTO from "../../../../../models/PricingDTO";
import adminService from "../../../../../services/admin.service";

export const PricingList: React.FC<{ items: PricingDTO[], setItem: any, setEdited: any, editedItem: number }> = (props) => {

    const [message, setMessage] = useState("");
    const [alertStyle, setAlertStyle] = useState("alert-info");

    function editItem(item: PricingDTO) {

        props.setItem(item);
        props.setEdited(item.id);
        setMessage("");

    }

    function deleteItem(item: PricingDTO) {
        adminService.deletePricing(item)
            .then(() => {
                props.setEdited();
                refreshForm();
                setAlertStyle("alert-info");
            })
            .catch((err) => {
                setMessage(err.response?.data?.message || 'An error occurred')
                setAlertStyle("alert-danger");
            })
    }

    function refreshForm() {
        props.setItem(new PricingDTO("", "CT", 0.0, "MIN_15", 0));
        props.setEdited(0);
        setMessage("");
    }

    function searchTable(searchTerm: string) {
        let rowList = document.querySelectorAll<HTMLTableRowElement>("tbody tr");
        rowList.forEach(el => {
            el.style.display = "table-row";
        })
        rowList.forEach(el => {
            if (!el.querySelector<HTMLElement>("th")?.textContent?.toLowerCase().includes(searchTerm.toLowerCase()))
                el.style.display = "none";
        })
    }

    return (
        <div className="w-100 py-5 main-text-dark">

            <div className="text-center py-3">
                <h1>Pricing List</h1>
                {props.editedItem !== 0 && <button className="btn main-button-dark" onClick={() => refreshForm()}>Add pricing</button>}
            </div>

            <div className="d-flex justify-content-center mb-3 align-items-center">
                <label className="mx-2">Search for:</label>
                <input type="text" placeholder="Service name..." className="w-25 mx-2 form-control" onChange={(e) => { searchTable(e.target.value);}} />
            </div>

            {message && (
                <div className="d-flex justify-content-center w-100">
                    <div className={"alert py-1 text-center w-100 " + alertStyle} role="alert">
                        {message}
                    </div>
                </div>
            )}

            <div className="table-scrollable">
                <table className="table table-striped text-center border-5 border">
                    <thead className="fs-5 border-5 border">
                        <tr>
                            <th scope="col" className="main-text-dark">Service</th>
                            <th scope="col" className="main-text-dark">Price</th>
                            <th scope="col" className="main-text-dark">Category</th>
                            <th scope="col" className="main-text-dark">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.items.map(item => (
                            <tr key={item.id} style={props.editedItem === item.id ? { backgroundColor: "#7aa6aa" } : {}}>
                                <th className="main-text-dark">{item.service}</th>
                                <td>{item.cost}</td>
                                <td>{item.category}</td>
                                <td>
                                    <div className="d-inline">
                                        <a style={{ cursor: "pointer" }} className="main-text-dark px-1" onClick={() => editItem(item)}><i className="fa fa-pencil"></i></a>
                                        <a style={{ cursor: "pointer" }} className="main-text-dark px-1" onClick={() => deleteItem(item)}><i className="fa fa-trash"></i></a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PricingList;