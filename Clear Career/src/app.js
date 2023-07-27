import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { getUserData } from './data/util.js';
import { leyoutTamplate } from './views/leyout.js';
import { homePage } from './views/homePage.js';
import { logout } from './data/auth.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { catalogPage } from './views/catalogPage.js';
import { createPage } from './views/createPage.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/editPage.js';


const root=document.getElementById('wrapper');

page (decoration);
page('index.html','/');
page('/',homePage);
page('/catalog',catalogPage);
page('/create',createPage);
page('/details/:id',detailsPage);
page('/edit/:id',editPage);
page('/register',registerPage)
page('/login',loginPage)
page('/logout',logOutAction);

page.start()

function decoration(ctx,next){
ctx.render=renderView;
    next()
}
function renderView(content){
    const userData=getUserData();
    render(leyoutTamplate(userData,content),root)
}


function logOutAction(ctx){
   logout();
   ctx.page.redirect('/');
    
}