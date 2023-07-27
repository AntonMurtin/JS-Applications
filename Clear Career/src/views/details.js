import { html } from "../../node_modules/lit-html/lit-html.js";
import { addOffers, getTotalOffers, getUserOffers } from "../data/bonus.js";
import { delCard, getCardById } from "../data/cards.js";
import { getUserData } from "../data/util.js";

const detailsTamplete = (card, onDelete, onOffers) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${card.imageUrl} alt="example1" />
            <p id="details-title">${card.title}</p>
            <p id="details-category">
              Category: <span id="categories">${card.category}</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">${card.salary}</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span>${card.description}</span>
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${card.requirements}</span>
              </div>
            </div>
            <p>Applications: <strong id="applications">${card.offers}</strong></p>

         ${card.isOwner || card.isOffers ? html`
         <div id="action-buttons">
            ${card.isOwner ? html`
            <a href="/edit/${card._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>` : null}
            ${!card.isOwner && card.isOffers ? html`
            <a href="javascript:void(0)" id="apply-btn" @click=${onOffers}>Apply</a>` : null}
          </div>`: null}
        </div>
      </section>`

export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const card = await getCardById(id)
  const userData = await getUserData();
  card.offers = await getTotalOffers(id);

  if (userData) {
    card.isOwner = card._ownerId == userData._id;
    const userLike = await getUserOffers(id, userData._id)
    card.isOffers = userLike == 0
  }
  ctx.render(detailsTamplete(card, onDelete, onOffers))
  async function onDelete() {
    await delCard(id);
    ctx.page.redirect('/catalog')
  }
  async function onOffers() {
    await addOffers(id);
    ctx.page.redirect('/details/' + id)
  }
}