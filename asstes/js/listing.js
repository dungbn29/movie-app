/*Buoc 1: Khai bao bien*/
const API_URL_LISING = "https://important-api-render-mauve.vercel.app/products"
const URL = "https://important-api-render-mauve.vercel.app";
/*Buoc 2: Goi du lieu*/
getListingAPI(API_URL_LISING);

async function getListingAPI(api_url) {
    const res = await axios.get(`${api_url}`);
    const data = await res.data;
    showListing(data);
}

/*----Buoc 3: Hien thi du lieu---*/


function showListing(data){
    let htmlCode = ``;
    data.forEach(function(value){
        htmlCode += `
        <div class="col-12 col-sm-6 col-md-3">
            <a href="/detail.html?id=${value.id}">
                <img src="${URL + value.image}" />
            </a>
        </div>
        `;

        // Truy cap phan tu
        const content = document.querySelector('.listing-ecommerce .row');
        content.innerHTML = htmlCode;
    })

}