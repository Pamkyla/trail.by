
function fspboverlay() {
    let fspboverlay = document.getElementById("fspboverlay");
    let closeBtn = document.getElementById("CloseBtn");
    let popup = document.getElementById("popup-banner");
    fspboverlay.addEventListener('click', closePopup);
    closeBtn.addEventListener('click', closePopup);
    fspboverlay.style.display = "block";
    popup.style.display = "flex";

    function closePopup () {
        let fspboverlay = document.getElementById("fspboverlay");
        let popup = document.getElementById("popup-banner");
        fspboverlay.style.display = "none";
        popup.style.display = "none";
    }

}
