import React, { useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import "../styles/Chat.css"
import useStore from "../Store";
import axios from '../api/axios';

const GET_CHAT_URL = '/chat/chat';

const Chat = ({ essay, toggleAssistant }) => {
  // create state variables 
  const [chats, setChats] = useState([{role: "Assistant", content:"Hi! I am your ai-powered collge counselor! Please ask me any questions you have about my essay suggestions. Only ask questions about the selected response and only ask one question at a time. "},
                                      {role: "Assistant", content:"Sample questions: \"Give me another example of how to implement your suggesiton in my essay.\" or \"I'm confused. Can you explain your suggestion a different way?\""}]);
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Using AI to review your essay...");

  const selectedSuggestion = useStore(state => state.selectedSuggestion);

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    scrollTo(0, 1e10);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    if (essay.split(" ").length > 10 && essay.split(" ").length < 5000) {
        try {
          setIsLoading(true);
    
          const response_get_prompt = await axios.post(GET_CHAT_URL, {
            essay: essay,
            suggestion: selectedSuggestion,
            userResponse: message
          });
    
          msgs.push({ role: "Assistant", content: response_get_prompt.data.response});
          setChats(msgs);
          setIsTyping(false);
          scrollTo(0, 1e10);
        } catch (err) {
          console.log(err);
          // Handle error
        } finally {
          setIsLoading(false);
        }
      }
  };

  const handleExClick = () => {
    toggleAssistant();
  }

  return(
    <div className='chat-container'>
      <div className='chat'>
        <div className='chat-header'>
            <h1>Essay Reviewer Assistant</h1>
            <Button
                type="primary"
                shape="circle"
                icon={<CloseCircleOutlined />}
                className="close-button"
                onClick={handleExClick}
            />
          </div>
            <div className='messages'>
            {chats && chats.length
                ? chats.map((chat, index) => (
                    <p key={index} className={chat.role === "user" ? "user_msg" : "assistant_msg"}>
                    <span>
                        <b>{chat.role.toUpperCase()}</b>
                    </span>
                    <span>:</span>
                    <span>{chat.content}</span>
                    </p>
                ))
                : ""}
            </div>

            <form action="" onSubmit={(e) => chat(e, message)}>
            <input
                type="text"
                name="message"
                className="chat-input"
                value={message}
                placeholder="Type a message here and hit enter..."
                onChange={(e) => setMessage(e.target.value)}
            />
            </form>
          </div>
    </div>
  )
}

export default Chat;
