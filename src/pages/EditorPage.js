import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate,useParams } from "react-router-dom";
import Actions from "../Actions";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";


function EditorPage(props) {
  const socketRef=useRef(null);
  const location=useLocation();
  const reactNavigator=useNavigate();
  const {roomId}=useParams();
  const [clients, setClients] = useState([]);

  const handleErrors=(err)=>{
    console.log("socket error",err);
    toast.error("socket connect failed")
    reactNavigator("/")
  }

  useEffect(()=>{
    const init=async()=>{
      socketRef.current=await initSocket();
      socketRef.current.on('connect_error',(err)=>{handleErrors(err)});
      socketRef.current.on('connect_failed',(err)=>{handleErrors(err)});
      socketRef.current.emit(Actions.JOIN,{
        roomId,
        username:location.state?.username
      })

      //listening for joined event
      socketRef.current.on(Actions.JOINED,({clients,username,socketId})=>{
        if(username!==location.state?.username){
          toast.success(`${username} joined the room`);
          // console.log(`${username} joined the room`);

        }
        setClients(clients);
      })


      //listening for disconnected
      socketRef.current.on(Actions.DISCONNECTED,({socketId,username})=>{
        toast.success(`${username} left the room`);
        setClients((prev)=>{
          return prev.filter(client=>client.socketId!==socketId)
        })
      })
    }
    init();
    return ()=>{
      socketRef.current.disconnect();
      socketRef.current.off(Actions.JOINED);
      socketRef.current.off(Actions.DISCONNECTED);
    }
  },[])



  if(!location.state){
    return <Navigate/>
  }
  return (
    <div>
      <div className="mainWrap">
        <div className="aside">
          <div className="asideInner">
            <div className="logo">
              <img className="logoImage" src="/assets/logo2.jpeg" alt="" />
            </div>
            <h4>Connected</h4>
            <div className="clientsList">
              {clients.map((e) => {
                return <Client key={e.socketId} username={e.username} />;
              })}
            </div>
          </div>
          <button className="btn copyBtn">Copy ROOM ID</button>
          <button className="btn leaveBtn">Leave</button>
        </div>
        <div className="editorWrap">
          <Editor />
        </div>
      </div>
    </div>
  );
}

export default EditorPage;
