import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Messages from "./Messages";
import Input from "./Input";

function randomName() {
  const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App extends Component {
  state = {
    message: '',
    question : [{
      text: '',
    }],
    answer : null,
    coba: "Kau yabg asu",
    messages: [
      {
        text: "This is a test message!",
        member: {
          color: "blue",
          username: "bluemoon"
        },
        answer: '',
      }
    ],
    member: {
      username: randomName(),
      color: randomColor()
    }
  }
  
  async handleAnswer (message) {
    //event.preventDefault()

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
    console.log('answer', this.state.answer)
    return (
      <div className="App">
        <div className="App-header">
          <h1>My Chat App</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
          question={this.state.question.text}
          // answer={this.state.answer}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

  onSendMessage = async (message) => {
    const messages = this.state.messages
    const question = this.state.question
    await this.handleAnswer(message)
    console.log('answering',message)
    messages.push({
      text: message,
      member: this.state.member,
      answer: this.state.answer ? this.state.answer.data.answer[0].answer : ''
    })

    this.setState({
      message: message,
      messages: messages,
      question: question
    })
  }
}

export default App;
