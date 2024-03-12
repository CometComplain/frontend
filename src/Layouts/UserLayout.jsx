import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContextProvider";
import { pages } from '@/constants';
import { useEffect } from "react";

const UserLayout = () => {
    const { userG } = useUser();
    const navigate = useNavigate();

    // console.log('in dashboard');

    useEffect(() => {
        if (!userG) {
            navigate(pages.access_forbidden, { state: { reason: 'user not logged in' } });
        }
    }, []);

    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default UserLayout;
