import React, { Component } from 'react';
import Form from '../components/styles/Form';


class ChatMessage extends React.Component {
   render() {
      const msgstyle = {
         margin: 0,
         maxWidth: '10em',
         padding: '0 1rem',
         float: (this.props.index % 2 == 1) ? 'right' : 'left',

      };
      return (
         <p style={msgstyle}>
            <div>{this.props.message}</div>
            <br /><br />
         </p>
      );
   }
}

const createMessage = (message, index) => {
   const liStyles = {
      padding: '2.5rem',
      margin: '0.5rem',
      width: '100%',
   };
   return <div style={liStyles}><ChatMessage message={message.message} timestamp={message.timestamp} index={index} /></div>
};


class ChatMessageHistory extends React.Component {

   render() {
      const { messages } = this.props;
      const ulStyles = {
         listStyle: 'none',
         padding: 0,
      };

      return <ul style={ulStyles}>{messages.map(createMessage)}</ul>;
   }
}

class ChatWindow extends React.Component {

   state = {
      messages: [
         { message: 'Hi Josh', timestamp: 'Tuesday' },
         { message: 'How are you?', timestamp: 'Wednesday' }
      ],
      inputText: ''
   };


   handleSubmit = e => {
      const { messages } = this.state;
      e.preventDefault();
      const nextMessages = messages.concat([{ message: this.state.inputText, timestamp: 'Thursday' }]);
      const nextInputText = '';
      this.setState({ messages: nextMessages, inputText: nextInputText });
   }

   handleChange = e => {
      this.setState({
         inputText: e.target.value
      });
   }

   render() {
      const { messages } = this.state;
      const windowStyles = {
         width: '60%',
         height: '80%',
         margin: '1rem',
         border: 'solid green',
         padding: '0.5rem',
         position: 'fixed',
         float: 'right'
      };

      const formStyles = {
         display: 'flex',
         width: '100%',
         background: 'none',
         border: 'none'
      };

      const inputStyles = {
         flex: '1 auto',
         width: ' 80%',
         padding: '0.5rem',
         font: '1.2rem',
         border: '1px solid green'
      };

      const btnStyles = {
         float: 'right'
      };

      return (
         <div style={windowStyles}>
            <ChatMessageHistory messages={messages} />
            <br />
            <Form style={formStyles} onSubmit={this.handleSubmit}>
               <input style={inputStyles} type="text" onChange={this.handleChange} value={this.state.inputText} />
               <button style={btnStyles}>Send</button>
            </Form>
         </div>
      );
   }
}

export default ChatWindow;