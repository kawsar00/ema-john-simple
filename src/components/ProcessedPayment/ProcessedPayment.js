import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import SplitForm from '../SplitForm/SplitForm';
import SinglePaymentPage from '../SinglePaymentPage/SinglePaymentPage';


const stripePromise = loadStripe('pk_test_51HaJunFegNo1K5aR5XPRpfKNCuMRy46wYE1nypY2HUSQNzgyMEfsKVwLq55aU7cn9KMzpAca1eYXsilN7KAzVKg900YYmzxOmP');

const ProcessedPayment = ({handlePayment}) => {
  return (
    <Elements stripe={stripePromise}>
      <SinglePaymentPage handlePayment={handlePayment}></SinglePaymentPage>
    </Elements>
  );
};

export default ProcessedPayment;
