import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const navigate=useNavigate();
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Created a new room");
  };

  const joinRoom = () => {
      if(!roomId || !username){
          toast.error("ROOM ID and username is required");
          return;
      }
      navigate(`/editor/${roomId}`,{
          state:{
              username
          }
      })
  };
  const handleInputEnter=(e)=>{
      if(e.code==='Enter'){
          joinRoom();
      }
  }

  return (
    <div>
      <div className="homePageWrapper">
        <div className="formWrapper">
          <img
            className="homePageLogo"
            src="/assets/logo2.jpeg"
            alt="Code Buddy Logo"
          />
          <h4 className="mailLabel">Paste Invitation ROOM ID</h4>
          <div className="inputGroup">
            <input
              type="text"
              className="inputBox"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="ROOM ID"
              onKeyUp={handleInputEnter}
            />
            <input
              type="text"
              className="inputBox"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyUp={handleInputEnter}
            />
            <button className="btn joinBtn" onClick={joinRoom}>
              Join
            </button>
            <span className="createInfo">
              If you don't have an invite then create &nbsp;{" "}
              <a href="#id" className="createNewBtn" onClick={createNewRoom}>
                new room
              </a>
            </span>
          </div>
        </div>
        <footer>
          <h4>
            Built With 💛 &nbsp;by <a href="#abid">Abid Adhikari</a>{" "}
          </h4>
        </footer>
      </div>
    </div>
  );
}

export default Home;
