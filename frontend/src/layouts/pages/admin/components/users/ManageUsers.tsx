import {useEffect, useState} from "react";
import adminService from "../../../../../services/admin.service";
import {SpinnerLoading} from "../../../../utils/SpinnerLoading";
import {UserList} from "./UserList";
import {UserForm} from "./UserForm";
import UserDTO from "../../../../../models/UserDTO";

export const ManageUsers = () => {

    const [users, setUsers] = useState<UserDTO[]>([]);

    const [editedItem, setEditedItem] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [itemToEdit, setItemToEdit] = useState<UserDTO>(new UserDTO(0, "", "", "", false, "ROLE_USER"));

    const [state, setState] = useState(false);

    useEffect(() => {
        adminService.getAllUsers()
            .then((res) => {
                setUsers(res.data);
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

    function setItem(item: UserDTO) {
        setItemToEdit(item);
    }

    function setEdited(id: number) {
        setEditedItem(id);
        setState(!state);
    }

    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <UserList items={users} setItem={setItem} setEdited={setEdited} editedItem={editedItem} />
            <UserForm itemToEdit={itemToEdit} setEdited={setEdited} />
        </div>
    );
}
export default ManageUsers;