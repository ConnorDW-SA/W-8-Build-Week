// Fetching urlParams

const urlParams = new URLSearchParams(window.location.search);
const artist_id = urlParams.get("artist_id");
const album_id = urlParams.get("album_id");

// Fetching artist details from urlParams and inserting details onto page

async function getArtists() {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${artist_id}`
  );
  const artist = await response.json();

  $(".artist-img-large").attr("src", artist.picture_xl);
  $(".display-artist-name").text(artist.name);
  $(".artist-pick-name").text(artist.name);
  $(".artist-pic-tiny").attr("src", artist.picture_small);
}

// Fetching album details from urlParams and inserting details onto page

async function getAlbum() {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/album/${album_id}`
  );
  const album = await response.json();

  $(".artist-pick-album-name").text(album.title);
  $(".album-picture-small").attr("src", album.cover_small);

  $(".album-cover-small").each(function () {
    this.src = album.cover_small;
  });

  const songList = album.tracks.data;
  console.log(songList);
}

// Global variables to be used in loadSongs() function as well as the loadSongs() function to load only 3 onload of page
let x = 0;
let y = 3;
loadSongs();

// Fetching song details and creating rows of songs. Using global variables x & y and loadSongs() to only load 3 onload
// and then running the function again onclick of see-more-button to load rest of songs

async function loadSongs() {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/album/${album_id}`
  );
  const album = await response.json();

  for (let i = x; i < y; i++) {
    const container = document.querySelector(".song-list-container");
    const row = document.createElement("div");
    const songList = album.tracks.data;

    row.innerHTML = `<a href="#" class="a-class-songs"><div class="row justify-content-between my-4 childElement">
                      
                           <div class="row ml-5 text-left w-25 index-selector text-truncate d-block"><img class="" id="playing-gif" src="images/playing.gif" /><img
                          class="mx-3 album-cover-small" src="${album.cover_small}" style="height: 60px" /><span class="mt-2 song-list-text-title">${songList[i].title}</span></div>
                          <div class="rank mt-4 text-right w-25 text-truncate ">Rank ${songList[i].rank}</div>
                          <div class="mr-5 mt-4 text-left w-25 text-truncate ">${songList[i].duration} seconds</div>
                         </div></a>`;
    container.append(row);
  }
  x = y;
  y = y + 15;
}

// Function to hide seemore button onclick

async function showButton() {
  $("#see-less-button").hide();
  $("#see-more-button").click(function () {
    $("#see-more-button").hide();
    $("#see-less-button").show();
  });
}

// Function to reduce list to 3 original 3 items
async function showLessSongs() {
  $("#see-less-button").click(function () {
    $("#see-more-button").show();
    $("#see-less-button").hide();
    const container = document.querySelector(".song-list-container");
    const nodeList = document.querySelectorAll(".childElement");
    container.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      container.appendChild(nodeList[i]);
    }
    x = 3;
    y = 18;
  });
}

async function songPlayingEqualizer() {
  $("#playing-gif").hide();
}
// Loading functions

window.onload = () => {
  getArtists();
  getAlbum();
  showButton();
  showLessSongs();
  songPlayingEqualizer();
};

// ---------------------------------
// ---------------------------------
// ---------------------------------
// ---------------------------------

// Jquery code, couldn't get for loop to more than 1 new item unless appending to HTML created divs inside the song-list-container

// const indexPosition = $(".index-selector").index(this);
//   $(".song-list-container").each(function (i) {
//     this.innerHTML += `<div class="row justify-content-between my-4">

//                        <div class="row ml-5 text-left w-25 index-selector text-truncate d-block"><img class="d-none" id="playing-gif" src="images/playing.gif" /><img
//                       class="mx-3 album-cover-small" src="${album.cover_small}" style="height: 60px" /><span class="mt-2">${songList[i].title}</span></div>
//                       <div class="rank mt-3 text-right w-25 text-truncate ">Rank ${songList[i].rank}</div>
//                       <div class="mr-5 mt-3 text-left w-25 text-truncate ">${songList[i].duration} seconds</div>
//                       </div>`;
//   });
// }
