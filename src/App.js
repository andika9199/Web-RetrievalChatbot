import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Messages from "./Messages";
import Input from "./Input";

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App extends Component {
  state = {
    message: '',
    answer : null,
    messages: [
      {
        text: "",
        member: {
          color: "blue",
          username: "bluemoon"
        },
        answer: 'Halo, Apakah ada yang bisa saya bantu ? \n Anda bisa langsung menanyakanya pada saya. \n Mungkin anda ingin mencari tahu tentang : \n -Penerimaan Mahasiswa Baru \n -Program studi yang diselenggarakan \n -Biaya pendaftaran \n -Link Brosur ',
      }
    ],
    member: {
      color: randomColor()
    },
  }

  componentDidUpdate() {
    // const { element } = this.state
    const element = document.getElementById("List");
    console.log(element)
    if (element) {
      element.scrollIntoView();
      console.log("masuk")
    }
  }

  async handleAnswer (message) {
    const question = {
      pertanyaan: message,
    }
    await axios.post(`https://webservice-retrievalchatbot.herokuapp.com/input/task`, question  )
      .then(res=> {
        this.setState({
          answer: res
        })
      })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Atma Jaya Chatbot</h1>
        </div>
        <div className="Message-container">
          <Messages
            messages={this.state.messages}
            currentMember={this.state.member}
          />
          <Input className="Input-Container"
            onSendMessage={this.onSendMessage}
          />
        </div>
      </div>
    );
  }

  onSendMessage = async (message) => {
    const messages = this.state.messages
    const question = this.state.question
    const toShort = "Pertanyaan anda terlalu pendek, mohon perjelas minimal 2 kata. terima kasih"
    await this.handleAnswer(message)
    if ((message.split(' ')).length == 1 ) {
      messages.push({
        text: message,
        member: this.state.member,
        answer: this.state.answer.data.answer[0].score == 3 ? this.state.answer.data.answer[0].answer : toShort
      })
    }
    else {
      messages.push({
        text: message,
        member: this.state.member,
        answer: this.state.answer ? this.state.answer.data.answer[0].answer : ''
      })
    }
    
    this.setState({
      message: message,
      messages: messages,
      question: question
    })
  }
}

export default App;
