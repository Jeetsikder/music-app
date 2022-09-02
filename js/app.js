console.log("This is app.js");
window.onscroll = function () {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    document.getElementById("navbar").classList.add("scrolled");
  } else {
    document.getElementById("navbar").classList.remove("scrolled");
  }
};

//
let navbarToggler = document.querySelector(".navbar-toggler");
navbarToggler.addEventListener("click", () => {
  document.querySelector(".navbar").classList.add("scrolled");
});

//
// let controlPanel = document.getElementById("control-panel");
// window.onscroll = function () {
//   if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
//     controlPanel.classList.add("bottom-0");
//     controlPanel.classList.add("position-sticky");
//   } else {
//     controlPanel.classList.remove("bottom-0");
//     controlPanel.classList.remove("position-sticky");
//   }
// };
