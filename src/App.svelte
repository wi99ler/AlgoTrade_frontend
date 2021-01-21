<script lang="ts">
  import { Router } from "svelte-routing";
  import Content from "./layout/Content.svelte";
  import Header from "./layout/Header.svelte";
  import Drawer from "./layout/Drawer.svelte";

  export let url = "";

  let drawerOpen = false;
</script>

<Router {url}>
  <Header bind:drawerOpen />
  <Content />
</Router>
