<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Routes from "./Routes.svelte";
  import Header from "./components/Header.svelte";

  export let url = "/";
</script>

<Router {url}>
  <Header />
  <Routes />
</Router>
