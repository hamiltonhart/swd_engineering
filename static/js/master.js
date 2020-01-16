
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

function showModal(className) {
    const element =  document.querySelector(className);
    element.style.display = 'flex';
}

function closeModal(className) {
    const element = document.querySelector(className);
    element.style.display = 'none';
}

function showModalId(IdName) {
    const element = document.getElementById(IdName);
    element.style.display = 'flex';
}

function closeModalId(IdName) {
    const element = document.getElementById(IdName);
    element.style.display = 'none';
}


function getRentalSelectionValues() {
    const statusValue = document.getElementById("id_status_field");
    const statusClear = document.getElementById("status_field_search_clear");
    statusClear.value = statusValue.options[statusValue.selectedIndex].value;
    const channelConfigValue = document.getElementById("id_channel_config_field");
    const channelConfigClear = document.getElementById("channel_field_search_clear");
    channelConfigClear.value = channelConfigValue.options[channelConfigValue.selectedIndex].value;
    const typeValue = document.getElementById("id_type_field");
    const typeClear = document.getElementById("type_field_search_clear");
    typeClear.value = typeValue.options[typeValue.selectedIndex].value;
}

function getContactSortingValues() {
    const sortingValue = document.getElementById('id_name_sorting');
    const sortingClear = document.getElementById("sorting_search_clear");
    console.log(sortingClear)
    sortingClear.value = sortingValue.options[sortingValue.selectedIndex].value;
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

    if (document.getElementById("rental-clear-search")) {
        getRentalSelectionValues();
    }

    if (document.getElementById('contacts-clear-search')) {
        getContactSortingValues();
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
