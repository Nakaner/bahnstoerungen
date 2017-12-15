var menuOpen = false;
var gMenu = document.getElementById('menu');
var hamburger = document.getElementById('open-menu-icon');
var closeMenu = function() {
    console.log('close');
    //gMenu.classList.add('menuHide');
    gMenu.classList.remove('menuShow');
    hamburger.classList.add('menu-button-closed');
    hamburger.classList.remove('menu-button-open');
    menuOpen = false;
}

function openCloseMenu(event, onlyClose) {
    if (menuOpen) {
        closeMenu(event);
    } else if (!menuOpen && !onlyClose) {
        console.log('open');
        //gMenu.classList.remove('menuHide');
        gMenu.classList.add('menuShow');
        hamburger.classList.add('menu-button-open');
        hamburger.classList.remove('menu-button-closed');
        menuOpen = true;
    }
    // don't allow the element to propagagte on
    event.stopPropagation();
};

hamburger.addEventListener('click', function(event){openCloseMenu(event, false);});
gMenu.addEventListener('click', function(event){event.stopPropagation();});
document.body.addEventListener('click', function(event){openCloseMenu(event, true);});
