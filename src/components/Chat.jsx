import React, { Fragment } from 'react';
import { useParams } from 'react-router';

const Chat = () => {
  const {room_id, room_name} = useParams();

  
  return (
    <Fragment>
      <div>
        {room_id}
      </div>
      <div>{room_name}</div>
    </Fragment>
  )
}

export default Chat
