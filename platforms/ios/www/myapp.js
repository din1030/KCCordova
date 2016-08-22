document.addEventListener("deviceready", function() {
    console.log("Device is ready");
    StatusBar.overlaysWebView(false);
    StatusBar.backgroundColorByName("red");
});

/* INAPP BROWSER */
function openInAppBrowser() {
    var w = window.open('http://oreilly.com', '_blank', 'location=yes');
}

/* CAPTURE AUDIO */
function captureAudio() {
 navigator.device.capture.captureAudio(function(url) {
            navigator.notification.alert(
                'Audio captured ' + url, null);
        },
        function() {
            navigator.notification.alert(
                'Error capturing audio', null);            
        }, {limit:5});
}

/* VIBRATION */
function vibrate() {
    navigator.vibrate([3000, 1000, 2000, 1000]);
}

















/* CONTACTS */

function addContact() {
    var contact = navigator.contacts.create();
    contact.displayName = "Mickey";
    contact.nickname = "Mickey";           

    var name = new ContactName();
    name.givenName = "Mickey";
    name.familyName = "Mouse";
    contact.name = name;

    contact.save(
        function() {
            navigator.notification.alert(
                'Contact added', null);
        },
        function() {
            navigator.notification.alert(
                'Error adding a contact', null);            
        });   
}

function pickContact() {
    navigator.contacts.pickContact(
        function(contact){
            navigator.notification.alert(
                'Contact selected' + JSON.stringify(contact), null);
        },
        function(err){
            console.log('Error: ' + err);
        });
}









function cameraFailed() {
    navigator.notification.alert("Camera not available or picture cancelled", null);
}

/* PICTURE */

function takePicture() {
    navigator.camera.getPicture(takePictureCallback, cameraFailed, 
    {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
    });
}

function takePictureCallback(picture) {
    var img = document.querySelector("#output img");
    img.src = "data:image/jpg;base64,"+picture;
}

/* SELFIE */

function takeSelfie() {
    navigator.camera.getPicture(takePictureCallback, cameraFailed, 
    { 
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        saveToPhotoAlbum: true,
        cameraDirection: Camera.Direction.FRONT
    });
}



/* PICK FROM GALLERY */

function pickPictureCallback(pictureURL) {
    var img = document.querySelector("#output img");
    img.src = pictureURL;
}

function pickPicture() {
    navigator.camera.getPicture(pickPictureCallback, cameraFailed, 
    { quality: 80,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true  });
}


/* DIALOGS */

function notifyMe() {
    navigator.notification.alert("You've been notified",
                null, "Cordova Plugins", "Ok");   
}

function confirmCallback(buttonIndex) {
    navigator.notification.alert("Button Index: " + buttonIndex, null);   
}

function confirmDelete() {
    navigator.notification.confirm("Are you sure?",
            confirmCallback, "Delete", ["Yes", "No"]);
}