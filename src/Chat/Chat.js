import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  // setMessage = message => {
  //   this.setState({
  //     messages: [...this.state.messages, {
  //       "text": message,
  //       "role": "CUSTOMER"
  //     }]
  //   })
  // };

  setMessage = (message) => {
    let { messages } = this.state;
    const inputMessage = {
      text: message,
      role: 'CUSTOMER',
    };

    const answerData = answersData.find((answer) =>
      answer.tags.find((tag) => inputMessage.text.includes(tag))
    );

    messages = answerData
      ? messages.concat(inputMessage).concat({
          text: answerData.text,
          role: answerData.role,
        })
      : messages.concat(inputMessage);
    this.setState({
      messages,
    });
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput onInputChanged={this.setMessage} />
      </main>
    );
  }
}

export default Chat;
