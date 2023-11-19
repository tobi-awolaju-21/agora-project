//plugin code for audio call
//function(instance, properties, context) {
    // Get the HTML element with the ID "AgoraCallView"
    var container = document.getElementById("AgoraCallView");
    
    // Check if the container element exists
    if (container) {
      // Create a new div element
      var divElement = document.createElement("div");
      divElement.innerHTML = `
          <!-- Include CSS stylesheets and JavaScript files here -->
          <link rel="stylesheet" type="text/css" href="//meta-l.cdn.bubble.io/f1698170748811x403525400821316500/style.css">
          
          <div class="headbar">
              <p style="font-weight: bold;">Space title</p>
              <div>
                  <button id="join" style="border-radius: 10px; background-color: rgb(255, 255, 255); border-color: rgb(0, 0, 0); color: rgb(0, 0, 0); padding: 8px; margin-left: 10px;">Join call</button>
                  <button id="leave" style="border-radius: 10px; background-color: rgb(0, 0, 0); border-color: rgb(0, 0, 0); color: white; padding: 8px;">Leave quietly</button>
              </div>
          </div>
  
          <center>
              <div class="side">Speakers (3)</div>
              <div class="hosts"></div>
              <br>
              <br>
              <div class="side">Audience(22)</div>
              <div class="audience"></div>
          </center>
  
          <div class="footbar" style="position: fixed; bottom: 8px; left: 8px; right: 8px;">
              <div>
                  <button style="border-radius: 10px; background-color: rgb(255, 255, 255); border-color: rgb(0, 0, 0); color: rgb(0, 0, 0); padding: 8px;">Invite people</button>
                  <button style="border-radius: 10px; background-color: rgb(255, 255, 255); border-color: rgb(0, 0, 0); color: rgb(0, 0, 0); padding: 8px;">Raise Plam👋</button>
              </div>
              <button id="togglePopup" style="border-radius: 10px; background-color: rgb(255, 255, 255); border-color: rgb(0, 0, 0); color: rgb(0, 0, 0); padding: 8px;">Chat</button>
              <div id="message"></div>
              <div class="popup-container" id="chatPopup">
                  <div class="chat-messages" id="chatMessages"></div>
                  <input type="text" id="messageInput" class="messageInput" placeholder="Message...">
                  <button id="sendMessage" class="sendMessage">Send</button>
              </div>
          </div>
  
  
   
   `;
  
      // Append the divElement to the container
      container.appendChild(divElement);
    }
      // start of test js
  
     //end of test js
      // start of real js
     // var room_name =properties.room_name;
     // var api_key =properties.api_key;
     var room_name ="deyplway"
      var api_key ="1220131dc0434406a1462622e90a13af";

  
  let options = 
  {
      // Pass your App ID here.
      appId: api_key,
      // Set the channel name.
      channel: room_name,
      // Pass your temp token here.
      token: null,
      // Set the user ID.
      uid: null,
  };
  
  let channelParameters =
  {
    // A variable to hold a local audio track.
    localAudioTrack: null,
    // A variable to hold a remote audio track.
    remoteAudioTrack: null,
      // A variable to hold the remote user id.
    remoteUid: null,
  };
      
  async function startBasicCall()
  {
      
    // Create an instance of the Agora Engine
    const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp9" });
    
    // Listen for the "user-published" event to retrieve an AgoraRTCRemoteUser object.
    agoraEngine.on("user-published", async (user, mediaType) =>
    {
      // Subscribe to the remote user when the SDK triggers the "user-published" event.
      await agoraEngine.subscribe(user, mediaType);
      console.log("subscribe success");
   ;   addView("audience", user.uid,user.uid);
  
  
      // Subscribe and play the remote audio track.
      if (mediaType == "audio")
      {
        channelParameters.remoteUid=user.uid;
        // Get the RemoteAudioTrack object from the AgoraRTCRemoteUser object.
        channelParameters.remoteAudioTrack = user.audioTrack;
        // Play the remote audio track. 
        channelParameters.remoteAudioTrack.play();
        showMessage("Remote user connected: " + user.uid);
      }
  
      // Listen for the "user-unpublished" event.
      agoraEngine.on("user-unpublished", user =>
      {
        console.log(user.uid + "has left the channel");
        //change this to a sync firebase shii in the future
        removeView("audience", user.uid);
        showMessage(user.uid + "has left the channel");
      });
    });
  
      
  function rest()
    {
      
      
      
      // Listen to the Join button click event.
      document.getElementById("join").onclick = async function ()
      {
        // Join a channel.
        await agoraEngine.join(options.appId, options.channel, options.token, options.uid);
        showMessage("Joined channel: " + options.channel);
        // Create a local audio track from the microphone audio.
        channelParameters.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        // Publish the local audio track in the channel.
        await agoraEngine.publish(channelParameters.localAudioTrack);
        console.log("Publish success!");
        addView("hosts", "Host","Host");
      }
      
      // Listen to the Leave button click event.
      document.getElementById('leave').onclick = async function ()
      {
        // Destroy the local audio track.
        channelParameters.localAudioTrack.close();
        // Leave the channel
        await agoraEngine.leave();
        console.log("You left the channel");
        // Refresh the page for reuse
        window.location.reload();
      }
    }
  rest();
  
  }
  
  
  //this function updates our Ui
  function showMessage(text){
    document.getElementById("message").textContent = text;
  }
  
  
  //add view
  function addView(targetView, Id, Name) {
    // Find the target div with the class "audience"
    const audienceDiv = document.querySelector('.' + targetView);
  
    // Create a new div element for the view
    const viewDiv = document.createElement("div");
  
    // Generate a unique ID for the view (you can use a custom logic to generate unique IDs)
    viewDiv.id = Id;
  
    // Add the view HTML to the new div element, including the dynamic "Name" parameter
    viewDiv.innerHTML = `
   
    <div class="avater">
              <div class="pipe">
                  <img src="//meta-l.cdn.bubble.io/f1698170544634x509769180938128900/images.jpg" style="width: 50px; height: 50px; border-radius:50%;">
                  
                  <div class="hand" style="margin-top: 30px; margin-left: -10px; opacity: 100%;">Ã°Å¸â€“Â</div>
              </div>
              <div style="color: gray;">${Name}</div>
          </div>
  `;
  
  // Append the new view div to the "audience" div
    audienceDiv.appendChild(viewDiv);
  
    return viewDiv; // Return the view div for future reference
  }
  
      
  function removeView(targetView, Id) {
    // Find the target div with the class "audience"
    const audienceDiv = document.querySelector(".audience");
  
    // Find the view div with the specified unique ID
    const viewToRemove = document.getElementById(Id);
  
    if (viewToRemove) {
        // If the view exists, remove it from the "audience" div
        audienceDiv.removeChild(viewToRemove);
    } else {
        console.error("View not found:", Id);
    }
  }
      
  startBasicCall();
  
      
      //end of real js
//}
