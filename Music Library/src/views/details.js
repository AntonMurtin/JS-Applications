import { html } from "../../node_modules/lit-html/lit-html.js";
import { add, getTotal, getUser } from "../data/bonus.js";
import { delCard, getCardById } from "../data/cards.js";
import { getUserData } from "../data/util.js";

const detailsTamplete = (card, onDelete, onLike) => html`
<section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          <div id="img-wrapper">
            <img src=${card.imageUrl} alt="example1" />
          </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${card.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${card.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${card.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${card.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${card.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">${card.total}</span></div>

          ${card.userData||card.isLike?html`
            <div id="action-buttons">
            ${card.isOwner?html`
            <a href="/edit/${card._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>`:null}
              ${!card.isOwner&&card.isLike?html`
              <a href="javascript:void(0)" id="like-btn" @click=${onLike}>Like</a>`:null}
            </div>`:null}

          
`

export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const card = await getCardById(id)
  const userData = await getUserData();
  card.total = await getTotal(id);

  if (userData) {
    card.userData=true;
    card.isOwner = card._ownerId == userData._id;
    const userLike = await getUser(id, userData._id);
    card.isLike = userLike == 0;
  }
  ctx.render(detailsTamplete(card, onDelete, onLike));

  async function onDelete() {
    confirm('Arr you shure?');
    if(confirm){
      await delCard(id);
    ctx.page.redirect('/catalog');
    }
    
  }
  async function onLike() {
    await add(id);
    ctx.page.redirect('/details/' + id);
  }
}