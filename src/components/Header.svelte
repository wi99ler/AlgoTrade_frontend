<script>
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
</script>

<style>
  :global(header a.active) {
    font-weight: bold;
    text-decoration: underline;
  }
</style>

<header>
  <a href="/" use:link use:active> Home </a>
  <a href="/editor" use:link use:active> Editor </a>
  <a href="/graph" use:link use:active> Graph </a>
</header>
