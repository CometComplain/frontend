import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContextProvider";
import {pages, UserTypes} from '@/constants';
import { useEffect } from "react";

const UserLayout = () => {
    const { user, requested } = useUser();
    const navigate = useNavigate();

    const path = window.location.pathname;

    useEffect(() => {
        if (requested) {
            if(!user)
                navigate(pages.login, {state: {reason: 'user not logged in'}});
            if((user && (user.role === UserTypes.Technician || user.role === UserTypes.Verifier)) && path === pages.registerComplaint)
                navigate(pages.login, {state: {reason: 'user not allowed'}})
        }
    }, [requested]);

    if (!requested) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default UserLayout;
