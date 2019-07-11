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
    answer : null,
    messages: [
      {
        text: "",
        member: {
          color: "blue",
          username: "bluemoon"
        },
        answer: 'Halo, Apakah ada yang bisa saya bantu ? \n Anda bisa langsung menanyakanya pada saya. \n Mungkin anda ingin mencari tahu tentang : \n 1. Penerimaan Mahasiswa Baru \n 2. Program studi yang diselenggarakan \n 3. Biaya pendaftaran \n 4. Link Brosur ',
      }
    ],
    member: {
      username: randomName(),
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
    const { answer } = this.state
    const messages = this.state.messages
    const question = this.state.question
    const toShort = "Pertanyaan anda terlalu pendek, mohon perjelas minimal 2 kata. terima kasih"
    await this.handleAnswer(message)
    console.log('answering',(message.split(' ')).length)
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
