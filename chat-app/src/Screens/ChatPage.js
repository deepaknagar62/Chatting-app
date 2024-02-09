import React, { useState } from 'react'
import './Css/chatpage.css'
import pf from './Images/deepak.jpg'
import sendmsg from './Images/sendmsg.png'
import plus from './Images/plusicon.jpg'
import emoji from './Images/emoji.png'
import deep from './Images/deep.jpg'
import user from './Images/user.png'

export default function ChatPage() {
    const [chats, setChats] = useState([
        { id: 1, name: 'Deepak Nagar', messages: ['Hi there!', 'How are you?'], image: pf},
        { id: 2, name: 'Ankit Sharma', messages: ['Hello!', 'I am doing great, thanks!'] , image: deep},
        { id: 3, name: 'Nayan Verma', messages: ['Hey!', 'I have a question for you.'] , image: user},
      ]);
    
      const [selectedChat, setSelectedChat] = useState(null);
      const [messageInput, setMessageInput] = useState('');
    
      const handleChatSelect = (chat) => {
        setSelectedChat(chat);
      };

      const handleMessageChange = (e) => {
        setMessageInput(e.target.value);
      };
    
      const handleSendMessage = () => {
        if (messageInput.trim() !== '') {
          const updatedChats = chats.map(chat => {
            if (chat.id === selectedChat.id) {
              return {
                ...chat,
                messages: [...chat.messages, messageInput]
              };
            }
            return chat;
          });
          setChats(updatedChats);
          setMessageInput('');
        }
      };
    
      return ( 
        <> 
        
        <div className="app">


          <div className="chats">
            <div className='chat-heading1'> 
                <div style={{fontFamily:'cursive',paddingTop:'15px'}}> <h2>Chats</h2> </div>
            </div>
          
            <ul>
              {chats.map(chat => (
                <div className='chat-boxes' style={{marginTop:'-15px'}}> 
                <div > 
                <li key={chat.id} onClick={() => handleChatSelect(chat)}>
                 <div style={{display:'flex'}}> 
                 <div className='chat-img'> <img src={chat.image} alt={chat.name} className="profile-image" /> </div>
                  
                  <div className='chat-names'> {chat.name} </div>
                  </div> 
                </li>
                </div>
                </div>  
              ))}
            </ul>
          
          </div>


          <div className="chat">
            <div className='chat-heading2'> 
            
            <div className='scpf'> 
                {selectedChat && <img src={selectedChat.image} alt="Profile" className="profile-image" />}
            </div>
            <div className='sc-txt'>  <span>{selectedChat ? selectedChat.name : 'Select a Chat'}</span>  </div>
            </div>
            <div className="messages">
              {selectedChat && selectedChat.messages.map((message, index) => (
                <div key={index} className="message">
                  {message}   
                </div>
              ))}
            </div>
            {selectedChat && (
            <footer className='chat-footer'>
              <div className='cf-d'> 
              <div className='cf-icon'> <img src={emoji} alt="send msg"  /></div>
              <div className='cf-icon'> <img src={plus} alt="send msg"  /></div>
              <div className='cf-input'> <input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={handleMessageChange}
              /> </div>
              
              <div className='cf-icon'> <img src={sendmsg} alt="send msg" onClick={handleSendMessage}  /></div>
              
              </div>
            </footer>
          )}
          </div>
        </div>
        </>
      );
}
