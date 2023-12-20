import React, { Component } from 'react';
import '../styles/Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: '',
      isTyping: false,
    };
  }

  handleSendMessage = async () => {
    const { newMessage, messages } = this.state;
    if (newMessage.trim() !== '') {
      const newChatMessage = {
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString(),
      };

      this.setState({
        messages: [...messages, newChatMessage],
        newMessage: '',
        isTyping: true,
      });

      setTimeout(() => {
        this.setState({ isTyping: false });
      }, 3000);
    }
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSendMessage();
    }
  };

  componentDidUpdate() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  render() {
    const { messages, newMessage, isTyping } = this.state;

    return (
      <div className="chat-container" id="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.sender}`}>
              <span className="message-sender">{message.sender === 'user' ? 'You' : 'Support'}:</span>
              <span>{message.text}</span>
              <span className="message-timestamp">{message.timestamp}</span>
            </div>
          ))}
        </div>
        <div className="typing-animation">
          {isTyping && <span>Support is typing...</span>}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type.."
            value={newMessage}
            onChange={(e) => this.setState({ newMessage: e.target.value })}
            onKeyPress={this.handleKeyPress}
          />
          <button onClick={this.handleSendMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default Chat;
