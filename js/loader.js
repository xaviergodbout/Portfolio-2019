//  Loader   //
//////////////
window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    loader.className += " hidden"; // class "loader hidden"
    });

//  Copy to Clipboard  //
////////////////////////
function copyTo() {
    var copyText = document.getElementById("copyTo");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("J'ai téléporter courriel dans votre presse-papier: " + copyText.value);
}


///////////
  // window.addEventListener('resize', () => {
  //   // We execute the same script as before
  //   let vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty('--vh', `${vh}px`);
  // });