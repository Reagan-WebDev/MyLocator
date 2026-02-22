function getLocation() {
    // 🔹 If location already saved, reuse it
    const savedLocation = localStorage.getItem("userLocation");

    if (savedLocation) {
        const { latitude, longitude } = JSON.parse(savedLocation);
        showSavedPosition(latitude, longitude);
        return;
    }

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // 🔹 Save location so refresh won’t change anything
    localStorage.setItem(
        "userLocation",
        JSON.stringify({ latitude, longitude })
    );

    showSavedPosition(latitude, longitude);
}

function showSavedPosition(latitude, longitude) {
    document.getElementById("location-info").innerHTML =
        `Latitude: ${latitude}, Longitude: ${longitude}`;

    initMap(latitude, longitude);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        default:
            alert("An unknown error occurred.");
    }
}

function initMap(lat = -1.286389, lng = 36.817223) {
    document.getElementById("map").style.display = "block";

    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat, lng },
        zoom: 15,
    });

    new google.maps.Marker({
        position: { lat, lng },
        map,
        title: "User Location",
    });
}

// 🔹 Automatically restore location on page load
window.onload = getLocation;