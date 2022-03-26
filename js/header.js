const navbar = document.querySelector("ul");
const menu = document.querySelector(".menu");
const landing = document.querySelector(".landing");
const space = document.querySelector(".space");
const header = document.querySelector("header");

menu.addEventListener("click",function(){
navbar.classList.toggle("nav-res");
});
navbar.addEventListener("click",function(e){
const linkClicked = e.target.closest("li");
navbar.classList.remove("nav-res");
})
// document.addEventListener("click",function(){
//     navbar.classList.remove("nav-res");
// });

const landObserv = new IntersectionObserver(function(entries){
    const [entry] = entries;

    if(entry.isIntersecting === false)
    header.classList.add("sticky");
    else{
      header.classList.remove("sticky");
    } 
    },{root:null,threshold:0.999});
landObserv.observe(space);