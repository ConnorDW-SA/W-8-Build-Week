const generateCard = (song) => {};

let randomAlbum = ``;

let defaultSearch = "queen";

const bigCardLayout = `col-md-2`;

let artistsObj = {};

const search = async (text) => {
    const { data } = await request.get(uri + `search?q=${text}`);

    if (data.length) {
        $("#artists, #albums, #songs").html("");
        //is arr
        let artists = [];
        let songs = [];
        let albums = [];

        console.log(data);
        for (const song of data) {
            artists.push(song.artist);
            albums.push(song.album);
            songs.push(song);
        }

        //remove duplicates
        artists = artists.filter(
            (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
        );
        albums = albums.filter(
            (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
        );

        for (const song of songs) {
            if (!artistsObj[song.artist.id]) {
                artistsObj[song.artist.id] = [song.album.id];
            } else {
                artistsObj[song.artist.id].push(song.album.id);
            }
        }

        // randomAlbum = albums[Math.floor(Math.random() * albums.length)].id;

        for (const artist of artists) {
            let randomAlbum =
                artistsObj[artist.id][
                    Math.floor(Math.random() * artistsObj[artist.id].length)
                ];
            let html = `<div class="${bigCardLayout}">
                <a class="big-card artist" href="artistFinish.html?artist_id=${artist.id}&album_id=${randomAlbum}">
                    <img src="${artist.picture}" alt="${artist.name}">
                    <h4>${artist.name}</h4>
                    <h5>Artist</h5>
                </a>
            </div>`;

            $("#artists").append(html);
        }

        for (const album of albums) {
            let html = `<div class="${bigCardLayout}">
                <a class="big-card album" href="album.html?album_id=${album.id}">
                    <img src="${album.cover}" alt="${album.title}">
                    <h4>${album.title}</h4>
                    <h5>Album</h5>
                </a>
            </div>`;

            $("#albums").append(html);
        }

        let fourSongs = songs.slice(1, 5);
        for (const song of fourSongs) {
            let randomAlbum =
                artistsObj[song.artist.id][
                    Math.floor(
                        Math.random() * artistsObj[song.artist.id].length
                    )
                ];
            let html = `<div class="song" onclick="playTrack('${song.id}');">
                <img src="https://e-cdns-images.dzcdn.net/images/artist/${song.md5_image}/120x120-000000-80-0-0.jpg" alt="${song.title}" />
                <div class="details">
                    <h4>${song.title}</h4>
                    <a href="artistFinish.html?artist_id=${song.artist.id}&album_id=${randomAlbum}">${song.artist.name}</a>
                </div>
            </div>`;

            $("#songs").append(html);
        }

        let featuredSong = songs[0];

        $(".showcase img").attr(
            "src",
            `https://e-cdns-images.dzcdn.net/images/artist/${featuredSong.md5_image}/120x120-000000-80-0-0.jpg`
        );

        let randomAlbum =
            artistsObj[featuredSong.artist.id][
                Math.floor(
                    Math.random() * artistsObj[featuredSong.artist.id].length
                )
            ];
        $(".showcase h3").text(featuredSong.title);
        $(".showcase .details a").text(featuredSong.artist.name);
        $(".showcase .details a").attr(
            "href",
            `artistFinish.html?artist_id=${featuredSong.artist.id}&album_id=${randomAlbum}`
        );

        $(".showcase .fa-stack").data("track", featuredSong.id);

        $(".showcase .fa-stack").on("click", function () {
            playTrack($(this).data("track"));
        });
    }
};

$(async function () {
    search(defaultSearch);
});

let timeout;
$("#search-bar").on("keyup", function (event) {
    const val = $(this).val();
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        if (!val || val.length < 1) return;
        search(val);
    }, 750);
});
