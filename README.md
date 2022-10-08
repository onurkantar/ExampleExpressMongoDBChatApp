
# Example Express & MongoDB Chat App

The video is based on the topics covered during the training. 

Course:
Learning Node.js
By: Alexander Zanfir


## API Usage

#### Fetch all messages

```http
  GET /messages
```


#### Fetch messages from a specific person

```http
  GET /messages/${name}
```

| Parameter | Type     | Explanation                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | Name of the owner of the messages |

#### Fetch messages from a specific person

```http
  POST /messages
```
#### **Recieves Message Object as body




  
## Message Object

```javascript
var Message = mongoose.model("Message", {
  name: String,
  message: String,
});
```

  
## Installation 

To run the project, please run the commands below

```bash 
  npm install 

  nodemon server.js
```
    
## Tech Stack

**Web Page:** Bootstrap

**Server:** Node, Express

**Database:** MongoDB

  
## Tests

To run tests please run the specified command below

```bash
  npm test
```

  