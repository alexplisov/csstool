"use strict";

// Globals
let id, preview, width, height, topLeft, topRight, bottomLeft, bottomRight, allCorners, borderWidth, borderStyle, snippet, copy, placement, code;

id = 0;
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

// Borders generator
const generateBorders = (w, h, tl, tr, bl, br, bw, s, o) => shape(w, h) + radius(tl, tr, bl, br) + style(bw, s, o);

const shape = (w, h) => `width: ${w}px;\nheight: ${h}px;\n`;

const radius = (tl, tr, bl, br) => `border-radius: ${tl}px ${tr}px ${bl}px ${br}px;\n`;

const style = (bw, s, o) => `${o ? "outline" : "border"}: ${bw}px ${s} #000000;\n`;

// DOM interaction
const appendFigure = () => {
    let figure;
    figure = document.createElement("div");
    figure.id = id++;
    figure.style = generateBorders(width.value, height.value, topLeft.value, topRight.value, bottomLeft.value, bottomRight.value, borderWidth.value, borderStyle.value, placement.checked);
    appendCode();
    preview.appendChild(figure);
};

const renderStyles = () => {
    let figures;
    figures = preview.querySelectorAll("div");

    figures.forEach(e => {
        e.style = generateBorders(width.value, height.value, topLeft.value, topRight.value, bottomLeft.value, bottomRight.value, borderWidth.value, borderStyle.value, placement.checked);
    });

};

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

}

const appendCode = () => {
    snippet.querySelector("code").innerHTML = generateBorders(width.value, height.value, topLeft.value, topRight.value, bottomLeft.value, bottomRight.value, borderWidth.value, borderStyle.value, placement.checked).replace(/\n/g, "<br>");
};

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
    data = data.replace(/(\s)(.*?px)/g, ' <span class="px">$2</span>');
    data = data.replace(/(solid|dashed|dotted)/g, ' <span class="measure">$1</span>');
    data = data.replace(/(#.*)( |;)/g, ' <span class="cl">$1</span>$2');
    code.innerHTML = data;
}

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