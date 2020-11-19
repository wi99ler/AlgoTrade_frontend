<script>
  import { Link } from "svelte-routing";

  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import IconButton from "@smui/icon-button";

  import Profile from "../components/Profile.svelte";

  export let drawerOpen = false;
</script>

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

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css?family=Pacifico"
    rel="stylesheet" />
</svelte:head>

<TopAppBar variant="static" color="primary">
  <Row>
    <Section>
      <IconButton
        class="material-icons"
        on:click={() => (drawerOpen = !drawerOpen)}>
        menu
      </IconButton>
      <Link to="/">
        <Title
          class="main-title"
          style="font-family: Pacifico;text-decoration: none;color: #ffffff;">
          WiQuant
        </Title>
      </Link>
    </Section>
    <Section align="end" toolbar>
      <Profile />
    </Section>
  </Row>
</TopAppBar>
