const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const slides = document.querySelectorAll(".slide");

let curSlide = 0;
let maxSlide = slides.length-1;
next.addEventListener("click",function(){
    curSlide++;
    if(curSlide>maxSlide)
    curSlide = 0;
   slides.forEach((el,i)=>{

       if(curSlide ===i){
        slides.forEach(el=>el.classList.add("hidden"))
       el.classList.remove("hidden");

       }
   });
});
prev.addEventListener("click",function(){
    curSlide--;
    if(curSlide<0)
    curSlide = maxSlide;
   slides.forEach((el,i)=>{
       if(curSlide ===i){
        slides.forEach(el=>el.classList.add("hidden"))
       el.classList.remove("hidden");

       }
   });
});

// let curSlide = 0;
// const maxSlide = slides.length;
// const goToSlide = function (slide) {
//     slides.forEach(
//     //   (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
//       (s, i)=>{
//           console.log(s.style.width=2)
//       }
//     );
//   };
//   // Next slide
//   const nextSlide = function () {
//       //last slide
//     if (curSlide === maxSlide - 1) {
//       curSlide = 0;
//     } else {
//       curSlide++;
//     }
//     goToSlide(curSlide);
//   };

//   const prevSlide = function () {
//     if (curSlide === 0) {
//       curSlide = maxSlide - 1;
//     } else {
//       curSlide--;
//     }
//     goToSlide(curSlide);
//   };

//   const init = function () {
//     goToSlide(0);
//   };
//   init();

//   // Event handlers
//   next.addEventListener('click', nextSlide);
//   prev.addEventListener('click', prevSlide);

