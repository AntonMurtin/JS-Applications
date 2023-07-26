import { html } from "../../node_modules/lit-html/lit-html.js";
import { editCard, getCardById } from "../data/cards.js";
import { createSubmitHandler } from "../data/util.js";

const editTamplete=(card,onEdit)=>html`
<section id="edit">
          <div class="form">
            <h2>Edit Event</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
                type="text"
                name="name"
                .value=${card.name}
                id="name"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                .value=${card.imageUrl}
                id="event-image"
                placeholder="Event Image"
              />
              <input
                type="text"
                name="category"
                .value=${card.category}
                id="event-category"
                placeholder="Category"
              />
              <textarea
                id="event-description"
                name="description"
                .value=${card.description}
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <label for="date-and-time">Event Time:</label>
              <input
              type="text"
              name="date"
              .value=${card.date}
              id="date"
              placeholder="When?"
            />

              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`


export async function editPage(ctx){
const id=ctx.params.id;
const card=await getCardById(id);
ctx.render(editTamplete(card,createSubmitHandler(onEdit)));

async function onEdit({name,imageUrl, category, description, date}){
    if(name==''||imageUrl==''||category==''||description==''||date==''){
        return alert('all fields must be filled')
    }
    await  editCard(id,{name,imageUrl, category, description, date})
    ctx.page.redirect('/catalog')
}
}