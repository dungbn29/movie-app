// buoc 1: khai bao bien
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

// buoc 2: Goi du lieu
getMoviesAPI(API_URL); // Thuc thi function getMoviesAPI
async function getMoviesAPI(API_URL) {
    const res = await axios.get(`${API_URL}`); //Chung
    const data = await res.data.results; // khac nhau
    showMovie(data);
}

// Buoc 3: hien thi du lieu ra ben ngoai 

function showMovie(data) {
    htmlCode='';
    data.forEach(function (value, index) {
        
        htmlCode += `<div class="col-12 col-sm-6 col-md-3">
        <div class="item">
          <div class="box-image">
            <img src="${IMG_PATH + value.poster_path}" />
          </div>
          <div class="box-content">
            <h3 class="title-film">${value.title}</h3>
            <p class="rating ${colorRating(value.vote_average)}">${value.vote_average}</p>
          </div>

          <div class="box-description">
            <h4>Overview</h4>
            <p>${value.overview}</p>
          </div>
        </div>
      </div>`;

        // truy cap phan tu
        const content = document.querySelector('.listing-product .row');
        console.log(content);
        content.innerHTML = htmlCode;
    });
}

// buoc 4: thay doi mau rating
function colorRating(rate) {
    if (rate > 7) {
        return 'good';
    }
    else if (rate > 5.5) {
        return 'normal';
    } else {
        return 'bad';
    }
}

// bước 5: làm ô search 
const elementForm = document.querySelector('.form');
const elementInput = document.querySelector('.input-form');

elementForm.addEventListener('submit',function(e){
    e.preventDefault();

    // gia tri ng nhap
    const valueInput = elementInput.value;
    if (valueInput && valueInput !== '') {
        getMoviesAPI(SEARCH_API + valueInput);
        elementInput.value = '';
    } else{
        window.location.reload();
    }
});

// buoc 6: Tao Load more
const loadMore = document.querySelector('.btn-next');

let currentPage = 1;

loadMore.addEventListener('click',function () {
    currentPage ++;
    const api_loadmore = `${API_URL}&page=${currentPage}`;
    getMoviesAPI(api_loadmore)
})

// back page
const loadBack = document.querySelector('.btn-pre');

loadBack.addEventListener('click',function () {
    currentPage --;
    if (currentPage < 1) {
        currentPage ++;
        return alert('No More Page');
    } else {
        const api_backpage = `${API_URL}&page=${currentPage}`;
        getMoviesAPI(api_backpage);
        console.log(currentPage);
    }
})