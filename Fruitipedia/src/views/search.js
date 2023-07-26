import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchEl } from '../data/elOfServer.js';
import { createSubmitHandler, getUserData } from '../data/util.js';


 const searchTamplete=(fruits,onSearch, params)=>html`
        
        
        <section id="search">

        <div class="form">
          <h2>Search</h2>
          <form class="search-form" @submit=${onSearch}>
            <input
              type="text"
              name="search"
              id="search-input"
              velue=${params}
            />
            <button class="button-list">Search</button>
          </form>
        </div>
        <h4>Results:</h4>
        ${params?html`
        <div class="search-result">
            ${fruits.length>0?fruits.map(create):html`
            <div>
            <p class="no-result">No result.</p></div>`}
            </div>`
            :null}
         
                </section>`

export async function searchPage(ctx){
   
  const params=ctx.querystring.split('=')[1];
  let fruits=[];
  if(params){
    fruits=await searchEl(decodeURIComponent(params));
  }
  let isUser=false;
  const userData=await getUserData()
        if(userData){
            isUser=true;
        }
        ctx.render(searchTamplete(fruits,createSubmitHandler(onSearch),params));
          function onSearch({search},form){
            if(search!=''){
              ctx.page.redirect('/search?query='+encodeURIComponent(search) );
              form.reset();
            }
          }
}

const create=(fruit,isUser)=>html`
<div class="fruit">
          <img src="${fruit.imageUrl}" alt="example1" />
          <h3 class="title">${fruit.name}</h3>
          <p class="description">${fruit.description}</p>
          <a class="details-btn" href="/details/${fruit._id}">More Info</a>
        </div>
          `