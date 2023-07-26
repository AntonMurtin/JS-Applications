import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteElement, getElBiId } from '../data/elOfServer.js';
import { getUserData } from '../data/util.js';

const detailsTamplete=(fruit,onDelete)=>html`
 <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${fruit.imageUrl}" />
            <p id="details-title">${fruit.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>${fruit.description}</p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">${fruit.nutrition}</p>
              </div>
             ${fruit.isOwner?html`
             <div id="action-buttons">
            <a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
          </div>`:null}
            </div>
        </div>
      </section>`

export async function detailsPage(ctx){
const id=ctx.params.id;
const userData=await getUserData();
const fruit= await getElBiId(id);

if (userData){
    fruit.isOwner=userData._id==fruit._ownerId;
}
ctx.render(detailsTamplete(fruit,onDelete))
async function onDelete(){
   confirm('Are you shure?');
    if(confirm){
        await deleteElement(id)
        ctx.page.redirect('/catalog');
    }
}
}