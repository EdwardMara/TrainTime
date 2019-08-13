

var config = {
    apiKey: "AIzaSyAxBaUOgA75D63uvkZvkz_GkrfkFIEY8oA",
    authDomain: "traintime-55e66.firebaseapp.com",
    databaseURL: "https://traintime-55e66.firebaseio.com",
    projectId: "traintime-55e66",
    storageBucket: "traintime-55e66.appspot.com",
    messagingSenderId: "946320047876",
    appId: "1:946320047876:web:20b9d20dc7a53e93"
};



firebase.initializeApp(config);

var trainData = firebase.database();
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input")
        .val()
        .trim();
    var destination = $("#destination-input")
        .val()
        .trim();
    var firstTrain = $("#first-train-input")
        .val()
        .trim();
    var frequency = $("#frequency-input")
        .val()
        .trim();

    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    trainData.ref().push(newTrain);

    alert("Train successfully added");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

trainData.ref().on("child_added", function (childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var tName = childSnapshot.val().trainName;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;

    var timeArr = tFirstTrain.split(":");
    var trainTime = moment()
        .hours(timeArr[0])
        .minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;

    if (maxMoment === trainTime) {
        tArrival = trainTime.format("hh:mm A");
        tMinutes = trainTime.diff(moment(), "minutes");
    } else {
        var differenceTimes = moment().diff(trainTime, "minutes");
        var tRemainder = differenceTimes % tFrequency;
        tMinutes = tFrequency - tRemainder;
        tArrival = moment()
            .add(tMinutes, "m")
            .format("hh:mm A");
    }
    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);
    $("#train-table > tbody").append(
        $("<tr>").append(
            $("<td>").text(tName),
            $("<td>").text(tDestination),
            $("<td>").text(tFrequency),
            $("<td>").text(tArrival),
            $("<td>").text(tMinutes)
        )
    );
});

