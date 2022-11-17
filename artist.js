const urlParams = new URLSearchParams(window.location.search);
const artist_id = urlParams.get("artist_id");
const album_id = urlParams.get("album_id");
async function getArtists() {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${artist_id}`
  );
  const artist = await response.json();

  $(document).ready(function () {
    $(".artist-img-large").attr("src", artist.picture_xl);
    $(".display-artist-name").text(artist.name);
    $(".artist-pick-name").text(artist.name);
    $(".artist-pic-tiny").attr("src", artist.picture_small);
  });
}

async function getAlbum() {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/album/${album_id}`
  );
  const album = await response.json();

  $(document).ready(function () {
    $(".artist-pick-album-name").text(album.title);
    document.querySelector(
      "body > main > div > div.content-text > div.container-fluid > div > div.container.col-2 > div > div.album-picture-small.ml-3 > img"
    ).src = album.cover_small;
    $(".album-cover-small").each(function () {
      this.src = album.cover_small;
    });
  });
}

async function getSongs() {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/album/${album_id}`
  );
  const album = await response.json();
  const songList = album.tracks.data;
  console.log(songList);
  $(document).ready(function () {
    $(".track-name-list").each(function (i) {
      this.innerHTML = songList[i].title;
    });
  });
}

window.onload = () => {
  getArtists();
  getAlbum();
  getSongs();
};
