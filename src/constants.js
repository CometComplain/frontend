import { acceptComplaint } from "@api/apiCalls";
import axios from "axios";

export const UserTypes = {
    Complainant: 0,
    Verifier: 1,
    Technician: 2,
    Admin: 3,
};

export const statusMap = {
    Pending: 0,
    Verified: 1,
    Accepted: 2,
    Solved: 3,
    Rejected: 4,
};

export const reverseStatusMap = {
    0: "Pending",
    1: "Verified",
    2: "Accepted",
    3: "Solved",
    4: "Rejected",
}

export const Headers = {
    UserType: "type",
    UserFirstName: "f_name",
    UserLastName: "l_name",
    UserUName: "u_name",
};

export const complaintTypes =  {
    electrical: 0,
    plumbing: 1,
    IT: 2,
    academics: 3,
    others: 4,
};

export const buildingsMap = {
    "Mess": 0,
    "Admin Block": 1,
    "Academic Block": 2,
    "new Academic Block": 3,
    "Meenachil Hostel": 4,
    "Sahayadri Hostel": 5,
    "Manimala Hostel": 6,
    "Annaimudi Hostel": 7,
    "Anna residency": 8,
}
export const reverseBuildingsMap = {
    [0]: "Mess",
    [1]: "Admin Block",
    [2]: "Academic Block",
    [3]: "new Academic Block",
    [4]: "Meenachil Hostel",
    [5]: "Sahayadri Hostel",
    [6]: "Manimala Hostel",
    [7]: "Annaimudi Hostel",
    [8]: "Anna residency",
}

export const pages = {
    login: "/login",
    dashboard: "/user/dashboard",
    registerComplaint: "/user/complaint-register",
    error: "/error",
    loginError: "/login-error",
    verify: "/verify",
    verifyError: "/verify-error",
    verifySuccess: "/verify-success",
    technician: "/technician",
    technicianError: "/technician-error",
    technicianSuccess: "/technician-success",
    admin: "/admin",
    adminError: "/admin-error",
    adminSuccess: "/admin-success",
    access_forbidden: "/access-forbidden",
    complaint: "/user/complaint",
};

export const backendUrl = "http://172.16.207.102:5000";

export const apiRoutes = {
    registerComplaint: "/api/grievance/register",
    getComplaints: "/api/grievance/complaints",
    getComplaintWithId: "/api/grievance/complaintWithId",
    deleteComplaint: "/api/grievance/delete",
    uploadProof: "/api/grievance/upload",
    verifyComplaint: "/api/grievance/verify",
    rejectComplaint: "/api/grievance/reject",
    acceptComplaint: "/api/grievance/accept",
    solveComplaint: "/api/grievance/solve",
    getUser: "/api/grievance/auth/pinguser",
    backendUrl,
    // login:`${backendUrl}/api/v1/auth/google`,
    login: `${backendUrl}/grievance/auth/google`,
    // deleteComplaint: '/api/complaints/delete',
};

// export const apiRoutes = {
//     registerComplaint: "/api/register",
//     getComplaints: "/api/complaints",
//     getComplaintWithId: "/api/complaint",
//     uploadProof: "/api/upload",
//     verifyComplaint: "/api/complaints/verify",
//     acceptComplaint: "/api/complaints/accept",
//     getUser: "/api/auth/login/success",
//     backendUrl,
//     // login:`${backendUrl}/api/v1/auth/google`,
//     login: `${backendUrl}/auth/google`,
//     // deleteComplaint: '/api/complaints/delete',
// };

export const customAxios = axios.create({
    withCredentials: true,
});

export const unAuLinks = [
    {
        name: "Home",
        path: "/",
    },
];

const verTechLinks = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Dashboard",
        path: "/user/dashboard",
    },
];

const userSpecificLinks = [
    {
        name: "Register Complaint",
        path: "/user/complaint-register",
    },
]
export const auLinks = {
    [UserTypes.Complainant]: [...verTechLinks, ...userSpecificLinks],
    [UserTypes.Verifier]: verTechLinks,
    [UserTypes.Technician]: verTechLinks,
};

export const subs = {
    Home: [
        { name: "About", path: "/#about" },
        { name: "Contact", path: "/#contact" },
    ],
};
