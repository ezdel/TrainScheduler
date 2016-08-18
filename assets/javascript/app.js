
var config = {
    apiKey: "AIzaSyAD57T0EvY6xYwIxE10_nGyG1HXY798pgY",
    authDomain: "week7-homework.firebaseapp.com",
    databaseURL: "https://week7-homework.firebaseio.com",
    storageBucket: "week7-homework.appspot.com",
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function(){
	var	trainName = $("#trainName").val().trim();
	var	trainDestination = $("#trainDestination").val().trim();
	var	firstTrain = $("#firstTrain").val().trim();
	var	frequency = $("#trainFrequency").val().trim();


	database.ref().push({
		name: trainName,
		destination: trainDestination,
		firstTrain: firstTrain,
		frequency: frequency
	});

	$("#trainName").val("");
	$("#trainDestination").val("");
	$("#firstTrain").val("");
	$("#trainFrequency").val("");

	return false;
	
});

database.ref().on('child_added', function(childSnapshot) {
 	
	var childSnapshot = childSnapshot.val();
   	var tFrequency = childSnapshot.frequency;
   	var firstTime = childSnapshot.firstTrain;
   	var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	var tRemainder = diffTime % tFrequency;
	var minutesAway = tFrequency - tRemainder;
	var nextTrain = moment().add(minutesAway, "minutes").format("h:mm A");

	var newRow= $("<tr>");
   	var nameTD = $("<td>" + childSnapshot.name + "</td>" );
   	var destinationTD = $("<td>" + childSnapshot.destination + "</td>" );
   	var frequencyTD = $("<td> Every " + childSnapshot.frequency + " mins</td>" );
   	var nextTrainTD =$("<td>" + nextTrain + "</td>");
   	var minutesAwayTD = $("<td>" + minutesAway + "</td>");
   

   	var trainData = $(newRow).append(nameTD).append(destinationTD).append(frequencyTD).append(nextTrainTD).append(minutesAwayTD);
   	$("#trainList").append(trainData);



});