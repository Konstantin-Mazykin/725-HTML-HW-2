(async () => {

    const response = await fetch('api/norway-landscapes.json');
    const pictures = await response.json();

    /*const slides = [
        '<div><img src="img/port-in-norway-sm.jpg" alt="Port in Norway"></div>',
        '<div><img src="img/iceberg-in-the-sea-sm.jpg" alt="Iceberg in the sea"></div>',
        '<div><img src="img/man-on-the-rock-sm.jpg" alt="Man on the rock"></div>',
        '<div><img src="img/observation-deck-on-the-fjords-sm.jpg" alt="Observation deck on the fjords"></div>',
        '<div><img src="img/village-by-the-lake-sm.jpg" alt="Village by the lake"></div>',
        '<div><img src="img/red-houses-on-the-beach-sm.jpg" alt="Red houses on the beach"></div>',
    ];*/

    let currentSlideIdx = 0;

    function creatingArrayOfImages (pictures) {
        const arrayOfImages = [];
        for (const picture of pictures) {
            let valueOfArray = '<div><img src="${pictures.image}" alt="${pictures.title}"></div>'
            arrayOfImages.push(valueOfArray);
        }
        return arrayOfImages;
    }

    const slides = creatingArrayOfImages (images);
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
        renderButtons();
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

    renderSlide();
    
    const nextButton = document.querySelector('.stunning-spots__carousel .stunning-spots__carousel_btn-next');
    nextButton.addEventListener('click', nextSlide);

    const prevButton = document.querySelector('.stunning-spots__carousel .stunning-spots__carousel_btn-prev');
    prevButton.addEventListener('click', prevSlide);

    const selectButton = document.querySelector('.carousel-indicators');
    selectButton.addEventListener('click', getValue);

})();