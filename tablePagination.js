// table data here.
/* 
    This is javaScript is designed for controlling data and its style.
    With the given data, we care about:
    a. How many data (rows).
    b. How to control pages. Here we have 4 rows per page.
    c. We have a counter to count how many pages are there in total.
*/ 
const data = [
    ["Homepage background", "Graphic", "original", "https://gitee.com/Arturia-Windrunner/star-wars-opening-animation"],
    ["Header icon", "Graphic", "resized / reshaped", "https://customstickershop.us/shop/car-decals-clone-trooper-star-wars-sticker/"],
    ["Facebook icon", "Graphic", "resized / reshaped", "https://icons8.com/icon/CtrV2SV33rD9/facebook-circled"],
    ["Instagram icon", "Graphic", "original", "https://icons8.com/icon/ZRiAFreol5mE/instagram"],
    ["Email icon", "Graphic", "original", "https://icons8.com/icon/mXcvtsj8e1Ug/mail"],
    ["Star Wars image", "Graphic", "original", "https://www.inverse.com/article/9079-a-star-wars-primer-all-six-movies-in-synopsis-under-100-words-apiece"],
    ["Movie poster", "Graphic", "cropped", "https://www.polygon.com/2017/4/14/15303976"],
    ["Game poster", "Graphic", "cropped", "https://wallpaperaccess.com/full/2418844.jpg"],
    ["Movie poster", "Graphic", "cropped", "https://megagames.com/games/star-wars-force-unleashed-2"],
    ["Movie posters", "Graphic", "resized / reshaped", "https://www.starwars.com/films"],
    ["Movie infos", "Text", "original", "https://www.starwars.com/films"],
    ["Movie poster", "Graphic", "original", "https://www.wallpaperflare.com/star-wars-character-wallpaper-star-wars-clone-trooper-order-66-clone-commander-wallpaper-209159"],
    ["Gallery poster", "Graphic", "original", "https://c.wallhere.com/photos/62/32/1920x1200_px_Star_Wars_Star_Wars_Episode_VII_The_Force_Awakens-1102491.jpg!d"],
    ["Gallery poster", "Graphic", "original", "https://wallpapercave.com/wp/exigYje.jpg"],
    ["Gallery poster", "Graphic", "original", "https://wallpapercave.com/wp/wp6674197.jpg"],
    ["Gallery poster", "Graphic", "original", "https://wallup.net/wp-content/uploads/2016/03/09/318759-Star_Wars_Episode_VII_-_The_Force_Awakens-stormtrooper-battle-Star_Wars-science_fiction.jpg"],
    ["Gallery poster", "Graphic", "original", "https://www.denofgeek.com/wp-content/uploads/2020/07/star-wars-squadrons-zoom-background.jpg?fit=1920%2C1080"],
    ["Gallery poster", "Graphic", "original", "https://fr.web.img2.acsta.net/medias/nmedia/18/35/83/29/19856961.jpg"],
    ["Gallery poster", "Graphic", "original", "https://wallpaperaccess.com/full/236811.jpg"],
    ["Gallery poster", "Graphic", "original", "https://wallpapercave.com/wp/UENnZSz.jpg"],
    ["Gallery poster", "Graphic", "original", "https://www.fanpop.com/clubs/star-wars/images/30672807/title/star-wars-wallpaper"],
    ["Gallery poster", "Graphic", "original", "https://images4.fanpop.com/image/photos/20700000/Star-Wars-star-wars-20702828-1024-768.jpg"],
    ["Gallery poster", "Graphic", "original", "https://i2.wp.com/MynockManor.com/wp-content/uploads/2018/04/Darth-Vader-Annual-2.jpg"],
    ["Gallery poster", "Graphic", "original", "https://www.laughingplace.com/w/wp-content/uploads/2022/01/from-beskar-to-yuzzum-30-easter-eggs-and-star-wars-references-in-the-book-of-boba-fett-episode-4-8.jpeg"],
    ["Gallery poster", "Graphic", "original", "https://jadensadventures.fandom.com/wiki/Anakin_Skywalker/Darth_Vader"],
    ["Gallery poster", "Graphic", "original", "https://image.tmdb.org/t/p/original/e1nWfnnCVqxS2LeTO3dwGyAsG2V.jpg"],
    ["Weibo icon", "Graphic", "original", "https://icons8.com/icons/set/weibo"],
    ["X icon", "Graphic", "original", "https://icons8.com/icons/set/x"],
    ["External Link", "Website", "original", "https://collider.com/star-wars-all-eras-explained"],
    ["External Link", "Website", "original", "https://starwars.fandom.com/wiki/Star_Wars"],
    ["Homepage Loading background image", "Graphic", "Compressed", "https://www.pngarts.com/explore/90950#google_vignette"],
    ["Homepage BB-8 loading image", "Graphic", "remake", "https://medium.com/the-mvp/animating-bb-8-star-wars-b5ca738c28ea"],
    ["Homepage StarDestroyer Model", "Model", "original", "https://sketchfab.com/3d-models/star-destroyer-b5435fed6c3143f99b56f5de862a05bd"],
    ["Homepage Executor-StarDestroyer Model", "Model", "original", "https://sketchfab.com/3d-models/star-wars-executor-class-star-destroyer-0e4cbb98a2ba43f2a11498061b3f21d8"],
    ["Homepage TieFighter Model", "Model", "original", "https://sketchfab.com/3d-models/star-wars-tieln-fighter-79d9403f15334c129ea5454daffe6b5c"],


];
// four row per page.
let currentPage = 1;
const rowsPerPage = 4;
const totalPages = Math.ceil(data.length / rowsPerPage); // calculate total pages

function renderTable(page) {
    const table = document.getElementById('sourceLogTable');
    table.innerHTML = `<tr>
        <th>Original</th>
        <th>Type</th>
        <th>How Altered or Justification</th>
        <th>Link</th>
    </tr>`; // reset the table and add title

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = data.slice(start, end);

    pageData.forEach(rowData => {
        const row = document.createElement('tr');
        rowData.forEach(cellData => {
            const cell = document.createElement('td');
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    document.getElementById('pageIndicator').textContent = `Page ${currentPage} / ${totalPages}`;
}

// Controlling the pages button.
function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        renderTable(currentPage);
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable(currentPage);
    }
}

document.addEventListener('DOMContentLoaded', () => renderTable(currentPage));
