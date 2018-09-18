var config = {
    apiKey: "AIzaSyC55ZK2bQIAjapGD-dI7uSnFQaAESkR4vQ",
    authDomain: "train-scheduler-44871.firebaseapp.com",
    databaseURL: "https://train-scheduler-44871.firebaseio.com",
    projectId: "train-scheduler-44871",
    storageBucket: "train-scheduler-44871.appspot.com",
    messagingSenderId: "1086528952930"
};
firebase.initializeApp(config);

var db = firebase.database();



$("#add-train-btn").on("click", function () {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#first-train-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();

    var newTrain = {
        Train: trainName,
        Destination: trainDestination,
        First_Time: trainTime,
        Frequency: trainFreq
    }

    db.ref().push(newTrain);

    $("#train-name-input").val("")
    $("#destination-input").val("")
    $("#first-train-input").val("")
    $("#frequency-input").val("")

});

db.ref().on("child_added", function (childSnapshot) {
    var trainName = childSnapshot.val().Train;
    var trainDestination = childSnapshot.val().Destination;
    var trainTime = childSnapshot.val().First_Time;
    var trainFreq = childSnapshot.val().Frequency;

    var firstTimeConverted = moment(trainTime, "hh:mm");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % trainFreq;
    var minAway = trainFreq - tRemainder;
    var nextTrain = moment().add(minAway, "minutes");
    var nextTrainFormatted = moment(nextTrain).format("ddd, hh:mm A");

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFreq);
    console.log(nextTrain);
    console.log(minAway);

    var row = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFreq),
        $("<td>").text(nextTrainFormatted),
        $("<td>").text(minAway)
    );

    $("#trains").append(row);

});