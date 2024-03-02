import {useRef} from 'react';
import HomeCss from './styles.module.css';

const Index = () => {
    const divref = useRef();
    return (
        <div ref={divref} className='content'>
            Home
        </div>
    );
};

export default Index;


