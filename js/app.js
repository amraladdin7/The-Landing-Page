/**
 * Define Global Variables
 * 
*/
const naviBar = document.querySelector("nav.navbar__menu");
const naviList = document.querySelector("ul#navbar__list");
const sections = document.querySelectorAll("section");
const topButton = document.querySelector("button");
let timer; //placeholder for the timer of the navibar
let currentSection = document.getElementById("section1");
let prevSection = document.getElementById("section1");
let fragment = document.createDocumentFragment();


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//the function returns how far the top is from the current view port as an absolute value
function absTopValue(element) {
     const rect = element.getBoundingClientRect();
     return Math.abs(rect.top);
}

//function compares the array of elements returning the one with the closest top to the current viewPort
function compare(elements) {
     let min = 1000;
     let e = elements[0];
     elements.forEach(element => {
          if (min > absTopValue(element)) {
               min = absTopValue(element);
               e = element;
          }
     });
     return e;
}

//function that collapses the section
function collapse(section) {
     const content = section.querySelector("div.content");
     content.style.display = "none";
     section.style.height = "25vh";
     section.classList.add("collapsed");
}

//funcion that expands the section
function expand(section) {
     const content = section.querySelector("div.content");
     content.style.display = "block";     
     section.style.height = "auto";
     section.classList.remove("collapsed");
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// building the navigation bar
let theList; //one list element
naviList.style.listStyle = "none";

// function Updates the active class depending on the section currently in view point
function activeUpdate(elements) {
     prevSection = currentSection;
     currentSection = compare(elements);
     prevSection.classList.remove("your-active-class");
     currentSection.classList.add("your-active-class");
     document.querySelector(`li.${prevSection.id}`).classList.remove("your-active-list");
     document.querySelector(`li.${currentSection.id}`).classList.add("your-active-list");
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
sections.forEach(element => {
     theList = document.createElement("li");
     let eNav = element.getAttribute("data-nav");
     theList.innerText = eNav;
     theList.classList.add("menu__link");
     theList.classList.add(element.id);
     naviList.appendChild(theList);
});
document.body.appendChild(naviBar);

// Scroll to section on link click
document.getElementById("navbar__list").addEventListener("click", function(ev) {
     if(ev.target && ev.target.matches("li")) {
          sections.forEach(element => {
               if (element.getAttribute("data-nav") == ev.target.innerText) {
                    element.scrollIntoView({behavior: "smooth"});
               }
          });
     }
});

// Set sections as active
window.onscroll = function () {
     activeUpdate(sections);
     if(window.innerHeight >= (absTopValue(document.querySelector("footer p"))+50)) {
          topButton.style.display = "block";
     } else {
          topButton.style.display = "none";
     }
};
// Adds an event listener that listens to scroll then displays the navigation menu and starts a timeout everytime a user scrolls for the navigation menu to disappear
document.addEventListener("scroll", function() {
     naviBar.style.display = "block";     
     clearTimeout(timer);
     timer = setTimeout(function(){
          naviBar.style.display = "none";
     },3000);
});

// Adds event listener that listens to the mouse movement to display the bar for navigation
document.addEventListener("mousemove", function() {
     naviBar.style.display = "block";
     clearTimeout(timer);
     timer = setTimeout(function(){
          naviBar.style.display = "none";
     },3000);
});

// Building a back to top button
topButton.onclick = function () {
     document.documentElement.scrollIntoView({behavior: "smooth"});
};

// Loops over the sections adding the event listener to the heading to make the sections collapse or expand on click
for (let section of sections) {
     section.addEventListener("click", function(ev) {
          if (ev.target && ev.target.matches("h2")) {
               if (section.classList.contains("collapsed")) {
                    expand(section);
               } else {
                    collapse(section);
               }
          }
     })
}