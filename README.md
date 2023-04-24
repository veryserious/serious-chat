A chatting application using websockets

# Chatting Application

## Functional Requirements

- Group Messaging
- Sent, Delivered and Read status
- Typing status
- Message history
- Message search
- Online status
- Offline status
- Last seen
- Image sharing
- Chats are temporary

## System Design

### Backend

The backend is a simple Node.js application which uses the `ws` module to create a websocket server. The server listens on port 3000 and has a single endpoint `/chat`. The server also has a single event handler for the `connection` event. The handler is used to handle the connection event and send the message to all the connected clients.

### Frontend

The frontend is a simple HTML page with a text input and a button. The text input is used to enter the message and the button is used to send the message. The frontend also has a div element which is used to display the messages.
