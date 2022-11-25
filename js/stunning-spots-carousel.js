(() => {
    const slides = [
        '<div><img src="img/port-in-norway.jpg" alt="Port in Norway"></div>',
        '<div><img src="img/iceberg-in-the-sea.jpg" alt="Iceberg in the sea"></div>',
        '<div><img src="img/man-on-the-rock.jpg" alt="Man on the rock"></div>',
        '<div><img src="img/observation-deck-on-the-fjords.jpg" alt="Observation deck on the fjords"></div>',
        '<div><img src="img/village-by-the-lake.jpg" alt="Village by the lake"></div>',
        '<div><img src="img/red-houses-on-the-beach.jpg" alt="Red houses on the beach"></div>',
    ]

    let currentSlideIdx = 0;

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
        currentSlideIdx = parseInt(btn.target.value) - 1;
        renderSlide();
    }

    renderSlide();

    const nextButton = document.querySelector('.stunning-spots__carousel .stunning-spots__carousel_btn-next');
    nextButton.addEventListener('click', nextSlide);

    const prevButton = document.querySelector('.stunning-spots__carousel .stunning-spots__carousel_btn-prev');
    prevButton.addEventListener('click', prevSlide);

    const selectButton01 = document.querySelector('.carousel-indicators .carousel-button-01');
    selectButton01.addEventListener('click', getValue);

    const selectButton02 = document.querySelector('.carousel-indicators .carousel-button-02');
    selectButton02.addEventListener('click', getValue);

    const selectButton03 = document.querySelector('.carousel-indicators .carousel-button-03');
    selectButton03.addEventListener('click', getValue);

    const selectButton04 = document.querySelector('.carousel-indicators .carousel-button-04');
    selectButton04.addEventListener('click', getValue);

    const selectButton05 = document.querySelector('.carousel-indicators .carousel-button-05');
    selectButton05.addEventListener('click', getValue);

    const selectButton06 = document.querySelector('.carousel-indicators .carousel-button-06');
    selectButton06.addEventListener('click', getValue);

    window.addEventListener('resize', renderSlide);

})();