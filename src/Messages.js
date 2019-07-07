import {Component} from "react";
import React, { createRef } from "react";

class Messages extends Component {
  state = {
    answer: this.props.answer ? this.props.answer.data.answer[0].answer : '',
    index : 0,
    element: "",
  }

  render() {
    const { messages } = this.props;
    return (
      <div>
        <ul className="Messages-list">
          {messages.map((m,i) => this.renderMessage(m,i))}
        </ul>
      </div>
    );
  } 

  renderMessage(message, i) {
    const {member, text, answer} = message;
    const {currentMember, messages} = this.props;
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
          <li className={"Messages-message"}
          key = {i}
          id= {messages.length-1 === i ? "List" : "not"}>
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