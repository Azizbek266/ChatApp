import React, { Component } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import "./styles/style.css";

class Chat extends Component {
  static contextType = ChatContext;

  constructor(props) {
    super(props);
    this.state = { time: new Date() };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: new Date(),
    }); 
  }

  render() {    
    const { data } = this.context;

    if ( data.user?.displayName == null) {
      return <div className="chat">
      <div className="chatInfo">
        <div className="infor">
        <img className='IMGUSER' alt=""
          src={data.user?.photoURL} />
        <span className="dispname">{data.user?.displayName}</span>
        </div>
        <div className="chatIcons">
          <span className="logo">
            <h2 className="time">
              {this.state.time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                second: "2-digit",
              })}
            </h2>
          </span>
        </div>
      </div>
      <div className="messages">
           <div className="dont">
            Do'stingizni tanlang!
           </div>
    </div>
    <div className="input">
              
    </div>
      </div>
    } else {
      return (
        <div className="chat">
          <div className="chatInfo">
            <div className="infor">
            <img className='IMGUSER'alt=""
              src={data.user?.photoURL} />
            <span className="dispname">{data.user?.displayName}</span>
            </div>
            <div className="chatIcons">
              <span className="logo">
                <h2 className="time">
                  {this.state.time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                    second: "2-digit",
                  })}
                </h2>
              </span>
            </div>
          </div>
          <Messages />
          <Input />
        </div>
      );
    }


  }
}

export default Chat;
