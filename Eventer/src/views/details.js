import { html } from "../../node_modules/lit-html/lit-html.js";
import { addPeople, getTotalPeople, getUser } from "../data/bonus.js";
import { delCard, getCardById } from "../data/cards.js";
import { getUserData } from "../data/util.js";

const detailsTamplete = (card, onDelete, onGoing) => html`
 <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${card.imageUrl} alt="example1" />
            <p id="details-title">${card.name}</p>
            <p id="details-category">
              Category: <span id="categories">${card.category}</span>
            </p>
            <p id="details-date">
              Date:<span id="date">${card.date}</span></p>
            <div id="info-wrapper">
              <div id="details-description">
                <span>${card.description}</div>

            </div>

            <h3>Going: <span id="go">${card.people}</span> times.</h3>

            
            ${card.isOwner || card.isGoing ? html`
            <div id="action-buttons">
            ${card.isOwner ? html`
            <a href="/edit/${card._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>` : null}
            ${!card.isOwner && card.isGoing ? html`
            <a href="javascript:void(0)" id="go-btn" @click=${onGoing}>Going</a>` : null}
            </div>`: null}

          </div>
        </section>
`

export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const card = await getCardById(id)
  const userData = await getUserData();
  card.people = await getTotalPeople(id);

  if (userData) {
    card.isOwner = card._ownerId == userData._id;
    const userGoing = await getUser(id, userData._id);
    card.isGoing = userGoing == 0;
  }
  ctx.render(detailsTamplete(card, onDelete, onGoing));

  async function onDelete() {
    await delCard(id);
    ctx.page.redirect('/catalog');
  }
  async function onGoing() {
    await addPeople(id);
    ctx.page.redirect('/details/' + id);
  }
}