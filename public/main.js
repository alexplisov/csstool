"use strict";

// Globals
let preview, width, height, topLeft, topRight, bottomLeft, bottomRight, allCorners, borderWidth, borderStyle, snippet, copy, placement, code, objectSection, shadowSection, colorSection, animationSection, shadowOn, inset, xshift, yshift, blur, stretch, redShadow, greenShadow, blueShadow, alphaShadow, colorOn, redBackground, greenBackground, blueBackground, alphaBackground, redBorder, greenBorder, blueBorder, alphaBorder;

preview = document.querySelector("#preview");
width = document.querySelector('#width input[type="number"]');
height = document.querySelector('#height input[type="number"]');
topLeft = document.querySelector('#topLeft input[type="number"]');
topRight = document.querySelector('#topRight input[type="number"]');
allCorners = document.querySelector('#allCorners input[type="checkbox"]');
bottomLeft = document.querySelector('#bottomLeft input[type="number"]');
bottomRight = document.querySelector('#bottomRight input[type="number"]');
borderWidth = document.querySelector('#borderWidth input[type="number"]');
borderStyle = document.querySelector('#borderStyle select');
snippet = document.querySelector("#snippet");
copy = document.querySelector("#snippet button");
placement = document.querySelector('#placement input[type="checkbox"]');
code = document.querySelector("code");
objectSection = document.querySelector("#object-settings");
shadowSection = document.querySelector("#shadow-settings");
colorSection = document.querySelector("#color-settings");
animationSection = document.querySelector("#animation-settings");

shadowOn = document.querySelector('#shadowOn input[type="checkbox"]');
inset = document.querySelector('#inset input[type="checkbox"]');
xshift = document.querySelector('#xShift input[type="number"]');
yshift = document.querySelector('#yShift input[type="number"]');
blur = document.querySelector('#blurShadow input[type="number"]');
stretch = document.querySelector('#stretchShadow input[type="number"]');
redShadow = document.querySelector('#redShadow input[type="number"]');
greenShadow = document.querySelector('#greenShadow input[type="number"]');
blueShadow = document.querySelector('#blueShadow input[type="number"]');
alphaShadow = document.querySelector('#alphaShadow input[type="number"]');

colorOn =  document.querySelector('#colorOn input[type="checkbox"]');
redBackground = document.querySelector('#redBackground input[type="number"]');
greenBackground =  document.querySelector('#greenBackground input[type="number"]');
blueBackground = document.querySelector('#blueBackground input[type="number"]');
alphaBackground = document.querySelector('#alphaBackground input[type="number"]');
redBorder =  document.querySelector('#redBorder input[type="number"]');
greenBorder = document.querySelector('#greenBorder input[type="number"]');
blueBorder =  document.querySelector('#blueBorder input[type="number"]');
alphaBorder =  document.querySelector('#alphaBorder input[type="number"]');

// Borders generator
const generateBorders = (w, h, tl, tr, bl, br, bw, s, o, on, inset, xshift, yshift, blur, stretch, red, green, blue, alpha, colorOn, redBackground, greenBackground, blueBackground, alphaBackground, redBorder, greenBorder, blueBorder, alphaBorder) => shape(w, h) + radius(tl, tr, bl, br) + style(bw, s, o, colorOn, redBorder, greenBorder, blueBorder, alphaBorder) + shadow(on, inset, xshift, yshift, blur, stretch, red, green, blue, alpha) + color(colorOn, redBackground, greenBackground, blueBackground, alphaBackground);

const shape = (w, h) => `width: ${w}px;\nheight: ${h}px;\n`;

const radius = (tl, tr, bl, br) => `border-radius: ${tl}px ${tr}px ${br}px ${bl}px;\n`;

const style = (bw, s, o, colorOn, redBorder, greenBorder, blueBorder, alphaBorder) => `${o ? "outline" : "border"}: ${bw}px ${s}${colorOn? ` #${dth(redBorder)}${dth(greenBorder)}${dth(blueBorder)}${dth(alphaBorder)}` : ""};\n`;

const shadow = (on, inset, xshift, yshift, blur, stretch, red, green, blue, alpha) => on ? "box-shadow: " + (inset ? "inset " : "") + `${xshift}px ${yshift}px ${blur}px ${stretch}px #${dth(red)}${dth(green)}${dth(blue)}${dth(alpha)};\n` : "";

const color = (colorOn, redBackground, greenBackground, blueBackground, alphaBackground) => colorOn ? `background-color: #${dth(redBackground)}${dth(greenBackground)}${dth(blueBackground)}${dth(alphaBackground)};\n` : "";

const dth = str => { 
    let n = parseInt(str, 10).toString(16);
    return n.length > 1 ? n : "0" + n;
};

// DOM interaction
const appendFigure = () => {
    let figure;
    figure = document.createElement("div");
    figure.id = "previewDiv";
    figure.style = generateBorders(
        width.value,
        height.value,
        topLeft.value,
        topRight.value,
        bottomLeft.value,
        bottomRight.value,
        borderWidth.value,
        borderStyle.value,
        placement.checked,
        shadowOn.checked,
        inset.checked,
        xshift.value,
        yshift.value,
        blur.value,
        stretch.value,
        redShadow.value,
        greenShadow.value,
        blueShadow.value,
        alphaShadow.value,
        colorOn.checked,
        redBackground.value,
        greenBackground.value,
        blueBackground.value,
        alphaBackground.value,
        redBorder.value,
        greenBorder.value,
        blueBorder.value,
        alphaBorder.value

    ) + (colorOn.checked ? "" : " border-color: #608de0;\noutline-color: #608de0;");
    appendCode();
    preview.appendChild(figure);
};

// Applies styles to preview element
const renderStyles = () => {
    let figures;
    figures = preview.querySelectorAll("div");

    figures.forEach(e => {
        e.style = generateBorders(
            width.value,
            height.value,
            topLeft.value,
            topRight.value,
            bottomLeft.value,
            bottomRight.value,
            borderWidth.value,
            borderStyle.value,
            placement.checked,
            shadowOn.checked,
            inset.checked,
            xshift.value,
            yshift.value,
            blur.value,
            stretch.value,
            redShadow.value,
            greenShadow.value,
            blueShadow.value,
            alphaShadow.value,
            colorOn.checked,
            redBackground.value,
            greenBackground.value,
            blueBackground.value,
            alphaBackground.value,
            redBorder.value,
            greenBorder.value,
            blueBorder.value,
            alphaBorder.value
        )  + (colorOn.checked ? "" : " border-color: #608de0;\noutline-color: #608de0;");
    });

};

// Links range and number values
const linkElementsValues = e => {

    switch (e.target.type) {
        case "number":
            e.target.parentElement.querySelector('input[type="range"]').value = +e.target.value;
            break;
        case "range":
            e.target.parentElement.querySelector('input[type="number"]').value = +e.target.value
            break;
    }

    if (allCorners.checked && e.target.parentElement.className.indexOf("corner") !== -1) {
        topLeft.value = +e.target.value;
        topLeft.parentElement.querySelector('input[type="range"]').value = +e.target.value;
        topRight.value = +e.target.value;
        topRight.parentElement.querySelector('input[type="range"]').value = +e.target.value;
        bottomLeft.value = +e.target.value;
        bottomLeft.parentElement.querySelector('input[type="range"]').value = +e.target.value;
        bottomRight.value = +e.target.value;
        bottomRight.parentElement.querySelector('input[type="range"]').value = +e.target.value;
    }

};

// Wrapper to call all needed functions on value change
const changeEvent = e => {
    linkElementsValues(e);
    renderStyles();
    appendCode();
    highlight();
};

const addListenersToFieldGroups = () => {

    document.querySelectorAll(".field-group").forEach(e => {
        e.addEventListener("input", changeEvent);
    });

    document.querySelectorAll('.switch input[type="checkbox"]').forEach(e => {
        e.addEventListener("click", changeEvent);
    });

};

// Appends calculated code into code element
const appendCode = () => {
    snippet.querySelector("code").innerHTML = generateBorders(
        width.value,
        height.value,
        topLeft.value,
        topRight.value,
        bottomLeft.value,
        bottomRight.value,
        borderWidth.value,
        borderStyle.value,
        placement.checked,
        shadowOn.checked,
        inset.checked,
        xshift.value,
        yshift.value,
        blur.value,
        stretch.value,
        redShadow.value,
        greenShadow.value,
        blueShadow.value,
        alphaShadow.value,
        colorOn.checked,
        redBackground.value,
        greenBackground.value,
        blueBackground.value,
        alphaBackground.value,
        redBorder.value,
        greenBorder.value,
        blueBorder.value,
        alphaBorder.value
    ).replace(/\n/g, "<br>");
};

// Initializes values for inputs
const setupInputs = () => {

    document.querySelectorAll(".field-group").forEach(e => {
        let r = e.querySelector('input[type=range]');
        let n = e.querySelector('input[type="number"]');
        if (r && n) {
            r.value = n.value;
        }
    });

};

// syntax highlighting
const highlight = () => {
    let data = code.innerHTML;
    data = data.replace(/(\s)(.{0,3}?px)/g, ' <span class="px">$2</span>');
    data = data.replace(/(solid|dashed|dotted|inset)/g, ' <span class="measure">$1</span>');
    data = data.replace(/(#.{6,8})(;)/g, ' <span class="cl">$1</span>$2');
    code.innerHTML = data;
};

const showSection = () => {

    document.querySelectorAll("main > section").forEach(e => {
        e.style.display = "none";
        document.querySelectorAll("aside nav ul li a").forEach(e => e.className = "");
    });

    switch (window.location.hash) {
        case "#object":
            objectSection.style.display = "grid";
            document.querySelector("#object").className = "focused";
            break;
        case "#shadow":
            shadowSection.style.display = "grid";
            document.querySelector("#shadow").className = "focused";
            break;
        case "#color":
            colorSection.style.display = "grid";
            document.querySelector("#color").className = "focused";
            break;
        case "#animation":
            animationSection.style.display = "grid";
            document.querySelector("#animation").className = "focused";
            break;
        default:
            objectSection.style.display = "grid";
            document.querySelector("#object").className = "focused";
            break;
    }
};

// main
addListenersToFieldGroups();

copy.addEventListener("click", () => {
    window.getSelection().removeAllRanges();
    let range = document.createRange();
    range.selectNode(snippet.querySelector("code"));
    window.getSelection().addRange(range);
    document.execCommand("Copy");
});

appendFigure();
setupInputs();
highlight();
window.onload = showSection;
window.onhashchange = showSection;