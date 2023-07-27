import { html } from '../../node_modules/lit-html/lit-html.js';
import { editElement, getElBiId } from '../data/elOfServer.js';
import { createSubmitHandler } from '../data/util.js';

const editTamlete = (shoes, onEdit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit item</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
                type="text"
                name="brand"
                .value=${shoes.brand}
                id="shoe-brand"
                placeholder="Brand"
              />
              <input
                type="text"
                name="model"
                .value=${shoes.model}
                id="shoe-model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                .value=${shoes.imageUrl}
                id="shoe-img"
                placeholder="Image url"
              />
              <input
                type="text"
                name="release"
                .value=${shoes.release}
                id="shoe-release"
                placeholder="Release date"
              />
              <input
                type="text"
                name="designer"
                .value=${shoes.designer}
                id="shoe-designer"
                placeholder="Designer"
              />
              <input
                type="text"
                name="value"
                .value=${shoes.value}
                id="shoe-value"
                placeholder="Value"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>`

export async function editPage(ctx) {
  const id = ctx.params.id;
  const shoes = await getElBiId(id);
  ctx.render(editTamlete(shoes, createSubmitHandler(onEdit)));
  async function onEdit({ brand, model, imageUrl, release, designer, value }) {
    if (brand == '' || model == '' || imageUrl == '' || release == '' || designer == '' || value == '') {
      return alert('all fields must be filled');
    }
    await editElement(id, { brand, model, imageUrl, release, designer, value });
    ctx.page.redirect('/details/' + id);
  }
}