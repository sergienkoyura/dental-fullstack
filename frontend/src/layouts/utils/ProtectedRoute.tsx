import React from 'react';
import { Redirect } from 'react-router-dom';

const ProtectedRoute: React.FC<{ user: any, redirectPath: string, children: any, isAdmin?: boolean, isDoctor?: boolean }> = (props) => {
    if (!props.user.accessToken) {
        if (props.isAdmin && props.user.role !== "ROLE_ADMIN")
            return (<Redirect to={props.redirectPath}/>);
        else if (props.isDoctor && props.user.role !== "ROLE_DOCTOR")
            return (<Redirect to={props.redirectPath}/>);
        else {
            return (<Redirect to={props.redirectPath}/>);
        }
    }

    return props.children;
};

export default ProtectedRoute;