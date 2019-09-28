import * as names from 'names.js';

function main() {
    var backend = 'https://autothon-nagarro-backend-e01.azurewebsites.net';
    var adminUser = 'admin';
    var adminPassword = 'password';
    var regularUser = 'user';
    var regularPassword = 'password';
    
    // Create movies, gather Ids for later check.
    var movieIds = [];
    var movieTitles = {};
    var records = testData.dataset("movies.tsv");
    for (var row = 0; row < records.length; ++row) {
        var record = records[row];
        var movieJson = buildMovieJson(record);
        test.log("row=" + row + ", json=" + JSON.stringify(movieJson));
        var movieId = createMovie(backend, movieJson, adminUser, adminPassword);
        movieIds.push(movieId);
        movieTitles[movieId] = movieJson["movie"]["title"];
    }
    
    // Check movies
    test.log("Will check movie Ids: " + movieIds);
    var visibleMovieIds = getMovies(backend, regularUser, regularPassword);
    movieIds.forEach(function (movieId) {
        test.verify(visibleMovieIds.indexOf(movieId) >= 0, "Movie " + movieTitles[movieId] + " with Id " + movieId + " is visible for a regular user.");
    })
}

function buildMovieJson(record) {
    var json = {
        "movie": {
        "title": testData.field(record, "Title"),
        "description": testData.field(record, "Description"),
        "image": testData.field(record, "Image"),
        "director": testData.field(record, "Director"),
        "rating": testData.field(record, "Rating"),
        "rented": testData.field(record, "Rented"),
        "categories": [testData.field(record, "Category")],
        "reviews": []
        }
    }
    return json;
}

function createMovie(backend, movieJson, user, password) {
    var client = new XMLHttpRequest();
    
    var userSessionId = login(backend, client, user, password);
    
    var moviesUrl = backend + '/movies';
    test.log('Creating movie at URL ' + moviesUrl);
    client.open('POST', moviesUrl, false);
    client.setRequestHeader('Content-Type', "application/json");
    client.setRequestHeader('user', userSessionId);
    var moviePayload = JSON.stringify(movieJson);
    test.log("Creating movie with payload " + moviePayload);
    client.send(moviePayload);
    test.log(client.status);
    test.log(client.response);
    movieJson = JSON.parse(client.response);
    movieId = movieJson['id'];
    test.log("Got back movie Id " + movieId);
    return movieId;
}

function getMovies(backend, user, password) {
    var client = new XMLHttpRequest();
    
    var userSessionId = login(backend, client, user, password);
    
    var movieUrl = backend + '/movies';
    test.log('Getting movies from URL ' + movieUrl);
    client.open('GET', movieUrl, false);
    client.setRequestHeader('user', userSessionId);
    client.send();
    test.log(client.status);
    test.log(client.response);
    moviesJson = JSON.parse(client.response);
    test.log("Got back movies " + JSON.stringify(moviesJson));
    movieIds = moviesJson.map(function(movie) {
       return movie["id"]; 
    });
    test.log("Got back movie Ids " + movieIds);
    return movieIds;
}

function login(backend, client, user, password) {
    var loginURL = backend + '/login';
    test.log("Logging in to URL " + loginURL + ", with user " + user);
    client.open('POST', loginURL, false);
    client.setRequestHeader('Content-Type', "application/json");
    var loginPayload = JSON.stringify({"username": user, "password": password});
    test.log("Logging in with payload " + loginPayload);
    client.send(loginPayload);
    test.log("Login status: " + client.status);
    test.log("Login response: " + client.response);
    userJson = JSON.parse(client.response);
    userSessionId = userJson['id'];
    test.log("Got user session Id " + userSessionId);
    return userSessionId;
}