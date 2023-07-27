import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteElement, getElBiId } from '../data/elOfServer.js';
import { getUserData } from '../data/util.js';

const detailsTamplete=(shoes,onDelete)=>html`
 <section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src=${shoes.imageUrl} alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${shoes.brand}</span></p>
              <p>
                Model: <span id="details-model">${shoes.model}</span>
              </p>
              <p>Release date: <span id="details-release">${shoes.release}</span></p>
              <p>Designer: <span id="details-designer">${shoes.designer}</span></p>
              <p>Value: <span id="details-value">${shoes.value}</span></p>
            </div>

           ${shoes.isOwner?html`
           <div id="action-buttons">
              <a href="/edit/${shoes._id}" id="edit-btn" >Edit</a>
              <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
            </div>`:null}
          </div>
        </section>
`

export async function detailsPage(ctx){
const id=ctx.params.id;
const userData=await getUserData();
const shoes= await getElBiId(id);

if (userData){
  shoes.isOwner=userData._id==shoes._ownerId;
}
ctx.render(detailsTamplete(shoes,onDelete))
async function onDelete(){
   confirm('Are you shure?');
    if(confirm){
        await deleteElement(id)
        ctx.page.redirect('/catalog');
    }
}
}