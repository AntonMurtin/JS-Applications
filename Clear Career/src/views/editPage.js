import { html } from "../../node_modules/lit-html/lit-html.js";
import { editCard, getCardById } from "../data/cards.js";
import { createSubmitHandler } from "../data/util.js";

const editTamplete=(card,onEdit)=>html`
<section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
                type="text"
                name="title"
                .value=${card.title}
                id="job-title"
                placeholder="Title"
              />
              <input
                type="text"
                name="imageUrl"
                .value=${card.imageUrl}
                id="job-logo"
                placeholder="Company logo url"
              />
              <input
                type="text"
                name="category"
                .value=${card.category}
                id="job-category"
                placeholder="Category"
              />
              <textarea
                id="job-description"
                name="description"
                .value=${card.description}
                placeholder="Description"
                rows="4"
                cols="50"
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                .value=${card.requirements}
                placeholder="Requirements"
                rows="4"
                cols="50"
              ></textarea>
              <input
                type="text"
                name="salary"
                .value=${card.salary}
                id="job-salary"
                placeholder="Salary"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>`


export async function editPage(ctx){
const id=ctx.params.id;
const card=await getCardById(id);
ctx.render(editTamplete(card,createSubmitHandler(onEdit)));

async function onEdit({title, imageUrl, category, description, requirements, salary }){
    if(title == '' || imageUrl == '' || category == '' || description == '' || requirements == '' || salary == ''){
        return alert('all fields must be filled')
    }
    await  editCard(id,{title, imageUrl, category, description, requirements, salary })
    ctx.page.redirect('/catalog')
}
}