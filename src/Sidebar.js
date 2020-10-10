import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import {Avatar ,IconButton} from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SidebarChat  from "./SidebarChat"
import db from './firebase';
import {useStateValue} from "./StateProvider.js";


function Sidebar(id, name, addNewchat) {

    const [rooms,setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => (
                setRooms(snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            ));

            return() => {
                unsubscribe();
            }
                }, []);

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
                     <h3>Welcome {user.displayName} </h3>

                <div className="sidebar_headerRight">

                     <IconButton>
                        <MoreVertIcon />
                     </IconButton>
                </div>
            </div>

            <div className={`sidebar_search ${ 0 && "sidebar_search1" }`}>
               <div className="sidebar_searchconainer">
                    <SearchOutlined />
                    <input placeholder="Search or Start new chat"  type="text" />
                </div>
            </div>

            <div className="sidebar_chat">
                <SidebarChat addNewChat />
                {rooms.map(room => ( <SidebarChat key= {room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
            
        </div>
    );
}

export default Sidebar;
