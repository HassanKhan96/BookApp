import "./css/Payment.css";
import {Button, Card, Col, Row} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import {
    useStripe,
    useElements, 
    CardElement,

} from '@stripe/react-stripe-js';
import { getUserPayment } from "../redux/user/actions/user.actions";
import { Navigate, useLocation } from "react-router-dom";

const Payment = (): JSX.Element => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const CARD_ELEMENT_OPTIONS = {
        style: {
          base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            width: '100%',
            "::placeholder": {
              color: "#aab7c4",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
        },
      };
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make  sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card)
        dispatch(getUserPayment(result?.token?.id, 'monthly'))
    }

    return (
        <div className="payment-container">
            <Row className="justify-content-center">
                
                <Col sm={5}>
                    
                    <Card className="p-5 text-center rounded">
                        <h4 className="mb-3">Enter your card details</h4>
                        <form onSubmit={handleSubmit}>
                            <CardElement options={CARD_ELEMENT_OPTIONS}/>
                            <Button type="submit" className="primary mt-3" disabled={!stripe}>Confirm</Button>
                        </form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Payment;