import React, { createContext, useState } from 'react'

const ChatContext = createContext();


export  function ChatProvider({children}) {
  const [userTochat , setuserTochat] = useState([]);
  const [checkLogo , setChecklogo] = useState(true);
  const [checkSinglechat , setCheckSingleChat] = useState(false);
  const [createGrp , setCreategrp]  = useState(false);
  
  return (
    <>
      <ChatContext.Provider value={{setuserTochat , userTochat , checkLogo , setChecklogo , checkSinglechat , setCheckSingleChat , createGrp , setCreategrp}}>
        {children}
      </ChatContext.Provider>
    </>
  )
}
export default ChatContext;
