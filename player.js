const setPlayerImage = (src) => {
    document.querySelector(".player .song img").src = src;
};
const setPlayerTitle = (text) => {
    document.querySelector(".player .song .text h3").innerHTML = text;
};
const setPlayerSubtitle = (text) => {
    document.querySelector(".player .song .text h4").innerHTML = text;
};

const setPlayerProgress = (percentage) => {
    if (!percentage.includes("%")) {
        percentage = `${percentage}%`;
    }
    document
        .querySelector(".progress--bar")
        .style.setProperty("--progress-bar-width", percentage);
};
