export const UserTypes = {
    Complainant:0,
    Verifier:1,
    Technician:2,
    Admin:3
}

export const Headers = {
    UserType:'type',
    UserFirstName:'f_name',
    UserLastName:'l_name',
    UserUName:'u_name',
}

export const googleStuff = {
    detailsUrl:'https://www.googleapis.com/oauth2/v1/userinfo?access_token=',
}

export const pages = {
    login:'/login',
    dashboard:'/dashboard',
    error:'/error',
    loginError:'/login-error',
    verify:'/verify',
    verifyError:'/verify-error',
    verifySuccess:'/verify-success',
    technician:'/technician',
    technicianError:'/technician-error',
    technicianSuccess:'/technician-success',
    admin:'/admin',
    adminError:'/admin-error',
    adminSuccess:'/admin-success',
}