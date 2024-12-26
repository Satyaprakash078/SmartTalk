import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import gptLogo from './assets/chatgpt.svg'
import addBtn from './assets/add-30.png'
import msgIcon from './assets/message.svg'
import homeIcon from './assets/home.svg'
import saveIcon from'./assets/bookmark.svg'
import rocketIcon from './assets/rocket.svg'
import sendBtn from './assets/send.svg'
import userIcon from './assets/user-icon.png'
import chatGptLogo from './assets/chatgptLogo.svg'
import { sendMsgToOpenAi } from './openai';

function App() {
  const msgEnd=useRef();
   const [input, setInput] = useState('');
   const [messages,setMessages] = useState([
    {
      text: "Hello! I'm just a computer program, so I don't have feelings, but I'm here and ready to help you. How can I assist you today?",
      isBot: true
    }
   ])
//auto scroll to end of msgs
   useEffect(()=>{
      msgEnd.current.scrollIntoView();
   },[messages])


   const handleSend=async()=>{
    if (!input) return; // Prevent sending empty messages

    const userMessage = { text: input, isBot: false };
     // Immediately clear the input field
      setInput('');
  // Update messages with user input
    setMessages((prevMessages) => [...prevMessages, userMessage]);

  try {
    // Send the entire conversation history to OpenAI
    const response = await sendMsgToOpenAi([...messages, userMessage]);

    // Append the bot's response to the conversation
    const botMessage = { text: response, isBot: true };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
        console.error("Error communicating with OpenAI:", error);
        // const errorMessage = {
        //   text: "An error occurred while processing your message. Please try again.",
        //   isBot: true,
        // };
       // setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    // Clear input field
    setInput('');
   }
     const handleEnter=async(e)=>{
        if(e.key==='Enter'){
          await handleSend()
        }
     }
     const handleQuery=async(e)=>{
      const text=e.target.value;
      setMessages([
        ...messages,
        {text,isBot:false}
      ])
      const res = await sendMsgToOpenAi(text);
       setMessages([
        ...messages,
        {text:text,isBot:false},
        {text:res,isBot:true},
       ])
     }
  return (
        <div className='App'>
          {/* left side part */}
             <div className='sidebar'>
                  <div className='sideUpper'>
                      <div className='sideUpperTop'> 
                         <img src={gptLogo} alt="Logo" className='logo'/>
                         <span className='brand'>SmartTalk</span>
                       </div>
                        <button className='midBtn' onClick={()=>{window.location.reload()}}>
                            <img src={addBtn}alt='newChat' className='addBtn'/>
                            New Chat
                        </button>
                    

                      <div className='sideUpperBottom'>
                           <button className="query" onClick={handleQuery} value={"What is programming ?"}><img src={msgIcon} alt="query" />What is programming ?</button>
                           <button className="query" onClick={handleQuery} value={"How to use an Api ?"}><img src={msgIcon} alt="query" />How to use an Api ?</button>
                      </div>

                  </div>
                  <div className='sideLower'>
                        <div className="listItems"><img src={homeIcon} alt="Home" className="listItemsImg" />Home</div>
                        <div className="listItems"><img src={saveIcon} alt="Saved" className="listItemsImg" />Saved</div>
                        <div className="listItems"><img src={rocketIcon} alt="Upgrade" className="listItemsImg" />Upgrade to Pro</div>
                  </div>
             </div>
             {/* right side part */}
             <div className='main'>
              {/* where the output will show */}
                  <div className="chats">
                      
                      {
                        messages.map((message,index)=>(
                          <div key={index} className={message.isBot? "chat bot": "chat"}>
                            <img className='chatImg' src={message.isBot? chatGptLogo:userIcon} alt="" />
                            <p className="txt">{message.text} </p>
                          </div>
                        ))
                      }
                    <div ref={msgEnd}/>
                  </div>
                  {/* below user input part */}
                  <div className="chatFooter">
                      <div className="inp">
                          <input type='text' placeholder='Ask anything...'
                           value={input}
                           onKeyDown={handleEnter}
                          onChange={(e)=>setInput(e.target.value)}/>
                          <button className="send" onClick={handleSend}><img src={sendBtn} alt="Send" /></button>
                      </div>
                      <p>SmartTalk may produce inaccurate information about people,facts,place.SmartTalk Jan 20 versionSend</p>
                  </div>
             </div>
             
        </div>

  );
}

export default App;
