"use client";
import { useEffect } from "react";
import io from "socket.io-client";

const SocketComponent = () => {
  useEffect(() => {
    const socket = io();

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default SocketComponent;
