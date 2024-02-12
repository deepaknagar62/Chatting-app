import React, { useEffect, useState } from 'react'
import './Css/chatpage.css'
import pf from './Images/deepak.jpg'
import sendmsg from './Images/sendmsg.png'
import plus from './Images/plusicon.jpg'
import emoji from './Images/emoji.png'
import deep from './Images/deep.jpg'
import user from './Images/user.png'
import { useUser } from '../Components/UserProvider'
import axios from 'axios'
import { io } from 'socket.io-client';


export default function ChatPage({UserProvider}) {
    const [chats, setChats] = useState([]);
    const {userData} = useUser();
     
    const [selectedChat, setSelectedChat] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const[conversationID , setconversationID] = useState('')
    const[recieverID , setrecieverID] = useState('')
    const [messages, setMessages] = useState([]);
    const [incomingMessage, setIncomingMessage] = useState(null);


    
    useEffect(() => {
      async function fetchUsers() {
        try {
          const response = await axios.get('http://localhost:3001/user/getusers');
          
            const updatedChats = response.data.filter(chat => chat._id !== userData.userId).map(chat => ({
              ...chat,
              name: chat.name, 
              _id: chat._id 
            }));
            setChats(updatedChats);
          
          
          
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
      fetchUsers();

    }, []);

      



    useEffect(() => {
      async function fetchMessages() {
        if (!conversationID) return; 
    
        try {
          const response = await axios.get(`http://localhost:3001/message/get/${conversationID}`);
          setMessages(response.data); 

        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    
      fetchMessages();
    }, [conversationID]);

    useEffect(() => {
     
      const socket = io('http://localhost:9000');

    
      socket.emit('addUsers', userData);

     
      socket.on('getUsers', (users) => {
          console.log('Received users:', users);
         
      });

      return () => {
          
          socket.disconnect();
      };
  }, [userData]);

  useEffect(() => {
      
      const socket = io('http://localhost:9000');
      socket.current.on('getMessage' , data =>{
        setIncomingMessage(
          ...data
        )
      })
  }, []);
  
    const handleChatSelect =  async (chat) => {
      setSelectedChat(chat);
       
      setrecieverID(chat._id);

      try {
        const response = await axios.post('http://localhost:3001/conversation/add', {
          senderID: userData.userId, 
          recieverID: chat._id 
        });
        

        if(response.data ==='conversation already exist'){

          try{
            const res = await axios.post('http://localhost:3001/conversation/get', {
              senderID: userData.userId, 
              recieverID: chat._id 
            });

            setconversationID(res.data._id);
            

          }
          catch(error){
            console.log(error);
          }
        }
       
      } catch (error) {
        console.error('Error creating conversation:', error);
      }
    };
  
    const handleMessageChange = (e) => {
      setMessageInput(e.target.value);
    };

  
    const handleSendMessage = async () => {
      const socket = io('http://localhost:9000');
      socket.current.emit('sendMessage',  messageInput); 
 

      try {
        await axios.post('http://localhost:3001/message/add', {
          conversationID: conversationID,
          senderID: userData.userId,
          recieverID: recieverID,
          text: messageInput,
          type: 'text'
        });
        

        setMessageInput('');
        setMessages([...messages, { text: messageInput, senderID: userData.userId }]);

      } catch (error) {
        console.error('Error sending message:', error);
      }
    };
    
      return ( 
        <> 
        
        <div className="app">
      <div className="chats">
        <div className="chat-heading1">
          <div style={{ fontFamily: 'cursive', paddingTop: '15px' }}>
            <h2>Chats</h2>
          </div>
        </div>
        <ul>
         
        {chats.map((chat) => (
            <div className="chat-boxes" style={{ marginTop: '-15px' }} key={chat.id}>
              <div>
                <li onClick={() => handleChatSelect(chat)}>
                  <div style={{ display: 'flex' }}>
                    <div className="chat-img">
                      <img src={pf} alt={chat.name} className="profile-image" />
                    </div>
                    <div className="chat-names">{chat.name}</div>
                  </div>
                </li>
              </div>
            </div>
          ))}
        
        </ul>
      </div>
      <div className="chat">
        <div className="chat-heading2">
          <div className="scpf">{selectedChat && <img src={pf} alt="Profile" className="profile-image" />}</div>
          <div className="sc-txt">
            <span>{selectedChat ? selectedChat.name : 'Select a Chat'}</span>
          </div>
        </div>
        <div className="messages">
          
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.senderID === userData.userId ? 'sent' : 'received'}`}
              >
                <span>{msg.text}</span>
              </div>
            ))}
                    
        </div>
        {selectedChat && (
          <footer className="chat-footer">
            <div className="cf-d">
              <div className="cf-icon">
                <img src={emoji} alt="send msg" />
              </div>
              <div className="cf-icon">
                <img src={plus} alt="send msg" />
              </div>
              <div className="cf-input">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={handleMessageChange}
                />
              </div>
              <div className="cf-icon">
                <img src={sendmsg} alt="send msg" onClick={handleSendMessage} />
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
        </>
      );
}
