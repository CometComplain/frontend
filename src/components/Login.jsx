import {} from 'react';

const Login = () => {
    const handleClick = () => {
        console.log('login');
    };
    return (
        <div>
            <button onClick={handleClick}> login </button>
        </div>
    );
};

export default Login;
