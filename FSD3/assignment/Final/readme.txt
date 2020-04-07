
How to execute:

Just execute the below command in the main assignment folder:
nodemon app.js 

Notes:

1.The default chatroom is chatroom1. To change click on chatroom1 or chatroom2 buttons.
2.The event logs record username, connected and disconnected status with their timestamp.
3.The chatlogs record the username,messages and chatrooms with their timestamps.
4.To make the evaluation easier, I have added 4 extra buttons.
5."chatlog" button console.logs all the chat history.
6."eventlog" button console.logs all the event history.
7."chatlog chatroom1" button console.logs all the chat history specific to chatroom1.
8."chatlog chatroom2" button console.logs all the chat history specific to chatroom2.
9.Default username is "Anonymous".
10. Online code beautifier from "https://beautifier.io/" has been used to beautify the codes.

Limitations of this project:
1.The chatrooms are only separated at socket level so they are not strictly separated from each other which means that messages from other chatrooms will be visible.
