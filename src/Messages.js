import {Component} from "react";
import React from "react";

class Messages extends Component {
  state = {
    answer: this.props.answer ? this.props.answer.data.answer[0].answer : ''
  }
  render() {
    const { messages } = this.props;
    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  } 

  renderMessage(message) {
    const {member, text, answer} = message;
    const {currentMember} = this.props;
    const messageFromMe = member.id === currentMember.id;
    const test = "aa \n aaa"
    const className = messageFromMe ?
      "Messages-message currentMember" : "Messages-message";
    return (
      <div>
        {
          text ?
          <li className={className}>
              <span
                className="avatar"
                style={{backgroundColor: member.color}}
              />
              <div className="Message-content">
              <div className="username">
                  You
              </div>
              <div className="text">{text}</div>
              </div>
          </li> : null
        }
        {
          answer ?
          <li className={"Messages-message"}>
              <span
                  className="avatar"
                  style={{backgroundColor: "red"}}
              />
              <div className="Message-content">
                  <div className="username">
                    Atma Bot
                  </div>
                  <div className="text">
                    <p className="text"> { answer } </p>
                  </div>
              </div>
          </li> : null
        }
      </div>
    );
  }

}

export default Messages;