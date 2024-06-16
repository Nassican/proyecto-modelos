'use client';

import { IShift } from '@/interfaces/shift/shift';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useEffect, useState } from 'react';

const TVPage = () => {
  const [connection, setConnection] = useState();
  const [message, setMessage] = useState<IShift>();

  const joinGroup = async (username: string, group: string) => {
    try {
      // initiate a connection ReceiveMessage JoinGroup
      const conn = new HubConnectionBuilder()
        .withUrl('http://localhost:5246/notification')
        .configureLogging(LogLevel.Information)
        .build();

      // set up handler
      conn.on('JoinGroup', (username, msg) => {
        console.log(`msg: ${msg}`);
      });

      conn.on('ReceiveNextShift', (msg) => {
        console.log(msg);
        setMessage(msg);
      });

      await conn.start();
      await conn.invoke('JoinGroup', { username, group });

      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    joinGroup('televisor', 'teves');
  }, []);

  return (
    <div>
      <h1>TV</h1>
      <p>{message?.numShift ?? 'not found'}</p>
    </div>
  );
};

export default TVPage;
