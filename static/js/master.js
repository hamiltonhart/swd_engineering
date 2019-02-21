
// function showHideNavbarItems(button) {
    
// }

function showHideMenu(IdName) {
    var menubar = document.getElementById(IdName)

    if (menubar.style.display !== 'block') {
        menubar.style.display = 'block';
    }
    else {
        menubar.style.display = 'none';
    }
}

function currentPageDisplay() {
    var current_page_display = document.getElementById('current-page')
    var current_page_title = document.getElementsByTagName('title')[0]

    current_page_display.innerText = current_page_title.innerText.replace('\n', '')    
}

currentPageDisplay()