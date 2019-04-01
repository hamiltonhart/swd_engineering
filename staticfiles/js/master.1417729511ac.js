
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
    const querySelect = document.getElementById("query-select");
    const options = Array.from(querySelect.getElementsByTagName('option'));

    const foundOption = options.find(option => {
        return window.location.pathname.includes(option.value);
    });
    querySelect.selectedIndex = foundOption.index;
}


function showHideNotes(display, form){
    const notesDisplay = document.getElementById("notes-display");
    const notesForm = document.getElementById("notes-form");

    notesDisplay.classList.toggle('notes-hidden');
    notesForm.classList.toggle('notes-hidden');
}



function main() {

    currentPageDisplay()

    if (document.getElementById("query-select")) {
        getURL();
    }
}

    if (document.getElementById("notes-display") && (document.getElementById("notes-form"))) {
        const showForm = document.getElementById('show-form');
        showForm.addEventListener('click', showHideNotes);
        const hideForm = document.getElementById('hide-form');
        hideForm.addEventListener('click', showHideNotes);
        
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
