function slider({container, slides, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // slider
    const prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          current = document.querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          slide = document.querySelectorAll(slides),
          slideWindow = document.querySelector(field),
          slideWrapper = document.querySelector(wrapper),
          width = window.getComputedStyle(slideWrapper).width,
          slider = document.querySelector(container);

    let slideNumber = 1;
    let offset = 0;

    if (slide.length < 10) {
        total.textContent = `0${slide.length}`;
        current.textContent = `0${slideNumber}`;
    } else {
        total.textContent = slide.length;
        current.textContent = slideNumber;
    }

    function addNull() {
        if (slide.length < 10) {
            current.textContent = `0${slideNumber}`;
        } else {
            current.textContent = slideNumber;
        }
    }

    function activeDots() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideNumber - 1].style.opacity = 1;
    }

    slideWindow.style.width = 100 * slide.length + '%';
    slideWindow.style.display = 'flex';
    slideWindow.style.transition = '0.5s all';
    slideWrapper.style.overflow = 'hidden';

    slide.forEach(slide => {
        slide.style.width = width;
    });

    function deleteNotNumbers(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotNumbers(width) * (slide.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotNumbers(width);
        }

        slideWindow.style.transform = `translateX(-${offset}px)`;

        if (slideNumber == slide.length) {
            slideNumber = 1;
        } else {
            slideNumber++;
        }
        
        addNull();
        activeDots();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotNumbers(width) * (slide.length - 1);
        } else {
            offset -= deleteNotNumbers(width);
        }

        slideWindow.style.transform = `translateX(-${offset}px)`;

        if (slideNumber == 1) {
            slideNumber = slide.length;
        } else {
            slideNumber--;
        }
        
        addNull();
        activeDots();
    });

    slider.style.position = 'relative';

    const dotWrapper = document.createElement('ol'),
          dots = [];

    dotWrapper.classList.add('carousel-indicators');
    dotWrapper.style.cssText =`
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(dotWrapper);

    for (let i = 0; i < slide.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText =`
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }

        dotWrapper.append(dot);
        dots.push(dot);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideNumber = slideTo;
            offset = deleteNotNumbers(width) * (slideTo - 1);

            slideWindow.style.transform = `translateX(-${offset}px)`;

            addNull();
            activeDots();
        });
    });
}

export default slider;