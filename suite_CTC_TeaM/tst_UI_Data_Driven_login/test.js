import * as names from 'names.js';

function main() {
    test.log("Getting user and password from data table for admin")
    var dataset = testData.dataset("login.tsv");
    var user;
    var pass;

    test.log("Opening the site");
    startBrowser("https://autothon-nagarro-frontend-x01.azurewebsites.net/");
    for (var record in dataset) {
        if (testData.field(dataset[record], "user") == "admin") {
            user = testData.field(dataset[record], "user");
            pass = testData.field(dataset[record], "pass");
        }

    }
    clickLink(waitForObject(names.reactAppLoginA));
    setFocus(waitForObject(names.reactAppPasswordText));
    test.log("Enter the user name");
    typeText(waitForObject(names.reactAppPasswordText), "admin");
    setFocus(waitForObject(names.reactAppUsernamePassword));
    test.log("entering the pass");
    typeText(waitForObject(names.reactAppUsernamePassword), "password");
    test.log("click Login button");
    clickButton(waitForObject(names.reactAppLoginButton));
    test.vp("VP1");
    test.log("You are loggedin");
}
