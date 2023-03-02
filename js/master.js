// Landing
let landing = document.querySelector(".landing");

let handel;
function backgroundChanger() {
  let c = 0;
  handel = setInterval(() => {
    landing.style.backgroundImage = `url(../imgs/0${(c %= 5)}.jpg`;
    c++;
  }, 9000);
}
backgroundChanger();

//Nav Toggle
let toggleMenu = document.querySelector(".landing .navbar .toggle-menu");
let navMenu = document.querySelector(".landing .navbar .nav-list");

toggleMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  navMenu.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("nav-list", "toggle-menu")) {
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
    }
  }
});

navMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});

// Setting box
let settingToggle = document.querySelector(".setting-box .setting-toggle");
let settingBox = document.querySelector(".setting-box");

settingToggle.addEventListener("click", () => {
  settingBox.classList.toggle("active");
  settingToggle.querySelector("i").classList.toggle("fa-spin");
});

// Switch Colors
let colorList = document.querySelector(".colors-list");

colorList.addEventListener("click", (e) => {
  if (e.target.dataset.color) {
    colorList.querySelector("li.active").classList.remove("active");
    e.target.classList.add("active");
    let color = e.target.dataset.color;
    document.documentElement.style.setProperty("--main-color", color);
    localStorage.setItem("color", color);
  }
});

// get Color from Local storage
function getColorFromLocalStorage() {
  if (localStorage.getItem("color")) {
    let color = localStorage.getItem("color");
    document.documentElement.style.setProperty("--main-color", color);
    document.querySelector("li.active").classList.remove("active");
    document.querySelector(`li[data-color="${color}"]`).classList.add("active");
  }
}
getColorFromLocalStorage();

// ON/OFF Background Changer
let backgroundBox = document.querySelector(".backgrounds .buttons");

backgroundBox.addEventListener("click", (e) => {
  if (e.target.classList.contains("yes") || e.target.classList.contains("no")) {
    backgroundBox.querySelector("button.active").classList.remove("active");
    e.target.classList.add("active");
    localStorage.setItem("background", e.target.classList[0]);
    getBackgroundPermissionFromLocalStorage();
  }
});

// Check permission of change background from local storage
function getBackgroundPermissionFromLocalStorage() {
  let permission = localStorage.getItem("background");
  if (permission != null) {
    if (permission === "no") clearInterval(handel);
    else backgroundChanger();
    backgroundBox.querySelector("button.active").classList.remove("active");
    backgroundBox.querySelector(`.${permission}`).classList.add("active");
  }
}
getBackgroundPermissionFromLocalStorage();

// Show/Hide Navigation Bullets
let bulletsBox = document.querySelector(".setting-box .bullets .buttons");
let bullets = document.querySelector(".navigation-bullets");

bulletsBox.addEventListener("click", (e) => {
  if (e.target.classList.contains("yes") || e.target.classList.contains("no")) {
    bulletsBox.querySelector("button.active").classList.remove("active");
    e.target.classList.add("active");
    localStorage.setItem("bullets", e.target.classList[0]);
    checkStateBulletsLocalStorage();
  }
});

// Check Bullets State from local Storage
function checkStateBulletsLocalStorage() {
  let bulletsState = localStorage.getItem("bullets");
  if (bulletsState != null) {
    bulletsBox.querySelector("button.active").classList.remove("active");
    bulletsBox.querySelector(`.${bulletsState}`).classList.add("active");
    if (bulletsState == "no") bullets.classList.add("hide");
    else bullets.classList.remove("hide");
  }
}
checkStateBulletsLocalStorage();

// Navigate between Sections from Navigation Bullets
let bulletsBtn = bullets.querySelectorAll(".circle");
bulletsBtn.forEach((bullet) => {
  bullet.addEventListener("click", () => {
    document.querySelector(`.${bullet.dataset.section}`).scrollIntoView();
  });
});

// Reset Setting Box and Clear Local Storage
let resetBtn = document.querySelector(".setting-box .reset-btn");
resetBtn.addEventListener("click", () => {
  localStorage.clear();
  backgroundBox.querySelector("button.active").classList.remove("active");
  backgroundBox.querySelector("button.yes").classList.add("active");
  colorList.querySelector("li.active").classList.remove("active");
  colorList.querySelector("li").classList.add("active");
  document.documentElement.style.setProperty("--main-color", "#FF9800");
  bulletsBox.querySelector("button.active").classList.remove("active");
  bulletsBox.querySelector("button").classList.add("active");
  bullets.classList.remove("hide");
  backgroundChanger();
});

// Progress
let skillsSection = document.querySelector(".skills");
let progressLines = skillsSection.querySelectorAll(".progress span");

window.addEventListener("scroll", () => {
  if (window.scrollY >= skillsSection.offsetTop) {
    progressLines.forEach((line) => {
      line.style.width = line.dataset.progress;
    });
  }
});

// Popup
let galleryImages = document.querySelectorAll(".gallery .content .img-holder");
let popup = document.querySelector(".gallery .popup");
let closeBtn = document.querySelector(".popup .img-box .close-btn");

galleryImages.forEach((imgHolder) => {
  imgHolder.addEventListener("click", () => {
    let imgSrc = imgHolder.firstElementChild.src;
    let title = imgHolder.firstElementChild.alt;
    popup.firstElementChild.lastElementChild.src = imgSrc;
    popup.querySelector(".img-title").textContent = title;
    popup.classList.add("active");
  });
});

closeBtn.addEventListener("click", () => {
  popup.classList.remove("active");
});
