const urlParams = new URLSearchParams(window.location.search);
const artist_id = urlParams.get("artist_id");
const album_id = urlParams.get("album_id");

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
let x = 0;
let y = 3;
loadSongs();

async function loadSongs() {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/album/${album_id}`
  );
  const album = await response.json();

  for (let i = x; i < y; i++) {
    const container = document.querySelector(".song-list-container");
    const row = document.createElement("div");
    const songList = album.tracks.data;

    row.innerHTML = `<div class="row justify-content-between my-4">
                      
                           <div class="row ml-5 text-left w-25 index-selector text-truncate d-block"><img class="d-none" id="playing-gif" src="images/playing.gif" /><img
                          class="mx-3 album-cover-small" src="${album.cover_small}" style="height: 60px" /><span class="mt-2">${songList[i].title}</span></div>
                          <div class="rank mt-3 text-right w-25 text-truncate ">Rank ${songList[i].rank}</div>
                          <div class="mr-5 mt-3 text-left w-25 text-truncate ">${songList[i].duration} seconds</div>
                         </div>`;
    container.prepend(row);
  }
  x = y;
  y = y + 20;
}
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

window.onload = () => {
  getArtists();
  getAlbum();
};
