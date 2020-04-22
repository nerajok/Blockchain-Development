
FSD4 Project by:
Neraj Obla KumarBabu(101275194)

Github link: https://github.com/nerajok/Blockchain-Development/tree/master/FSD4/assignment/
Heroku Link: https://fierce-atoll-00344.herokuapp.com/

How to execute:

Execute the below command in the main assignment folder:
npm start 

CAUTION: There will be a clash in port numbers so terminal might ask to host on port 3001(or any other) press "y". It is recommended to execute using visual studio code. 
If the port of server file is tampered the application may not work. I tried my best to change on the client side but couldn't. So kindly do not alter port numbers on server file.

Go to the server folder and execute:
nodemon server.js

http://localhost:3001/ for Client-side (React). Event and Chat tables have been displayed.
http://localhost:3000/ for the chat application.

Disclaimer:
Some of the UI design for the react side has been taken from an online tutorial so I don't take credits for it.
Although I completely know how it works and also made some minor changes.

Notes for React application:

1.The contents of the tables might not be exact content as shown in the course project document
as some fields such as EventID, PPID, Receiver have not been implemented in the chat application itself.

2.As I was facing "Allow cross origins" problem even after implementing the code provided by Mike during lecture,
The server file has not been split into main and routes, instead made into single file so as to make the server work without fail.
Apologies for making it difficult to read. Aside that, everything has been made in a clean way.


Notes for chat application:

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
2.The ideal way to connect would be give username and click on "connect" button. Since less emphasis has been given on UI design this has not been implemented.
