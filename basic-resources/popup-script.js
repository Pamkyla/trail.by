// if (sessionStorage.getItem('AnnouncementOnce') !== 'true') {

// window.onload = function () {

function fspboverlay() {
    let marker = true;
    let fspboverlay = document.getElementById("fspboverlay");
    let closeBtn = document.getElementById("CloseBtn");
    let popup = document.getElementById("popup-banner");
    fspboverlay.addEventListener('click', closePopup);
    closeBtn.addEventListener('click', closePopup);
    fspboverlay.style.display = "block";
    popup.style.display = "flex";
    sessionStorage.setItem('AnnouncementOnce', 'true');

    function closePopup () {
        let fspboverlay = document.getElementById("fspboverlay");
        let popup = document.getElementById("popup-banner");
        fspboverlay.style.display = "none";
        popup.style.display = "none";
    }

    sessionStorage.setItem('AnnouncementOnce', 'true');
}
// Тут играются со временем!
//setTimeout(fspboverlay, 10000)

//  }
// };