import { html } from "../../node_modules/lit-html/lit-html.js";
import { add, getTotal, getUser } from "../data/bonus.js";
import { delCard, getCardById } from "../data/cards.js";
import { getUserData } from "../data/util.js";

const detailsTamplete = (card, onDelete, onBuy) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${card.imageUrl} alt="example1" />
            <p id="details-title">${card.name}</p>
            <p id="details-category">
              Category: <span id="categories">${card.category}</span>
            </p>
            <p id="details-price">
              Price: <span id="price-number">${card.price}</span>$</p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Bought: <span id="buys">${card.total}</span> times.</h4>
                <span>${card.description}</span>
              </div>
            </div>

            ${card.userData||card.isBuy?html`
            <div id="action-buttons">
            ${card.isOwner?html`
            <a href="/edit/${card._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>`:null}
              ${!card.isOwner&&card.isBuy?html`
              <a href="javascript:void(0)" id="buy-btn" @click=${onBuy}>Buy</a>`:null}
            </div>`:null}
          </div>
        </section>

`

export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const card = await getCardById(id)
  const userData = await getUserData();
  card.total = await getTotal(id);

  if (userData) {
    card.userData=true;
    card.isOwner = card._ownerId == userData._id;
    const userBuy = await getUser(id, userData._id);
    card.isBuy = userBuy == 0;
  }
  ctx.render(detailsTamplete(card, onDelete, onBuy));

  async function onDelete() {
    confirm('Arr you shure?');
    if(confirm){
      await delCard(id);
    ctx.page.redirect('/catalog');
    }
    
  }
  async function onBuy() {
    await add(id);
    ctx.page.redirect('/details/' + id);
  }
}