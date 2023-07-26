import { html } from "../../node_modules/lit-html/lit-html.js";
import { addCard } from "../data/cards.js";
import { createSubmitHandler } from "../data/util.js";

const createTemplate = (onCreate) => html`
 <section id="create">
          <div class="form">
            <h2>Add Product</h2>
            <form class="create-form" @submit=${onCreate}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
              />

              <button type="submit">Add</button>
            </form>
          </div>
        </section>
`

export async function createPage(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onCreate)))

  async function onCreate({ name, imageUrl, category, description, price }) {
    if (name == '' || imageUrl == '' || category == '' || description == '' || price == '') {
      return alert('all fields must be filled');
    }
    await addCard({ name, imageUrl, category, description, price })
    ctx.page.redirect('/catalog');
  }
}