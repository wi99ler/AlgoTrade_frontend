<script>
  import { navigate } from "svelte-routing";

  import Drawer, { Content, Header, Title } from "@smui/drawer";
  import List, { Item, Graphic, Text } from "@smui/list";

  import { username } from "../shared/stores";

  let drawer;
  export let drawerOpen = false;
  export let active = "";

  let name = "";

  const unsubscribe = username.subscribe((value) => (name = value));

  function setActive(par) {
    active = par;
  }
</script>

<style>
  :global(header a.active) {
    font-weight: bold;
    text-decoration: underline;
  }
</style>

<Drawer variant="modal" bind:this={drawer} bind:open={drawerOpen}>
  <Header>
    <Title
      style="font-family: Pacifico;text-decoration: none;color: #000000;"
      on:click={() => {
        setActive('Home');
        drawerOpen = false;
        navigate('/');
      }}>
      WiQuant
    </Title>
  </Header>
  <Content>
    <List>
      {#if name !== ''}
        <Item
          href="javascript:void(0)"
          on:click={() => {
            setActive('Editor');
            drawerOpen = false;
            navigate('/editor');
          }}
          activated={active === 'Editor'}>
          <Graphic class="material-icons">description</Graphic>
          <Text>Editor</Text>
        </Item>
      {/if}
      <Item
        href="javascript:void(0)"
        on:click={() => {
          setActive('Graph');
          drawerOpen = false;
          navigate('/graph');
        }}
        activated={active === 'Graph'}>
        <Graphic class="material-icons">trending_up</Graphic>
        <Text>Graph</Text>
      </Item>
    </List>
  </Content>
</Drawer>
