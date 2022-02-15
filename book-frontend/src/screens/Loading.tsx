import './css/Loading.css';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Loading = (): JSX.Element => {

    const user = useSelector((state: any) => state.user)
    
    if(!user.paymentInfo){
        //start here tomorrow
    }

    return (
        <div className="loading-container border">
            <Spinner animation='border' style={{ color: 'blue' }} />
            <span>Please wait</span>
        </div>
    );
}

export default Loading;