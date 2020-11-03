import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  handleClick = () => {
    this.props.onInputChanged(this.state.inputText);
    this.setState({
      inputText: '',
    });
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleClick();
    }
  };

  render() {
    return (
      <footer className="ChatInput">
        <input
          type="text"
          value={this.state.inputText}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        <button type="button" onClick={this.handleClick}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
