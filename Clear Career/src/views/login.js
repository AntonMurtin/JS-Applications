import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../data/auth.js";
import { createSubmitHandler } from "../data/util.js";

const loginTemplete=(onLogin)=>html`
<section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${onLogin}>
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
`

export async function loginPage(ctx){
ctx.render(loginTemplete(createSubmitHandler(onLogin)))
    async function  onLogin({email,password},form){
        if(email==''||password==''){
            return alert('All fields are requires')
        }
        await login(email,password)
        form.reset()
        ctx.page.redirect('/')
    }
}

