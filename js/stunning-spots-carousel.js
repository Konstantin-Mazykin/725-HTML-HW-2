(async () => {

    const response = await fetch('api/norway-landscapes.json');
    const pictures = await response.json();

    function creatingArrayOfImages(pictures) {
        const arrayOfImages = [];
        for (const picture of pictures) {
            arrayOfImages.push(`<div><img src="${picture.image}" id="carousel_img_${picture.id}" alt="${picture.title}"></div>`);
        }
        return arrayOfImages;
    }

    const slides = creatingArrayOfImages(pictures);

    const modalWindow = document.querySelector('.stunning-spots__modal_window');
    let currentSlideIdx = 0;
    let pictureID = 0;

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

    function openModalWindow(pict) {
        const pushPictureID = pict.target.id;
        if (pushPictureID === "") return;
        pictureID = parseInt(pushPictureID.slice(13));
        viewImageInModalWindow();
        modalWindow.classList.add('open');
    }

    function viewImageInModalWindow() {
        const zoomContainer = document.querySelector('.stunning-spots__modal_window_content');
        zoomContainer.innerHTML = slides[pictureID];
    }

    function nextImageInModalWindow() {
        pictureID++;
        if (pictureID >= slides.length) pictureID = 0;
        viewImageInModalWindow();
    }

    function prevImageInModalWindow() {
        pictureID--;
        if (pictureID < 0) pictureID = slides.length - 1;
        viewImageInModalWindow();
    }

    function closeModalWindow() {
        modalWindow.classList.remove('open');
    }

    const nextButton = document.querySelector('.stunning-spots__carousel .stunning-spots__carousel_btn-next');
    nextButton.addEventListener('click', nextSlide);

    const prevButton = document.querySelector('.stunning-spots__carousel .stunning-spots__carousel_btn-prev');
    prevButton.addEventListener('click', prevSlide);

    const selectButton = document.querySelector('.carousel-indicators');
    selectButton.addEventListener('click', getValue);

    const selectPicture = document.querySelector('.stunning-spots__carousel_slide-container');
    selectPicture.addEventListener('click', openModalWindow);

    const nextButtonInModalWindow = document.querySelector('.stunning-spots__modal_window_next');
    nextButtonInModalWindow.addEventListener('click', nextImageInModalWindow);

    const prevButtonInModalWindow = document.querySelector('.stunning-spots__modal_window_prev');
    prevButtonInModalWindow.addEventListener('click', prevImageInModalWindow);

    const closeModalWindows = document.querySelector('.stunning-spots__modal_window_close');
    closeModalWindows.addEventListener('click', closeModalWindow);

    window.addEventListener('resize', renderSlide);

})();