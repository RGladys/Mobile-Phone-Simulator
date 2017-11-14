const messagesMethods = (function(){

var userList = [],
    userNames = [],
    userId = "",
    username = "",
    message = $j(".message"),
    messages = $j("#messages"),
    countIcon = $j("#iconMessagesCount"),
    container = $j("#messagesContainer"),
    messagesList = {
      count: {}
    };

//Check my id
function myId(data){
  userId = data.id;
  username = data.name;
};

//Fill the user list with fresh data
function users(data){
  for (i in data){
    if (userNames.indexOf(data[i].name) == -1 && data[i].id != userId){
      messages.append(`
        <div class=message id=${data[i].id}>
          <h2>${data[i].name}</h2>
          <div class="msgCount" id=count_${data[i].id}></div>
        </div>
      `);
      jqElements.messageContainer.append(`
        <div class=messageFull id=messageFull_${data[i].id}>
          <div class=messageName id=messageName_${data[i].id}>
            <h2>${data[i].name}</h2>
          </div>
          <textarea class=messageInput id=messageInput_${data[i].id} maxlength=72></textarea>
          <div class=messageSend id=messageSend_${data[i].id} data=${data[i].id}></div>
          <div class=messageOutput id=messageOutput_${data[i].id}></div>
        </div>
      `);
      //Add info about user
      messagesList.count[`${data[i].id}_count`] = 0;
      messagesList[`${data[i].id}_top`] = 0;
      userList.push(data[i]);
      userNames.push(data[i].name);
    };
  };
};

//Input focus on click
messages.on('click', ".messageInput", function(){
  $j(this).focus()
});

//Open messages
messages.on("click", ".message", function(){
  stateMap.layer = 1;
  messagesList.count[`${$j(this).attr("id")}_count`] = 0;
  $j(`#messageFull_${$j(this).attr("id")}`).css("display", "block");
  $j(".messageInput").focus();
  //Reset notifications
  $j(`#count_${$j(this).attr("id")}`).css("display", "none");
  var count = 0;
  for (var i in messagesList.count){
    count += messagesList.count[i]
  };
  if (!count){
    jqElements.barMsg.css("display", "none");
    countIcon.text(count);
    countIcon.css("display", "none")
  }
});

//Send messages
messages.on("click", ".messageSend", function(){
  var adressId = $j(this).attr("data");
  var message = $j(`#messageInput_${$j(this).attr("data")}`).val();
  if (message.trim().length) {
    if (message.length > 18 && message.length <= 36) {
      message = message.slice(0,18) + "<br>" + message.slice(18);
      messagesList[`${$j(this).attr("data")}_top`] -= 68
    } else if (message.length > 36 && message.length <= 54){
      message = message.slice(0,18) + "<br>" + message.slice(18, 36) + "<br>" + message.slice(36);
      messagesList[`${$j(this).attr("data")}_top`] -= 98
    } else if (message.length > 54){
      message = message.slice(0,18) + "<br>" + message.slice(18, 36) + "<br>" + message.slice(36, 54) + "<br>" + message.slice(54);
      messagesList[`${$j(this).attr("data")}_top`] -= 128
    } else {
      messagesList[`${$j(this).attr("data")}_top`] -= 38;
    };
  };

  //Send a message object to a server
  if (message.trim().length){
    socket.emit("message", {
      message: message,
      receiver: adressId,
      giver: userId,
      giverName: username
    });

    //Automatically append the message sent from client
    $j(`#messageOutput_${$j(this).attr("data")}`).append(`
      <p class=messageGiven>${message}</p>
      `);
    $j(`#messageInput_${$j(this).attr("data")}`).val("");

    if (messagesList[`${$j(this).attr("data")}_top`] <= -360){
      $j(`#messageOutput_${$j(this).attr("data")}`).css("top", `${messagesList[`${$j(this).attr("data")}_top`] + 358}px`);
    };
  };
});

//Recieve messages
function receive(data){

  //Append received messages
  $j(`#messageOutput_${data.giver}`).append(`
    <p class=messageReceived>${data.message}</p>
  `);
  if (data.message.length > 18 && data.message.length <= 36) {
    messagesList[`${data.giver}_top`] -= 68
  } else if (data.message.length > 36 && data.message.length <= 54){
    messagesList[`${data.giver}_top`] -= 98
  } else if (data.message.length > 54){
    messagesList[`${data.giver}_top`] -= 128
  } else {
    messagesList[`${data.giver}_top`] -= 38;
  };
  if (messagesList[`${data.giver}_top`] <= -360){
    $j(`#messageOutput_${data.giver}`).css("top", `${messagesList[`${data.giver}_top`] + 358}px`);
  };

  $j(`#${data.giver}`).remove();
  container.after(`
    <div class=message id=${data.giver}>
      <h2>${data.giverName}</h2>
      <div class="msgCount" id=count_${data.giver}></div>
    </div>
  `);

  //Notify
  if ($j(`#messageFull_${data.giver}`).css("display") == "none"){
    messagesList.count[`${data.giver}_count`]++;
    $j(`#count_${data.giver}`).css("display", "block");
    $j(`#count_${data.giver}`).text(messagesList.count[`${data.giver}_count`]);
    jqElements.barMsg.css("display", "block");
    var count = 0;
    for (var i in messagesList.count){
      count += messagesList.count[i]
    };
    countIcon.text(count);
    countIcon.css("display", "block");
    if (!stateMap.on) {
			jqElements.start.css("display", "block");
			jqElements.bar.css("display", "block");
			stateMap.on = true
		};
    ringSound.play();
  }
};

//Return object
return {
  myId,
  users,
  receive,
  messagesList
}
})()
