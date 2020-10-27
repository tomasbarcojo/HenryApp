import Axios from 'axios'
import axios from 'axios'
import {ADD_NEWMSG,GET_CHATS,GET_MSG,DELETE_MSGS, EDIT_CHAT,EDIT_VALIDATE, ADD_MSGSOCKET, ADD_CHATSOCKET,ADD_CHATNOT,REMOVE_CHATNOT} from '../consts/actionTypes'
import socket from '../../components/msg/Socket'

export function addMsg(data,token){
    
    return async function(dispatch){
        try {
            const newMsg = await axios({
                method: 'POST',
                url:`http://localhost:3001/msg`,
                data:data,
                credentials: "include",
                headers: {
                    "auth-token": token,
                },
            })
            data['updatedAt'] = newMsg.data.updatedAt;
            data['chatBack'] = newMsg.data
            localStorage.setItem('chat',JSON.stringify({from:data.from,to:data.to,id:data.chatBack.id}));
            socket.emit('sendChat',{from:data.from,to:data.to,id:data.chatBack.id}) 
            return dispatch({
                type: ADD_NEWMSG,
                payload: data
            })
        }       
        catch(err) {console.log(err)}
        
        
    }
}
export function addSocket(data){
    
    return async function(dispatch){       
        return dispatch({
            type: ADD_MSGSOCKET,
            payload: data
        })    
    }
}

export function getChats(token){
    return async function (dispatch){
        try{
            const chats = await Axios({
                method:'GET',
                url:`http://localhost:3001/msg/chat`,
                credentials:'include',
                headers:{
                    'auth-token':token
                }
            })
            return dispatch ({
                type:GET_CHATS,
                payload:chats.data
            })
        }
        catch(err) {console.log(err)}
        
    }
}

export function getMsg (chatId,token){
    return async function (dispatch){
        try{
            const allMsg = await Axios({
                method:'GET',
                url:`http://localhost:3001/msg/${chatId}`,
                credentials:'include',
                headers:{
                    'auth-token':token
                }
            });
            
            return dispatch ({
                type:GET_MSG,
                payload:allMsg.data
            })
        }catch (err){
            console.log(err)
        }
    }
}
export function editChat (id,token){
    return async function(dispatch){
        try{
            const chat = await Axios({
                method:'PUT',
                url:`http://localhost:3001/msg/chat/${id}`,
                credentials:'include',
                headers:{
                    'auth-token':token
                }
            })
            return dispatch ({
                type:EDIT_CHAT,
                payload:chat.data.id
            })
        }catch(err){
            console.log(err)
        }
    }
}
export function deleteMsgs (){
    return function (dispatch){
        return dispatch ({
            type:DELETE_MSGS,
        })
    }
}

export function editValidate (){
    return function (dispatch){
        return dispatch({
            type:EDIT_VALIDATE
        })
    }
}

export function addChatSocket (chat) {
    return function (dispatch){
        return dispatch({
            type:ADD_CHATSOCKET,
            payload:chat
        })
    }
}

export function addChatNot (chat) {
    return function (dispatch){
        return dispatch({
            type:ADD_CHATNOT,
            payload:chat
        })
    }
}

export function removeChatNot (chat){
    return function(dispatch){
        return dispatch({
            type:REMOVE_CHATNOT,
            payload:chat
        })
    }
}

