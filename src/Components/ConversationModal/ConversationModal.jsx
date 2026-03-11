import { Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { imageUrl } from "../../redux/api/baseApi";

const ChatBubble = ({ message, getConversation, senderId }) => {
  // console.log(message);
  const isSelf = senderId === message?.senderId;

  return (
    <div
      className={`flex items-start space-x-2 ${
        isSelf ? "flex-row-reverse text-right" : ""
      } mb-4`}
    >
      {isSelf ? (
        <img
          src={`${imageUrl}${getConversation?.data?.participants?.sender?.details?.profile_image}`}
          size="large"
          className={
            isSelf
              ? "ml-2 h-10 w-10 rounded-full"
              : "mr-2 h-10 w-10 rounded-full"
          }
        />
      ) : (
        <img
          src={`${imageUrl}${getConversation?.data?.participants?.receiver?.details?.profile_image}`}
          size="large"
          className={"mr-2 h-10 w-10 rounded-full"}
        />
      )}

      <div
        className={`flex flex-col max-w-xs ${
          isSelf ? "bg-black text-white" : "bg-[#5C5C5C] text-white"
        } p-3 rounded-lg`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
        <span className={`text-xs ${isSelf ? "text-gray-400" : "text-white"}`}>
          {message.time}
        </span>
      </div>
    </div>
  );
};

const ConversationModal = ({
  openConversationModal,
  setOpenConversationModal,
  getConversation,
  senderId,
  setConversationIds,
}) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Sync initial messages from API data
  useEffect(() => {
    if (getConversation?.data?.conversation?.messages) {
      setMessages([...getConversation.data.conversation.messages].reverse());
    }
  }, [getConversation]);

  // Connect socket and listen for realtime messages
  useEffect(() => {
    if (!openConversationModal || !senderId) return;

    const socket = io("https://backend.xmoveit.com/", {
      query: { id: senderId, role: "ADMIN" },
      transports: ["websocket"],
    });

    socket.on(`new-message/${senderId}`, (newMsg) => {
      setMessages((prev) => {
        const exists = prev.some((m) => m._id === newMsg._id || m.id === newMsg._id);
        if (exists) return prev;
        return [...prev, newMsg];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [openConversationModal, senderId]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <Modal
        onCancel={() => {
          setOpenConversationModal(false);
          setMessages([]);
          // setConversationIds({})
        }}
        open={openConversationModal}
        centered
        footer={false}
        width={800}
      >
        <div className="text-center text-xl font-medium border-b pb-2">
          Conversation Overview
        </div>

        <div className="p-6  mx-auto bg-white rounded-lg space-y-4 max-h-[80vh] overflow-y-auto">
          {messages.map((msg) => (
              <ChatBubble
                key={msg._id || msg.id}
                message={msg}
                getConversation={getConversation}
                senderId={senderId}
              />
            ))}
          <div ref={messagesEndRef} />
        </div>
      </Modal>
    </div>
  );
};

export default ConversationModal;
