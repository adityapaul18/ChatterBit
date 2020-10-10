import React ,{ useEffect ,useState } from 'react' ;
import {Avatar ,IconButton} from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from './firebase';
import { useStateValue } from "./StateProvider.js";
import firebase from "firebase";



function Chat() {

    const [seed, setSeed] = useState("");
    const [ input, setInput] =useState("");
    const { roomId } = useParams();
    const [ roomName, setRoomName] =useState("");
    const [ messages, setMessages] =useState([]);
    const [{ user }, dispatch] = useStateValue();
    // const [{ num }, dispatch] = useStateValue();
    useEffect( () =>{
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ));
        }
    },[roomId])

    useEffect(() => {
       setSeed(Math.floor(Math.random()*5000))
    }, [roomId]);


    const sendMessage = (e) => {
        e.preventDefault();
        console.log("you just sent the message >>>  ", input);
        
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    };


    return (
        <div className="chat">
            <div className="chat_header">
            <Avatar src = {`https://avatars.dicebear.com/api/bottts/${roomName}.svg`} />
            <div className="chat_headerinfo">
                <b><h3>{roomName}</h3></b>
                <p>last seen {" "}{new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
            </div>

            <div className="chat_headerRight">
                    {/* <IconButton>
                         <SearchOutlined />
                    </IconButton> */}
                    <IconButton>
                         <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
            </div>
            </div>
            <div className="chat_body">
                {messages.map((message) => (
                   <p className={`chat_messsage ${message.name === user.displayName && "chat_reciever"}`}>
                   <span className="chat_name">{message.name}</span>
                   {message.message}
                   <span className="chat_timestamp">
                    {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
               </p>
                ))}
                
            </div>
            <div className="chat_footer">
            <InsertEmoticon />
            <form>
                <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type A Message" type="text"/>
                <button onClick={sendMessage} type="submit" >Send a message</button>
            </form>
            <MicIcon/>
            </div>            
        </div>
    )
}

export default Chat
