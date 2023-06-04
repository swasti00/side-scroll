let images = [...document.querySelectorAll('.img')];
let slider = document.querySelector('.side');
let sliderwidth;
let imagewidth;
let current = 0;
let target = 0;
let ease = 0.7

window.addEventListener('resize', init);

images.forEach((img , idx) => {
    img.style.backgroundImage = `url(./images/${idx+1}.jpeg)`
});

function slide(start, end ,t){
    return start * (1-t) + end * t; 
}

function settransform(el, transform){
    el.style.transform = transform;
}

function init(){
    sliderwidth = slider.getBoundingClientRect().width;
    imagewidth = sliderwidth / images.length;
    document.body.style.height = `${sliderwidth - (window.innerWidth - window.innerHeight)}px`
}

function animate(){
    current = parseFloat(slide(current, target, ease)).toFixed(2);
    target = window.scrollY;
    settransform(slider, `translateX(-${current}px)`)
    animateImages();
    requestAnimationFrame(animate);
}

function animateImages(){
    let ratio = current / imagewidth;
    let intersection;

    images.forEach((image, idx) => {
        intersection = ratio - (idx * 0.7);
        settransform(image, `translateX(${intersection * 70}px)`)
    })
}

init();
animate();

