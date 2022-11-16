const urlParams = new URLSearchParams(window.location.search);
const artistID = urlParams.get("artist_id");
async function getArtists() {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}"
  );

  const artists = await response.json();
  return artists;
}
window.onload = () => {
  getArtists();
};
