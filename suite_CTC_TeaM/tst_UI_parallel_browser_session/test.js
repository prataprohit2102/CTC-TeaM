import * as names from 'names.js';
function addmovie(){
    var movietable = testData.dataset("movie.tsv");
    var user;
    var pass;
    var title;
    var director;
    var description;
    var category;
    var url;
    var rating;
    test.log("Getting data for movie")
    for (var record in movietable) {
        title = testData.field(movietable[record], "title");
        director = testData.field(movietable[record], "director");
        description = testData.field(movietable[record], "description");
        category = testData.field(movietable[record], "categories");
        url = testData.field(movietable[record], "url");
        rating = testData.field(movietable[record], "rating");
    }
    test.log("Click on add movie");
    clickLink(waitForObject(names.reactAppAddMovieA));
    test.log("Click on title");
    setFocus(waitForObject(names.reactAppTitleText));
    test.log("enter the title");
    typeText(waitForObject(names.reactAppTitleText), title);
    test.log("Click on Director");
    setFocus(waitForObject(names.reactAppDirectorText));
    test.log("enter the director name");
    typeText(waitForObject(names.reactAppDirectorText), director);
    test.log("selecting the categorie");
    selectOption(waitForObject(names.reactAppCategoriesSelectMultiple), category);
    setFocus(waitForObject(names.reactAppDescriptionTEXTAREA));
    test.log("Adding a description");
    typeText(waitForObject(names.reactAppDescriptionTEXTAREA), description);
    activateBrowserTab(waitForObject(names.reactAppBrowserTab));
    test.log("Adding the URL");
    setFocus(waitForObject(names.reactAppFileText));
    typeText(waitForObject(names.reactAppFileText), url);
    test.log("evaluate the movie");
    var star1 = waitForObject("{title='React App' type='BrowserTab'}.DOCUMENT.HTML1.BODY1.DIV1.DIV1.DIV1.DIV6.DIV1.svg1.path1");
    var star2 = waitForObject("{title='React App' type='BrowserTab'}.DOCUMENT.HTML1.BODY1.DIV1.DIV1.DIV1.DIV6.DIV1.svg2.path1");
    var star3 = waitForObject("{title='React App' type='BrowserTab'}.DOCUMENT.HTML1.BODY1.DIV1.DIV1.DIV1.DIV6.DIV1.svg3.path1");
    var star4 = waitForObject("{title='React App' type='BrowserTab'}.DOCUMENT.HTML1.BODY1.DIV1.DIV1.DIV1.DIV6.DIV1.svg4.path1");
    var star5 = waitForObject("{title='React App' type='BrowserTab'}.DOCUMENT.HTML1.BODY1.DIV1.DIV1.DIV1.DIV6.DIV1.svg5.path1");  
    switch (rating) {
    case "1":
        test.log("evaluate the movie with 1 star");
        mouseMove(star1,1,1);
        break;
    case "2":
        test.log("evaluate the movie with 2 star");
        mouseMove(star2,1,1);
        break;
    case "3":
        test.log("evaluate the movie with 3 star");
        mouseMove(star3,1,1);
        break;
    case "4":
        test.log("evaluate the movie with 4 star");
        mouseMove(star4,1,1);
        break;
    case "5":
        test.log("evaluate the movie with 5");
        mouseMove(star5,1,1);
        break;
    default:
        break;
    }
    clickButton(waitForObject(names.reactAppSaveMovieButton));
    test.log("Movie has been add");
}
function login(){
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
}
function main() {
    test.log("Getting user and password from data table for admin")
    var dataset = testData.dataset("login.tsv");
    var user;
    var pass;
    var url = "https://autothon-nagarro-frontend-x01.azurewebsites.net/";
    test.log("Opening the site");
    startBrowser("https://autothon-nagarro-frontend-e00.azurewebsites.net/");
    clickButton(waitForObject(names.reactAppButton));
    for (var record in dataset) {
        if (testData.field(dataset[record], "user") == "admin") {
            user = testData.field(dataset[record], "user");
            pass = testData.field(dataset[record], "pass");
        }

    }
    nativeType("<Ctrl+T>");
    snooze(4);
    var a = browserTabs();
    var firstTab = a[0];
    var secondTab = a[1];
    snooze(3);
    activateBrowserTab(secondTab);
    secondTab.url = url;
    snooze(5);
    login();
    activateBrowserTab(firstTab);
    snooze(3);
    test.log(secondTab);
    snooze(4);
    login();
    setFocus(waitForObject(names.reactAppSearchSearch));
    typeText(waitForObject(names.reactAppSearchSearch), "tom and jerry");
    test.log("Verify that movie was add");
    test.vp("VP1");
}
