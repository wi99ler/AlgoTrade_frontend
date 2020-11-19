<script lang="ts">
  import { Router } from "svelte-routing";
  import { AppContent, Scrim } from "@smui/drawer";
  import Content from "./layout/Content.svelte";
  import Header from "./layout/Header.svelte";
  import Drawer from "./layout/Drawer.svelte";

  export let url = "";

  let drawerOpen = false;
</script>

<Router {url}>
  <Drawer bind:drawerOpen />
  <Scrim />
  <AppContent>
    <Header bind:drawerOpen />
    <Content />
  </AppContent>
</Router>
