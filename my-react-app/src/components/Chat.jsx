import { useState, useEffect } from "react";

const ChatApp = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [chatList, setChatList] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");

    useEffect(() => {
        fetchChatList();
    }, []);

    useEffect(() => {
        if (selectedChat) {
            const interval = setInterval(() => fetchMessages(selectedChat), 5000);
            return () => clearInterval(interval);
        }
    }, [selectedChat]);

    const fetchChatList = async () => {
        const response = await fetch("http://localhost:5000/api/messages/chats", {
            method: "GET",
            headers: { "auth-token": localStorage.getItem("token") }
        });
        const data = await response.json();
        if (data.success) setChatList(data.chats);
    };

    const searchUsers = async () => {
        const response = await fetch(`http://localhost:5000/api/messages/search?query=${searchQuery}`, {
            method: "GET",
            headers: { "auth-token": localStorage.getItem("token") }
        });
        const data = await response.json();
        if (data.success) setSearchResults(data.users);
    };

    const startChat = async (user) => {
        const response = await fetch("http://localhost:5000/api/messages/start", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token") 
            },
            body: JSON.stringify({ receiverId: user._id })
        });
        const data = await response.json();
        if (data.success) fetchChatList();
    };

    const fetchMessages = async (chat) => {
        setSelectedChat(chat);
        const response = await fetch(`http://localhost:5000/api/messages/fetch/${chat._id}`, {
            method: "GET",
            headers: { "auth-token": localStorage.getItem("token") }
        });
        const data = await response.json();
        
        if (data.success) {
            const userId = localStorage.getItem("userId");
            setMessages(data.messages.map(msg => ({
                ...msg,
                isMe: msg.senderId === userId // Determine sender correctly
            })));
        }
    };

    const sendMessage = async () => {
        if (!messageInput.trim()) return;

        const response = await fetch("http://localhost:5000/api/messages/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token") 
            },
            body: JSON.stringify({ receiverId: selectedChat._id, message: messageInput })
        });

        const data = await response.json();
        if (data.success) {
            setMessages(prevMessages => [
                ...prevMessages,
                { senderId: localStorage.getItem("userId"), message: messageInput, isMe: true }
            ]);
            setMessageInput("");
        }
    };

    const handleMessageChange = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevents adding a new line in the input field
            sendMessage();
        } else {
            setMessageInput(e.target.value);
        }
    };

    return (
        <div className="flex h-screen bg-blue-100">
            <div className="w-1/3 bg-white shadow-lg p-4">
                <h2 className="text-blue-600 text-xl font-semibold mb-3">Chat</h2>
                <input
                    type="text"
                    placeholder="Search user..."
                    className="w-full p-2 border rounded-lg focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={searchUsers} className="w-full mt-2 p-2 bg-blue-600 text-white rounded-lg">Search</button>
                <ul className="mt-2">
                    {searchResults.map((user) => (
                        <li key={user._id} className="p-2 cursor-pointer hover:bg-blue-200 rounded-lg flex justify-between">
                            {user.name}
                            <button onClick={() => startChat(user)} className="bg-green-500 text-white px-2 py-1 rounded">Chat</button>
                        </li>
                    ))}
                </ul>
                <h3 className="mt-4 text-blue-600 text-lg">Chats</h3>
                <ul>
                    {chatList.map((chat) => (
                        <li
                            key={chat._id}
                            className="p-2 cursor-pointer hover:bg-blue-200 rounded-lg"
                            onClick={() => fetchMessages(chat)}
                        >
                            {chat.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-2/3 flex flex-col bg-white shadow-lg p-4">
                {selectedChat ? (
                    <>
                        <h3 className="text-blue-600 text-xl font-semibold">Chat with {selectedChat.name}</h3>
                        <div className="flex-1 overflow-y-auto p-4">
                            {messages.map((msg, index) => (
                                <p
                                    key={index}
                                    className={`p-2 my-1 rounded-lg max-w-xs ${msg.isMe ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black mr-auto"}`}
                                >
                                    {msg.message}
                                </p>
                            ))}
                        </div>
                        <div className="flex p-2 border-t">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 p-2 border rounded-lg focus:outline-none"
                                value={messageInput}
                                onChange={handleMessageChange}
                                onKeyDown={handleMessageChange} 
                            />
                            <button onClick={sendMessage} className="ml-2 p-2 bg-blue-600 text-white rounded-lg">Send</button>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-500">Select a chat to start messaging</p>
                )}
            </div>
        </div>
    );
};

export default ChatApp;
