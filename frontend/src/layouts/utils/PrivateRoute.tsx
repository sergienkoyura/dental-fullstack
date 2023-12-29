import {Redirect, Route, RouteProps} from "react-router-dom";
import authService from "../../services/auth.service";

interface CustomRouteProps extends RouteProps{
    role?: string;
}

export const PrivateRoute: React.FC<CustomRouteProps> = ({
    role,
    children,
    ...rest
}) => {
    let user = authService.getCurrentUser();

    return (
        <Route {...rest}>
            {!user?.accessToken || (role && !role.includes(user.role!)) 
                ?
                <Redirect to={"/home"}/>
                : 
                children
            }
        </Route>
    );
}

export default PrivateRoute;