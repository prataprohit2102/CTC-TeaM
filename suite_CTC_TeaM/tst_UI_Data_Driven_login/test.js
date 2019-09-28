import * as names from 'names.js';

function main() {
    test.log("Getting user and password from data table for admin")
    var dataset = testData.dataset("login.tsv");
    var user;
    var pass;

    test.log("Opening the site");
    startBrowser("https://autothon-nagarro-frontend-e00.azurewebsites.net/");
    clickButton(waitForObject(names.reactAppButton));
    for (var record in dataset) {
        if (testData.field(dataset[record], "user") == "admin") {
            user = testData.field(dataset[record], "user");
            pass = testData.field(dataset[record], "pass");
        }

    }
    test.log("click on login");
    clickLink(waitForObject(names.reactAppLoginA_2));
    setFocus(waitForObject(names.reactAppUsernameText));
    test.log("Enter the user name");
    typeText(waitForObject(names.reactAppUsernameText), user);
    setFocus(waitForObject(names.reactAppPasswordPassword));
    test.log("entering the pass");
    typeText(waitForObject(names.reactAppPasswordPassword), pass);
    test.log("click Login button");
    clickButton(waitForObject(names.reactAppLoginButton));
    test.vp("VP1");
    
    
    test.log("You are loggedin");
}
