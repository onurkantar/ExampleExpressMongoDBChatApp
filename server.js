var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var mongoose = require("mongoose");

var dbUrl = "mongodb://localhost:27017/messages";

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var Message = mongoose.model("Message", {
  name: String,
  message: String,
});

app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find({});
    res.send(messages);
  } catch (error) {
    sendStatus(500);
  }
});

app.get("/messages/:user", async (req, res) => {
  try {
    var user = req.params.user;
    const messages = await Message.find({ name: user });
    res.send(messages);
  } catch (error) {
    sendStatus(500);
  }
});

app.post("/messages", async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    const censored = await Message.findOne({ message: "badword" });

    if (censored) {
      await Message.deleteOne({ _id: censored.id });
    } else {
      io.emit("message", req.body);
    }

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    return console.error(error);
  } finally {
    //logger.log("message post called");
  }
});

io.on("connection", (socket) => {
  console.log("User connected");
});

mongoose.connect(dbUrl);

var server = http.listen(3000, () => {
  console.log("Server listening on port ", server.address().port);
});
