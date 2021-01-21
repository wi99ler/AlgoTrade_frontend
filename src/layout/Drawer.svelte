<script>
  import { navigate } from "svelte-routing";

  import {
    NavigationDrawer,
    List,
    Subheader,
    ListItem,
    ListItemGroup,
    Icon,
    Divider,
    Overlay,
  } from "svelte-materialify";

  import { username } from "../shared/stores";

  let drawer;
  export let active = false;

  const items = [
    { text: "editor", icon: "mdi-folder" },
    { text: "graph", icon: "mdi-folder" },
  ];
</script>

<NavigationDrawer absolute bind:this={drawer} bind:active>
  <Subheader>
    <h4
      style="font-family: Pacifico;text-decoration: none;color: #000000;"
      on:click={() => {
        active = false;
        navigate("/");
      }}
    >WiQuant</h4>
  </Subheader>
  <Divider />
  <List nav>
    <ListItemGroup value="[1]">
      {#each items as item}
        <ListItem
          on:click={() => {
            active = false;
            navigate("/" + item.text);
          }}
        >
          <span slot="prepend">
            <Icon class="mdi {items.icon}" />
          </span>
          {item.text}
        </ListItem>
      {/each}
    </ListItemGroup>
  </List>
</NavigationDrawer>
<Overlay {active} absolute on:click={() => (active = !active)} index={1} />

<!-- <Drawer>
  :global(header a.active) {
    font-weight: bold;
    text-decoration: underline;
  }
</Drawer> -->
