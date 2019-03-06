
function showHideMenu(IdName) {
    var menubar = document.getElementById(IdName)

    if (menubar.style.display !== 'block') {
        menubar.style.display = 'block';
    }
    else {
        menubar.style.display = 'none';
    }
};

// Displays the page title in the navigation bar
function currentPageDisplay() {
    var current_page_display = document.getElementById('current-page')
    var current_page_title = document.getElementsByTagName('title')[0]

    current_page_display.innerText = current_page_title.innerText.replace('\n', '')    
}

// Follows url link when <select> is changed
function selectCallLink() {
    window.location.href = document.getElementById("query-select").value;
}

// Sets the value of the <select> for the filter options
function getURL() {
    var querySelect = document.getElementById("query-select");
    var field_match = false;
    if (querySelect.name === "harddrive_filters"){
        var harddrive_filters_fields = ["all", "available", "250", "500", "1TB", "2TB"];
        for (var i = 0; field_match == false; i++){
            if (window.location.pathname.includes(harddrive_filters_fields[i])){
                    querySelect.selectedIndex = i;
                    field_match = true;
            }
        }
    }
    else if (querySelect.name === "rental_project_filters"){
        var rental_project_filters_fields = ["all", "current", "51", "71", "atmos", "imax6", "imax12"];
        for (var i = 0; field_match == false; i++){
            if (window.location.pathname.includes(rental_project_filters_fields[i])){
                    querySelect.selectedIndex = i;
                    field_match = true;
            }
        }
    }
    // Next if statement for querySelect
}

function main(){
    
    currentPageDisplay()

    if (document.getElementById("query-select")){
        getURL();
    }
    
    
}

main()




// href - the entire URL
// protocol - the protocol of the URL
// host - the hostname and port of the URL
// hostname - the hostname of the URL
// port - the port number the server uses for the URL
// pathname - the path name of the URL
// search - the query portion of the URL
// hash - the anchor portion of the URL
