const navbar = document.querySelector("ul");
const menu = document.querySelector(".menu");
const landing = document.querySelector(".landing");
const space = document.querySelector(".space");
const header = document.querySelector("header");
const links = document.querySelector(".links");

links.addEventListener("click",function(e){
  const clicked = e.target.closest(".link");
  const sec = document.querySelector(`#${clicked.dataset.sec}`);
 const secCoords = sec.getBoundingClientRect();
 window.scrollTo(secCoords.left +window.pageXOffset,secCoords.top+window.pageYOffset - 100);
});
menu.addEventListener("click",function(){
navbar.classList.toggle("nav-res");
});
navbar.addEventListener("click",function(e){
navbar.classList.remove("nav-res");
})

const landObserv = new IntersectionObserver(function(entries){
    const [entry] = entries;

    if(entry.isIntersecting === false)
    header.classList.add("sticky");
    else{
      header.classList.remove("sticky");
    } 
    },{root:null,threshold:0.999});
landObserv.observe(space);