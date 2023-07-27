import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchEl } from '../data/elOfServer.js';
import { createSubmitHandler, getUserData } from '../data/util.js';


 const searchTamplete=(shoes,onSearch, params,isUser)=>html`
<section id="search">
          <h2>Search by Brand</h2>

          <form class="search-wrapper cf" @submit=${onSearch}>
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit">Search</button>
          </form>

          <h3>Results:</h3>
          ${params?html`
          <div id="search-container">
            <ul class="card-wrapper">
            ${shoes.length>0?shoes.map(el=>create(el,isUser)):html`
            <h2>There are no results found.</h2> `}
            </ul>
            </div>`:null}
        </section>
        `

export async function searchPage(ctx){
   
  const params=ctx.querystring.split('=')[1];
  let shoes=[];
  if(params){
    shoes=await searchEl(decodeURIComponent(params));
  }
 let isUser=false
  const userData=await getUserData()
        if(userData){
          isUser=true;
        }
        ctx.render(searchTamplete(shoes,createSubmitHandler(onSearch),params,isUser));
          function onSearch({search},form){
            if(search==''){
              return alert('The field mudt be filled')
            }
            ctx.page.redirect('/search?query='+encodeURIComponent(search) );
              form.reset();
          }
}

const create=(shoes,isUser)=>html`
 <li class="card">
                <img src=${shoes.imageUrl} alt="travis" />
                <p>
                  <strong>Brand: </strong><span class="brand">${shoes.brand}</span>
                </p>
                <p>
                  <strong>Model: </strong
                  ><span class="model">${shoes.model}</span>
                </p>
                <p><strong>Value:</strong><span class="value">${shoes.value}</span>$</p>
                ${isUser?html`
                <a class="details-btn" href="/details/${shoes._id}">Details</a>`:null}
                
              </li>
          `