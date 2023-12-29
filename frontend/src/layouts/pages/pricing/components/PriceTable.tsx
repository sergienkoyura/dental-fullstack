import PricingCategoryEnum from "../../../../models/PricingCategoryEnum";
import PricingDTO from "../../../../models/PricingDTO";

export const PriceTable: React.FC<{ category: PricingCategoryEnum, items?: PricingDTO[] }> = (props) => {
    return (
        <div className="price-block col-md-8 col-sm-12 mb-5">
            <div className="price-header text-center main-bg-dark">
                <h3 className="main-text-aqua p-3">{props.category}</h3>
            </div>
            <div className="price-content">
                <table className="table table-striped main-text-dark text-center">
                    <tbody>
                        {props.items?.map(el => (
                            <tr key={el.id}>
                                <td>{el.service}</td>
                                <td>{el.cost} UAH</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default PriceTable;