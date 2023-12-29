import UserDTO from "../../../../models/UserDTO";

export const Doctor: React.FC<{ item: UserDTO }> = (props) => {
    return (
        <div className="card col-md-8 col-sm-12 p-4 rounded-5 mb-5">
            <div className="main-text-dark row">
                <div className="ps-4 col-md-6 col-sm-12">
                    <div className="card-title">
                        <h1>{props.item.fullName}</h1>
                    </div>
                    <div className="card-text">
                        <p>{props.item.description}</p>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 d-flex align-items-center">
                    <div className="card-img d-flex justify-content-center">
                        <img className="rounded-4" src={"data:image/jpeg;base64," + props.item.image} width={250} height={250} />
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Doctor;