import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ClosedButton from './styles/Closed1Button';
import Form from "./styles/Form";
import LoadingSpinner from "./LoadingSpinner";

const SUBSCRIPTION_COMPLETION_MUTATION = gql`
  mutation SUBSCRIPTION_COMPLETION_MUTATION {
    completeSubscription {
      id
      name
    }
  }
`;

const CREATE_SUBSCRIPTION_MUTATION = gql`
  mutation CREATE_SUBSCRIPTION_MUTATION($paymentMethodId: String) {
    createSubscription(paymentMethodId: $paymentMethodId) {
      id
      status
      payment_intent {
        id
        status
        client_secret
      }
    }
  }
`;

const stripePromise = loadStripe("pk_test_bkHPss08wHYYG3bCIe8NrsZJ");

const CheckoutForm = ({ productSelected, customer }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [subscribing, setSubscribing] = useState(false);
  const [paymentId, setpaymentId] = useState(null);
  const [errorToDisplay, setErrorToDisplay] = useState("");

  function handlePaymentThatRequiresCustomerAction({
    subscription,
    invoice,
    priceId,
    paymentMethodId,
    isRetry,
  }) {
    if (subscription && subscription.status === "active") {
      // subscription is active, no customer actions required.
      return { subscription, priceId, paymentMethodId };
    }
    // If it's a first payment attempt, the payment intent is on the subscription latest invoice.
    // If it's a retry, the payment intent will be on the invoice itself.
    const paymentIntent = invoice
      ? invoice.payment_intent
      : subscription.payment_intent;
    if (
      paymentIntent.status === "requires_action" ||
      (isRetry === true && paymentIntent.status === "requires_payment_method")
    ) {
      return stripe
        .confirmCardPayment(paymentIntent.client_secret, {
          payment_method: paymentMethodId,
        })
        .then((result) => {
          if (result.error) {
            // start code flow to handle updating the payment details
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc)
            throw result;
          } else {
            if (result.paymentIntent.status === "succeeded") {
              // There's a risk of the customer closing the window before callback
              // execution. To handle this case, set up a webhook endpoint and
              // listen to invoice.payment_succeeded. This webhook endpoint
              // returns an Invoice.
              return {
                priceId: priceId,
                subscription: subscription,
                invoice: invoice,
                paymentMethodId: paymentMethodId,
              };
            }
          }
        });
    } else {
      // No customer action needed
      return { subscription, priceId, paymentMethodId };
    }
  }

  function handleRequiresPaymentMethod({
    subscription,
    paymentMethodId,
    priceId,
  }) {
    if (subscription.status === "active") {
      // subscription is active, no customer actions required.
      return { subscription, priceId, paymentMethodId };
    } else if (
      subscription.payment_intent.status === "requires_payment_method"
    ) {
      setErrorToDisplay("Your card was declined.");
    } else {
      return { subscription, priceId, paymentMethodId };
    }
  }

  const handleSubmit = async (
    createSubscriptionMutation,
    onSubscriptionComplete
  ) => {
    setSubscribing(true);

    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[createPaymentMethod error]", error);
      setSubscribing(false);
      setErrorToDisplay(error && error.message);
      return;
    }
    console.log("[PaymentMethod]", paymentMethod);
    setpaymentId(paymentMethod.id);
    const paymentMethodId = paymentMethod.id;
    // if (latestInvoicePaymentIntentStatus === 'requires_payment_method') {
    //   // Update the payment method and retry invoice payment
    //   const invoiceId = localStorage.getItem('latestInvoiceId');
    //   retryInvoiceWithNewPaymentMethod({
    //     paymentMethodId: paymentMethodId,
    //     invoiceId: invoiceId,
    //   });
    //   return;
    // }
    let response = await createSubscriptionMutation()
      .then((res) => {
        return {
          subscription: res.data.createSubscription,
          paymentMethodId: paymentMethodId,
          priceId: "BASIC",
        };
      })
      .then(handlePaymentThatRequiresCustomerAction)
      .then(handleRequiresPaymentMethod)
      .catch((error) => {
        console.log("error check", error);
        // An error has happened. Display the failure to the user here.
        // We utilize the HTML element we created.
        setSubscribing(false);
        setErrorToDisplay(error.message || error.error.decline_code);
        return error;
      });
    if (response.subscription.payment_intent.status === "succeeded") {
      const subscribed = await onSubscriptionComplete();
    }
    setSubscribing(false);
    window.location.reload();
  };

  return (
    <Mutation
      mutation={CREATE_SUBSCRIPTION_MUTATION}
      variables={{ paymentMethodId: paymentId }}
    >
      {(createSubscriptionMutation, { loading, error }) => (
        <div id="payment-form" style={{ fontSize: "1.6rem"}}>
          {subscribing ? <LoadingSpinner /> : ''}
             <h3>→ Subscribing to Closed1 Subscription</h3>
          <p>Upgrade your subscription from free to paid ($2.99 per month) to unlock the full potential of your Closed1 Network.</p>
            Unlock full access to:
          <ul style={{ marginTop: 0, marginBottom: "3rem"}}>
              <li>Rolodex</li>
              <li>Feed</li>
              <li>Friends Profile Pages.</li>
            </ul>
            
             <Mutation mutation={SUBSCRIPTION_COMPLETION_MUTATION}>
              {(onSubscriptionComplete) => (
                <Form
                  id="payment-form"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    handleSubmit(
                      createSubscriptionMutation,
                      onSubscriptionComplete
                    );
                  }}
                >
                  <div style={{ width: "500px", maxWidth: "100%", minHeight: "50px", border:'1px solid #26A69A', padding: '1rem' }}>
                  Enter your card details
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#32325d",
                            fontFamily:
                              "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
                            "::placeholder": {
                              color: "#69ddd1",
                            },
                          },
                          invalid: {
                            color: "#9e2146",
                          },
                        },
                      }}
                    />
                  </div> 
              Your subscription will start now &nbsp;
                  <button id="submit" type="submit">
                    <div>
                      <div>{subscribing ? "Subscribing..." : "Subscribe"}</div>
                    </div>
                  </button>
                </Form>
              )}
            </Mutation>
        </div>
      )}
    </Mutation>
  );
};

const PaymentForm = (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm {...props} /> 
    <Link href="/">
      <ClosedButton> Go To Feed</ClosedButton>
    </Link>
  </Elements>
);

export default PaymentForm;
