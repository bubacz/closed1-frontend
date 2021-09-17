import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import { Mutation } from "react-apollo";
import Form from "./styles/Form";
import CardSection from "./CardSection";
import gql from "graphql-tag";
import PaymentResponseModal from "./PaymentResponse";

const ACCEPT_PAYMENT_MUTATION = gql`
  mutation ACCEPT_PAYMENT_MUTATION($info: String!) {
    acceptPayment(info: $info) {
      id
    }
  }
`;

class CheckoutForm extends React.Component {
  state={
    isOpen: false,
  }
  handleSubmit = async (acceptPayment) => {
    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      this.setState({ info: result.token.id });
      // Send the token to your server.
      const res = await acceptPayment();
      console.log("res", res);
      // This function does not exist yet; we will define it in the next step.
    }
  };

  render() {
    return (
      <Mutation mutation={ACCEPT_PAYMENT_MUTATION} variables={this.state}>
        {(acceptPayment, { loading, error }) => (
          <Form onSubmit={async (e) => {
            e.preventDefault();
            const { stripe, elements } = this.props;
        
            if (!stripe || !elements) {
              // Stripe.js has not yet loaded.
              // Make  sure to disable form submission until Stripe.js has loaded.
              return;
            }
        
            const card = elements.getElement(CardElement);
            const result = await stripe.createToken(card);
            if (result.error) {
              // Show error to your customer.
              console.log(result.error.message);
            } else {
              this.setState({ info: result.token.id });
              // Send the token to your server.
              const res = await acceptPayment();
              console.log("res", res);
              this.setState({isOpen: true});
              // This function does not exist yet; we will define it in the next step.
            }
          }}>
          <PaymentResponseModal isOpen={this.state.isOpen}/>
            <CardSection />
            <button disabled={!this.props.stripe} type="submit">Confirm order</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
