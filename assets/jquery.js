$( document ).ready(function() {

    var config = {
        apiKey: "AIzaSyDy8ZWJV-tJFieNqMRUqlu5Cc8WycxOMu4",
        authDomain: "gohan-e2ddf.firebaseapp.com",
        databaseURL: "https://gohan-e2ddf.firebaseio.com",
        projectId: "gohan-e2ddf",
        storageBucket: "gohan-e2ddf.appspot.com",
        messagingSenderId: "1010605377721"
    };

    firebase.initializeApp(config);
    var dataRef = firebase.database();

    var train_name = "";
    var destination = "";
    var train_time = 0;
    var frequency = "";


    var cont = 0;
    $("#submit").click(function(event){
        event.preventDefault();

        train_name = $("#train_name").val().trim();
        destination = $("#destination").val().trim();
        train_time = $("#train_time").val().trim();
        frequency =$("#frequency").val().trim();

        dataRef.ref().push({
            train_name: train_name,
            destination: destination,
            train_time: train_time,
            frequency: frequency,
    });
    });

    dataRef.ref().on("child_added", function(snapshotChild) {


        train_time = snapshotChild.val().train_time;
        frequency = snapshotChild.val().frequency;

        var firstTimeConverted = moment(train_time, "HH:mm").subtract(1, "years");

        var currentTime = moment();

        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        var time_Remainder = diffTime % frequency;

        var minutesAway = frequency - time_Remainder;

        var next_train = moment().add(minutesAway, "minutes");

        var newRow = $("<tr>").append(
            $("<td>").text(snapshotChild.val().train_name),
            $("<td>").text(snapshotChild.val().destination),
            $("<td>").text(snapshotChild.val().frequency),
            $("<td>").text(moment(next_train).format("HH:mm")),
            $("<td>").text(minutesAway)
        );
        $("tbody").append(newRow);

    }, function (errorObject) {

});

});
