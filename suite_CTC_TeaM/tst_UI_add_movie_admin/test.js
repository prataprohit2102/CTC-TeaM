import * as names from 'names.js';


function main(){
    
    var dataset = testData.dataset("login.tsv");
    var movietable = testData.dataset("movie.tsv");
    var user;
    var pass;
    var title;
    var director;
    var description;
    var category;
    var url;
    test.log("Opening the site");
    startBrowser("https://autothon-nagarro-frontend-x01.azurewebsites.net/");
    test.log("Getting user and password from data table for admin")
    for (var record in dataset) {
        if(testData.field(dataset[record], "user")=="admin"){
         user = testData.field(dataset[record], "user");
         pass = testData.field(dataset[record], "pass");
        }
  
    }
    test.log("Getting data for movie")
    for (var record in movietable) {
        title = testData.field(movietable[record], "title");
        director = testData.field(movietable[record], "director");
        description = testData.field(movietable[record], "description");
        category = testData.field(movietable[record], "categories");
        url = testData.field(movietable[record], "url");
    }
    test.log("click on login");
    clickLink(waitForObject(names.reactAppLoginA));
    setFocus(waitForObject(names.reactAppPasswordText));
    test.log("Enter the user name");
    typeText(waitForObject(names.reactAppPasswordText), user);
    setFocus(waitForObject(names.reactAppUsernamePassword));
    test.log("entering the pass");
    typeText(waitForObject(names.reactAppUsernamePassword), pass);
    test.log("click Login button");
    clickButton(waitForObject(names.reactAppLoginButton));
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
    mouseClick(waitForObject(names.titleReactAppTypeBrowserTabDOCUMENTHTML1BODY1DIV1DIV1DIV1DIV6DIV1Svg5Path1), 10, 5);
    mouseClick(waitForObject(names.titleReactAppTypeBrowserTabDOCUMENTHTML1BODY1DIV1DIV1DIV1DIV6DIV1Svg5Path1), 1, 1);
    test.log("Save the movie");
    clickButton(waitForObject(names.reactAppSaveMovieButton));
    
    snooze(5);

}