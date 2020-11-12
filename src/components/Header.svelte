<script>
  // import { link } from "svelte-spa-router";
  // import active from "svelte-spa-router/active";
  import { Link } from "svelte-routing";
</script>

<style>
  :global(header a.active) {
    font-weight: bold;
    text-decoration: underline;
  }
</style>

<nav>
  <Link to="/">Home</Link>
  <Link to="/editor">Editor</Link>
  <Link to="/graph">Graph</Link>
</nav>
