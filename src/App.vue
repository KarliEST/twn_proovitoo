<template>
  <div>
    <div>
      <menu>

        <div>
          <router-link to="/">
<!--            Used web source for the logo testing, because was getting ERROR 431 with provided one-->
            <img aria-label="TWN logo" class="logo" tabindex="0" src="http://proovitoo.twn.ee/assets/imgs/logo.svg">
          </router-link>
        </div>
        <ul>
          <li>
            <a>
              <router-link to="/article">Artikkel</router-link>
            </a>

          </li>
          <li>
            <a>
              <router-link to="/list">Tabel</router-link>
            </a>

          </li>
          <li>
            <a>
              <router-link to="/about">About</router-link>
            </a>

          </li>
        </ul>
      </menu>


    </div>

  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
}

menu {
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  width: var(--twn-menuWidth);
  padding: 1.5625rem;
  height: 100vh;
  z-index: 900;
  overflow: auto;
margin-top: 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: list-item;
  text-align: -webkit-match-parent;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  /*color: #2c3e50;*/
}

nav a.router-link-exact-active {
  color: #42b983;
}

a {
  display: block;
  padding: .7rem 1rem;
  text-align: center;
  margin: 0 -1.25rem;
  text-decoration: none;
  color: var(--twn-textColor);
  font-size: 1.1875rem;
  text-transform: uppercase;
  transition: transform .25s;
  transform-origin: right center;
}

.logo {
  margin: 1.5625rem 0 3.125rem;
  cursor: pointer;
}
</style>
