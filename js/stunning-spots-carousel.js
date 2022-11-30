(async () => {

    const response = await fetch('api/norway-landscapes.json');
    const pictures = await response.json();

    let currentSlideIdx = 0;
    renderSlide();
    renderButtons();
 
    function creatingArrayOfImages(pictures) {
        const arrayOfImages = [];
        for (const picture of pictures) {
            arrayOfImages.push(`<div><img src="${picture.image}" alt="${picture.title}"></div>`);
        }
        return arrayOfImages;
    }

    const slides = creatingArrayOfImages (pictures);
    console.log(slides);

    function renderSlide() {
        const slideContainer = document.querySelector('.stunning-spots__carousel .stunning-spots__carousel_slide-container');
        slideContainer.innerHTML = slides[currentSlideIdx];
        if (window.innerWidth > 600) {
            const secondSlideIdx = currentSlideIdx + 1 >= slides.length ? 0 : currentSlideIdx + 1;
            slideContainer.innerHTML += slides[secondSlideIdx];
            if (window.innerWidth > 900) {
                const thirdSlideIdx = secondSlideIdx + 1 >= slides.length ? 0 : secondSlideIdx + 1;
                slideContainer.innerHTML += slides[thirdSlideIdx];
            }
        }
    }

    function renderButtons() {
        const buttonsContainer = document.querySelector('.carousel-indicators');
        buttonsContainer.innerHTML = "";
        let divContent;
        for (let i = 0; i < slides.length; i++) {
            if (i === currentSlideIdx) { divContent = '<div><button id="push_button" type="button" value="' + i + '"></button></div>'; }
            else { divContent = '<div><button type="button" value="' + i + '"></button></div>'; }
            buttonsContainer.innerHTML += divContent;
        }
    }

    function nextSlide() {
        currentSlideIdx++;
        if (currentSlideIdx >= slides.length) currentSlideIdx = 0;
        renderSlide();
    }

    function prevSlide() {
        currentSlideIdx--;
        if (currentSlideIdx < 0) currentSlideIdx = slides.length - 1;
        renderSlide();
    }

    function getValue(btn) {
        const currentValue = btn.target.value;
        if (currentValue !== undefined) currentSlideIdx = parseInt(currentValue);
        renderSlide();
    }

    const nextButton = document.querySelector('.stunning-spots__carousel .stunning-spots__carousel_btn-next');
    nextButton.addEventListener('click', nextSlide);

    const prevButton = document.querySelector('.stunning-spots__carousel .stunning-spots__carousel_btn-prev');
    prevButton.addEventListener('click', prevSlide);

    const selectButton = document.querySelector('.carousel-indicators');
    selectButton.addEventListener('click', getValue);

    window.addEventListener('resize', renderSlide);

})();