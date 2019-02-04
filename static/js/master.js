
// function showHideNavbarItems(button) {
    
// }

function showHideMenu() {
    var navbar = document.getElementsByClassName('navbar')[0]

    if (navbar.style.display !== 'block') {
        navbar.style.display = 'block';
    }
    else {
        navbar.style.display = 'none';
    }
}

function currentPageDisplay() {
    var current_page_display = document.getElementById('current-page')
    var current_page_title = document.getElementsByTagName('title')[0]

    current_page_display.innerText = current_page_title.innerText.replace('\n', '')    
}

currentPageDisplay()