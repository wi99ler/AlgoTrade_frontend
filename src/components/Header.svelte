<script>
  import { Link } from "svelte-routing";
  import axios from "axios";
  import { onMount } from "svelte";

  onMount(() => {
    console.log("Mount");
    axios.get("http://localhost:3000/login").then((res) => {
      if (typeof res.data === "object") {
        name = res.data.displayName;
        email = res.data?.emails[0].value;
      }
    });
  });

  $: name = "";
  $: email = "";
</script>

<style>
  :global(header a.active) {
    font-weight: bold;
    text-decoration: underline;
  }
</style>

<div>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/editor">Editor</Link>
    <Link to="/graph">Graph</Link>
  </nav>
  {#if name === ''}
    <div><a href="/login/google">Login</a></div>
  {:else}
    <div>{name + '(' + email + ')'} <a href="/login/logout">Logout</a></div>
  {/if}
</div>
