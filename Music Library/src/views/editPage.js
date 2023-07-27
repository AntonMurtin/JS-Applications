import { html } from "../../node_modules/lit-html/lit-html.js";
import { editCard, getCardById } from "../data/cards.js";
import { createSubmitHandler } from "../data/util.js";

const editTamplete=(card,onEdit)=>html`
<section id="edit">
        <div class="form">
          <h2>Edit Album</h2>
          <form class="edit-form" @submit=${onEdit}>
            <input type="text" name="singer" .value=${card.singer} id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" .value=${card.album} id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" .value=${card.imageUrl} id="album-img" placeholder="Image url" />
            <input type="text" name="release" .value=${card.release} id="album-release" placeholder="Release date" />
            <input type="text" name="label" .value=${card.label} id="album-label" placeholder="Label" />
            <input type="text" name="sales" .value=${card.sales} id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
          </form>
        </div>
      </section>
`


export async function editPage(ctx){
const id=ctx.params.id;
const card=await getCardById(id);
ctx.render(editTamplete(card,createSubmitHandler(onEdit)));

async function onEdit({ singer, album, imageUrl, release, label,sales }){
    if(singer == '' || album == '' || imageUrl == '' || release == '' || label == ''||sales==''){
        return alert('all fields must be filled')
    }
    await  editCard(id,{ singer, album, imageUrl, release, label,sales })
    ctx.page.redirect('/catalog')
}
}