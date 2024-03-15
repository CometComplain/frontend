import axios from "axios";

export const UserTypes = {
    Complainant: 0, Verifier: 1, Technician: 2, Admin: 3
}

export const Headers = {
    UserType: 'type', UserFirstName: 'f_name', UserLastName: 'l_name', UserUName: 'u_name',
}

export const googleStuff = {
    detailsUrl: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=',
}

export const complaintTypes = ["Mess", "Electrical", "Plumbing", "IT", "Academics", "Others"];

export const pages = {
    login: '/login',
    dashboard: '/user/dashboard',
    registerComplaint: '/user/complaint-register',
    error: '/error',
    loginError: '/login-error',
    verify: '/verify',
    verifyError: '/verify-error',
    verifySuccess: '/verify-success',
    technician: '/technician',
    technicianError: '/technician-error',
    technicianSuccess: '/technician-success',
    admin: '/admin',
    adminError: '/admin-error',
    adminSuccess: '/admin-success',
    access_forbidden: '/access-forbidden'
}

const backendUrl = 'http://localhost:5000'

export const apiRoutes = {
    registerComplaint: '/backend/complaints/register',
    getComplaints: '/backend/complaints',
    getComplaintWithId:'/backend/complaint',
    uploadProof: '/backend/upload',
    backendUrl, // login:`${backendUrl}/api/v1/auth/google`,
    login: `${backendUrl}/api/v1/auth/google`,
    // deleteComplaint: '/api/complaints/delete',
}

export const customAxios = axios.create({
    withCredentials: true,
})


export const unAuLinks = [{
    name: 'Home', path: '/'
}];
export const auLinks = [{
    name: 'Home', path: '/'
}, {
    name: 'Dashboard', path: '/user/dashboard'
},{
    name: 'Register Complaint', path: '/user/complaint-register'
},];

export const subs = {
    'Home': [
        {name: 'About', path: '/#about'},
        {name: 'Contact', path: '/#contact'}
    ],
}