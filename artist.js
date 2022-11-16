// const urlParams = new URLSearchParams(window.location.search);
// const artistID = urlParams.get("artist_id");
async function getArtists() {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/artist/412"
  );
  const artist = await response.json();

  $(document).ready(function () {
    document.querySelector(
      "body > main > div > div.container-fluid > img"
    ).src = artist.picture_xl;

    document.querySelector(
      "body > main > div > div.content-text > div.container-fluid > div > div.container.col-2 > div > div.col > div:nth-child(1) > img"
    ).src = artist.picture_small;

    document.querySelector(
      "body > main > div > div.content-text > div.container-fluid > div > div.container.col-2 > div > div.col > div:nth-child(1) > span"
    ).innerHTML = artist.name;
  });
}

async function getAlbum() {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"
  );
  const album = await response.json();

  $(document).ready(function () {
    document.querySelector(
      "body > main > div > div.content-text > div.container-fluid > div > div.container.col-2 > div > div.album-picture-small.ml-3 > img"
    ).src = album.cover_small;
    document.querySelector(
      "body > main > div > div.content-text > div.container-fluid > div > div.container.col-2 > div > div.col > div:nth-child(2) > h5"
    ).innerHTML = album.title;
  });
}

window.onload = () => {
  getArtists();
  getAlbum();
};
