import { removeTieFighters, modelsLoaded, displayModels } from './tieFighter.js';

document.addEventListener('DOMContentLoaded', function() {
    // "byline" element for "Comp6780 Website"
    var bylineElement = document.getElementById('byline');
    if (bylineElement) {
        var bylineTextContent = bylineElement.innerText;
        var bylineCharacters = bylineTextContent.split('');
        bylineElement.innerText = '';
        var spanEl, charNode;
        bylineCharacters.forEach(function(char) {
            spanEl = document.createElement('span');
            charNode = document.createTextNode(char);
            if (char === ' ') {
                bylineElement.appendChild(charNode);
            } else {
                spanEl.appendChild(charNode);
                bylineElement.appendChild(spanEl);
            }
        });
    } else {
        console.error('Element with ID "byline" does not exist.');
    }
});

function fadeIn(element, duration) {
    return new Promise((resolve) => {
        element.style.opacity = 0;
        element.style.display = 'block';

        let op = 0;
        const interval = 50;
        const increment = interval / duration;

        const fadingIn = setInterval(() => {
            if (op >= 1) {
                clearInterval(fadingIn);
                resolve();
            } else {
                op += increment;
                element.style.opacity = op;
            }
        }, interval);
    });
}

function fadeOut(element, duration) {
    return new Promise((resolve) => {
        let op = 1;
        const interval = 50;
        const decrement = interval / duration;

        const fadingOut = setInterval(() => {
            if (op <= 0) {
                clearInterval(fadingOut);
                element.style.display = 'none';
                resolve();
            } else {
                op -= decrement;
                element.style.opacity = op;
            }
        }, interval);
    });
}

function handleAnimationEnd() {
    document.querySelector('.byline').removeEventListener('animationend', handleAnimationEnd);

    document.getElementById('index-demo-page').style.display = 'none';

    fadeIn(document.getElementById('index-author-text'), 1000)
        .then(() => {
            return new Promise((resolve) => setTimeout(resolve, 6000));
        })
        .then(() => fadeOut(document.getElementById('index-author-text'), 2000))
        .then(() => {
            return Promise.all([
                showFinalState()
            ]);
        });
}

document.querySelector('.byline').addEventListener('animationend', handleAnimationEnd);

// If Space pressed, skip animation
function skipAnimation() {
    document.querySelector('.byline').removeEventListener('animationend', handleAnimationEnd);
    showFinalState();
}

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 32) {
        skipAnimation();
    }
});

const r2d2 = document.getElementById('R2D2');

// Final State for index.html (homepage website)
function showFinalState() {
    document.getElementById('index-demo-page').style.display = 'none';
    document.getElementById('index-author-text').style.display = 'none';
    document.getElementById('index-author-container').style.display = 'none';
    document.getElementById('index-header').style.display = 'block';
    document.getElementById('index-skip').style.display = 'none';
    document.getElementById('CTA-session').style.display = 'block';

    document.body.style.backgroundImage = "url('./img/CTA-background.jpg')";
    document.body.style.backgroundSize = "cover";
    removeTieFighters();
    moveR2D2();
}

// Set initial R2D2 position
r2d2.style.left = window.innerWidth * 0.5 + 'px';

const targetPosition = window.innerWidth * 0.9;

function moveR2D2() {
    let currentLeft = parseFloat(r2d2.style.left);
    const step = 5;
    const interval = 16; // 16ms approximately equals to 60fps

    function move() {
        if (currentLeft < targetPosition) {
            currentLeft += step;
            r2d2.style.left = `${currentLeft}px`;
            setTimeout(move, interval);
        }
    }
    move();
}

const myButton = document.getElementById('myButton');

myButton.addEventListener('click', function() {
    window.location.href = 'sessions.html';
});

// Check if model loaded
const checkModelsLoaded = () => {
    if (modelsLoaded) {
        displayModels();
        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    } else {
        requestAnimationFrame(checkModelsLoaded);
    }
};
checkModelsLoaded();
