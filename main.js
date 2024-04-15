// Open and close setting
const styleSwitcherToggler = document.getElementsByClassName('style-switcher-toggler')[0];
styleSwitcherToggler.addEventListener('click', () => {
    document.getElementsByClassName('style-switcher')[0].classList.toggle('open');
});
window.addEventListener('scroll', () => {
    if (document.getElementsByClassName('style-switcher')[0].classList.contains('open')) {
        document.getElementsByClassName('style-switcher')[0].classList.remove('open');
    }
});

// Click to change theme color
const alternateStyles = document.getElementsByClassName('alternate-style');
function setActiveStyle(color) {
    Array.prototype.forEach.call(alternateStyles, style => {
        if (color === style.getAttribute('title')) {
            style.removeAttribute('disabled');
            window.localStorage.setItem('theme', color);
        }
        else style.setAttribute('disabled', 'true');
    });
}
window.addEventListener('load', () => {
    const themeColor = window.localStorage.getItem('theme') || 'color-1';
    Array.prototype.forEach.call(alternateStyles, style => {
        if (themeColor === style.getAttribute('title')) style.removeAttribute('disabled');
        else style.setAttribute('disabled', 'true');
    });
});

// Click to change dark/light mode
const dayNight = document.getElementsByClassName('day-night')[0];
dayNight.addEventListener('click', () => {
    if (document.body.classList.contains('dark')) window.localStorage.setItem('mode', 'light');
    else window.localStorage.setItem('mode', 'dark');
    dayNight.getElementsByTagName('span')[0].classList.toggle('fa-sun');
    dayNight.getElementsByTagName('span')[0].classList.toggle('fa-moon');
    document.body.classList.toggle('dark');
});
window.addEventListener('load', () => {
    const mode = window.localStorage.getItem('mode') || 'dark';
    if (mode === 'dark') {
        dayNight.getElementsByTagName('span')[0].classList.add('fa-sun');
        document.body.classList.add('dark');
    } else {
        dayNight.getElementsByTagName('span')[0].classList.add('fa-moon');
    }
});

// Load and display id position in aside
const pageList = [
    document.getElementById('home'),
    document.getElementById('about'),
    document.getElementById('service'),
    document.getElementById('portfolio'),
    document.getElementById('contact')
];
const pageScrollPos = [];
for (let i = 0; i < pageList.length; i++) {
    const arr = [];
    arr.push(Math.floor(pageList[i].getBoundingClientRect().top) + window.scrollY);
    if (i < pageList.length - 1) {
        arr.push(Math.floor(pageList[i + 1].getBoundingClientRect().top) + window.scrollY)
    }
    else arr.push(Math.floor(pageList[i].getBoundingClientRect().bottom) + window.scrollY);
    pageScrollPos.push(arr);
};
const navItem = document.querySelectorAll('.nav>li>a');
window.addEventListener('load', () => {
    for (let i = 0; i < pageScrollPos.length; i++) {
        if (window.scrollY < pageScrollPos[i][1]) { navItem[i].classList.add('active'); break }
    }
});
window.addEventListener('scroll', () => {
    for (let i = 0; i < pageScrollPos.length; i++) {
        if (window.scrollY < pageScrollPos[i][1] && window.scrollY + 1 > pageScrollPos[i][0]) {
            navItem[i].classList.add('active');
        } else {
            navItem[i].classList.remove('active');
        }
    }
});

/***** Typing Animation *****/
const typed = new Typed('.typing', {
    strings: ['Web Developer', 'Web Designer'],
    typeSpeed: 100,
    backSpeed: 60,
    smartBackspace: false,
    loop: true
});

/***** Logo Animation *****/
const logo = document.getElementsByClassName('logo')[0];
window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
        logo.classList.add('anim-logo');
        setTimeout(() => { logo.classList.remove('anim-logo') }, 2000);
    }
});
window.addEventListener('load', () => {
    logo.classList.add('anim-logo');
    setTimeout(() => { logo.classList.remove('anim-logo') }, 2000);
});

/***** Title Animation *****/
const titleList = document.getElementsByClassName('section-title');
const clientHeight = document.documentElement.clientHeight;
const isAnim = [];
const titlePos = [];
for (let i = 0; i < pageScrollPos.length; i++) {
    if (i !== 0) {
        titlePos.push(pageScrollPos[i][0]);
        isAnim.push(true);
    }
};
window.addEventListener('scroll', () => {
    for (let i = 0; i < titlePos.length; i++) {
        if (
            window.scrollY >= titlePos[i] &&
            window.scrollY < titlePos[i] + clientHeight * 1 / 2 &&
            isAnim[i]
        ) {
            titleList[i].classList.add('anim-title');
            setTimeout(() => { titleList[i].classList.remove('anim-title') }, 3700);
            isAnim[i] = false;
        }
    }
    console.log(isAnim)
});

/***** Items display animation *****/
const itemArr = [
    document.getElementsByClassName('service-item'),
    document.getElementsByClassName('portfolio-item'),
    document.getElementsByClassName('contact-info-item')
];
const itemPosArr = [
    pageScrollPos[2][0],
    pageScrollPos[3][0],
    pageScrollPos[4][0]
];
window.addEventListener('load', () => {
    for (let i = 0; i < itemPosArr.length; i++) {
        if (window.scrollY <= itemPosArr[i]) {
            Array.prototype.forEach.call(itemArr[i], item => {
                item.classList.add('hidden');
            })
        }
    }
});
window.addEventListener('scroll', () => {
    setTimeout(() => {
        for (let i = 0; i < itemPosArr.length; i++) {
            if (
                window.scrollY >= itemPosArr[i] &&
                window.scrollY < itemPosArr[i] + clientHeight * 1 / 2
            ) {
                Array.prototype.forEach.call(itemArr[i], (item, i) => {
                    setTimeout(() => {
                        item.classList.remove('hidden');
                        item.classList.add('anim-item');
                    }, 500 * i)
                })
            }
        }
    }, 3000);
});

// Email EmailJS API
(function () {
    emailjs.init('UPcNY7reKY3kwcC8J');
})();
window.addEventListener('load', () => {
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const messageObj = {
            from_name: document.getElementById('from-name').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            from_email: document.getElementById('from-email').value
        };
        emailjs.send('service_9i1g0fb', 'template_zl13wm1', messageObj)
            .then(() => {
                contactForm.reset();
                alert('Your message has been sent!');
            }, err => {
                alert('')
            })
    });
});