import { html } from "../../node_modules/lit-html/lit-html.js";
import { editCard, getCardById } from "../data/cards.js";
import { createSubmitHandler } from "../data/util.js";

const editTamplete=(card,onEdit)=>html`
<section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
                type="text"
                name="name"
                .value=${card.name}
                id="name"
                placeholder="Product Name"
              />
              <input
                type="text"
                name="imageUrl"
                .value=${card.imageUrl}
                id="product-image"
                placeholder="Product Image"
              />
              <input
                type="text"
                name="category"
                .value=${card.category}
                id="product-category"
                placeholder="Category"
              />
              <textarea
                id="product-description"
                name="description"
                .value=${card.description}
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
                type="text"
                name="price"
                .value=${card.price}
                id="product-price"
                placeholder="Price"
              />
              <button type="submit">post</button>
            </form>
          </div>
        </section>

`


export async function editPage(ctx){
const id=ctx.params.id;
const card=await getCardById(id);
ctx.render(editTamplete(card,createSubmitHandler(onEdit)));

async function onEdit({name,imageUrl, category, description, price}){
    if(name==''||imageUrl==''||category==''||description==''||price==''){
        return alert('all fields must be filled')
    }
    await  editCard(id,{name,imageUrl, category, description, price})
    ctx.page.redirect('/catalog')
}
}