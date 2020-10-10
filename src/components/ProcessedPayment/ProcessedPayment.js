import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SplitForm from '../SplitForm/SplitForm';


const stripePromise = loadStripe('pk_test_51HaJunFegNo1K5aR5XPRpfKNCuMRy46wYE1nypY2HUSQNzgyMEfsKVwLq55aU7cn9KMzpAca1eYXsilN7KAzVKg900YYmzxOmP');

const ProcessedPayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <SplitForm></SplitForm>
    </Elements>
  );
};

export default ProcessedPayment;
