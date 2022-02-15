import './css/Loading.css';
import { Spinner } from 'react-bootstrap';

const Loading = (): JSX.Element => {
    return (
        <div className="loading-container border">
            <div>
                <Spinner animation='border' color='primary'/>
            </div>
        </div>
    );
}

export default Loading;