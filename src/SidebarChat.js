import React ,{ useEffect ,useState } from 'react' ;
import {Avatar} from "@material-ui/core" ;
import "./SidebarChat.css"
import db from "./firebase"
import {Link} from "react-router-dom";
import './SidebarChat.css';

function SidebarChat( {id, name, addNewChat}) {

    const [messages, setMessages] = useState("");

    
    useEffect(() => {
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot((snapshot) => (
                 setMessages(snapshot.docs.map((doc) => doc.data()))
            ))
        }
    }, [id]);


    //to create new chart room

    const createChat = () => {
        const roomName =prompt("please enter name for chat");
        
        if(roomName)
        {
            db.collection('rooms').add({
                name:roomName,
            });            
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar src = {`https://avatars.dicebear.com/api/bottts/${name}.svg`} />
            <div className="Sidebarchat_info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
    ) : (

    <div onClick={createChat} className="sidebarChat">
        <h2>Add New Chat</h2>

    </div>
    )
}

export default SidebarChat
