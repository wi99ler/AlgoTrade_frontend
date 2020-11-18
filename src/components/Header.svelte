<script>
  import { Link } from "svelte-routing";
  import axios from "axios";
  import { onMount } from "svelte";
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import { AppContent } from "@smui/drawer";
  import IconButton from "@smui/icon-button";
  import H3 from "@smui/common/H3.svelte";
  import Card from "@smui/card";

  import Drawer from "./Drawer.svelte";
  import Routes from "../routes/Routes.svelte";

  onMount(() => {
    console.log("Mount");
    axios
      .get("http://localhost:3000/login/profile")
      .then((res) => {
        if (typeof res.data === "object") {
          id = res.data.data.id;
          name = res.data.data.name;
          email = res.data.data.email;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });

  $: id = 0;
  $: name = "";
  $: email = "";

  let drawer;
  $: drawerOpen = false;
</script>

<style>
  :global(header a.active) {
    font-weight: bold;
    text-decoration: underline;
  }
</style>

<div>
  <Drawer {drawer} {drawerOpen} />
  <AppContent class="app-content">
    <TopAppBar variant="static" color="primary">
      <Row>
        <Section>
          <IconButton
            class="material-icons"
            on:click={() => (drawerOpen = !drawerOpen)}>
            menu
          </IconButton>
          <Link to="/">
            <Title style={'text-decoration:none;color:#ffffff;'}>
              Wiggler Quant
            </Title>
          </Link>
        </Section>
        <Section align="end" toolbar>
          <Link to="/editor">
            <H3 style={'text-decoration:none;color:#ffffff;'}>Editor</H3>
          </Link>
          <Link to="/graph">
            <H3 style={'text-decoration:none;color:#ffffff;'}>Graph</H3>
          </Link>
        </Section>
        <Section align="end" toolbar>
          {#if name === ''}
            <div><a href="/login/google">Login</a></div>
          {:else}
            <div>
              {name + '(' + email + ')'}
              <a href="/login/logout">Logout</a>
            </div>
          {/if}
        </Section>
      </Row>
    </TopAppBar>
    <Card>
      <main class="main-content">
        <Routes />
      </main>
    </Card>
  </AppContent>
</div>
