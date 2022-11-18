const urlParams = new URLSearchParams(window.location.search);
const track_id = urlParams.get("track_id");

function secondsToTime(s) {
    if (!s) return "0:00";
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

const setPlayerImage = (src) => {
    document.querySelector(".player .song img").src = src;
};
const setPlayerTitle = (text) => {
    document.querySelector(".player .song .text h3").innerHTML = text;
};
const setPlayerSubtitle = (text) => {
    document.querySelector(".player .song .text h4").innerHTML = text;
};

const setPlayerProgress = (percentage, curr, dur) => {
    if (!percentage.includes("%")) {
        percentage = `${percentage}%`;
    }

    curr = secondsToTime(curr);
    dur = secondsToTime(dur);

    document
        .querySelector(".progress--bar")
        .style.setProperty("--progress-bar-width", percentage);

    $(".playback-duration").text(dur);
    $(".playback-position").text(curr);
};

let currTrack;
let int;
let playButton = $("body > div.player > div.controls > div.buttons > span");
let ico = $(
    "body > div.player > div.controls > div.buttons > span > i:last-child"
);

const playTrack = async (trackId, play = true) => {
    const song = await request.get(uri + "track/" + trackId);

    if (song) {
        if (currTrack) {
            currTrack.pause();
        }
        setPlayerImage(
            `https://e-cdns-images.dzcdn.net/images/artist/${song.md5_image}/120x120-000000-80-0-0.jpg`
        );
        setPlayerTitle(song.title);
        setPlayerSubtitle(song.artist.name);

        currTrack = new Audio(song.preview);
        currTrack.volume = 0.4;

        if (play) {
            currTrack.play();
            playButton.data("current", "playing");
            ico.removeClass("fa-play").addClass("fa-pause");
        }

        currTrack.ontimeupdate = function () {
            let total = currTrack.duration;
            let curr = currTrack.currentTime;
            let percent = (100 * curr) / total;
            setPlayerProgress(
                percent.toFixed(2),
                Math.floor(currTrack.currentTime),
                Math.floor(currTrack.duration)
            );
        };
    } else {
        console.error("Invalid track");
    }
};

$(function () {
    playButton.data("current", "paused");

    if (track_id) {
        playTrack(track_id, false);
    }
});

playButton.on("click", function (e) {
    if (!currTrack) return;
    let curr = playButton.data("current");
    if (curr === "paused") {
        currTrack.play();
        playButton.data("current", "playing");
        ico.removeClass("fa-play").addClass("fa-pause");
    } else if (curr === "playing") {
        currTrack.pause();
        playButton.data("current", "paused");
        ico.addClass("fa-play").removeClass("fa-pause");
    }
});
