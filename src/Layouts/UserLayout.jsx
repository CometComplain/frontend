import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContextProvider";
import { pages } from '@/constants';
import { useEffect } from "react";

const UserLayout = () => {
    const { user, requested } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (requested && !user) {
            alert(requested);
            navigate(pages.access_forbidden, {state: {reason: 'user not logged in'}});
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
