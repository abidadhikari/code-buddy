import React, { useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";

function EditorPage(props) {
  const [clients, setClients] = useState([
    { socketId: 1, username: "Abid Ade" },
    { socketId: 2, username: "Abida Ad" },
    { socketId: 3, username: "John DOe" },
  ]);
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
