<script>
  import { Link } from "svelte-routing";

  import { AppBar, Button, Icon, Overlay } from "svelte-materialify";

  import Profile from "../components/Profile.svelte";
  import Drawer from "./Drawer.svelte";

  export let active = false;
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css?family=Pacifico"
    rel="stylesheet"
  />
</svelte:head>

<AppBar class="primary-color">
  <div slot="icon">
    <Button fab depressed text on:click={() => (active = !active)}>
      <Icon class="mdi mdi-menu" />
    </Button>
  </div>
  <span
    slot="title"
    style="font-family: Pacifico;text-decoration: none;color: #ffffff;">
    <Link to="/">WiQuant</Link>
  </span>
  <div style="flex-grow:1" />
  <Profile />
</AppBar>
<Drawer absolute {active} />

<style>
  .main-title {
    font-family: Pacifico;
    text-decoration: none;
    color: #ffffff;
  }

  :global(header a.active) {
    font-weight: bold;
    text-decoration: underline;
  }
</style>
