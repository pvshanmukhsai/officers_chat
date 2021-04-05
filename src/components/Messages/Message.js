import React from 'react';
import moment from 'moment';
import {Comment,Image} from 'semantic-ui-react';

const isOwnMessage = (message,user) => {
    return message.user.id === user.uid ? 'message__self' : ''
}

const timeFromNow = timestamp => moment(timestamp).fromNow();

const isImage=(message)=>{return message.hasOwnProperty('image')&&!message.hasOwnProperty('content')}

const Message = ({ message, user }) => {
    return (
        <Comment>
            <Comment.Avatar src={message.user.avatar} />
            <Comment.Content className={isOwnMessage(message,user)}>
                <Comment.Author as='a'>{message.user.name}</Comment.Author>
                <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
                
                { isImage(message) ? <Image src={message.image} className="message__image" /> :
                    <Comment.Content>{message.content}</Comment.Content>
                }
            </Comment.Content>
        </Comment>
    );
}

export default Message;