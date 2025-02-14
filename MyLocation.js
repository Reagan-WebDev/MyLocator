function getLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    document.getElementById("location-info").innerHTML = 
        `Latitude: ${latitude}, Longitude: ${longitude}`;

    initMap(latitude, longitude);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

function initMap(lat = -1.286389, lng = 36.817223) {
    document.getElementById("map").style.display = "block";

    let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat, lng },
        zoom: 15,
    });

    new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: "User Location"
    });
}
