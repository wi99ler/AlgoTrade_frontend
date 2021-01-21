<script>
  import axios from "axios";
  import { onMount } from "svelte";

  import { Menu, Button, List, ListItem } from "svelte-materialify";

  import { username } from "../shared/stores";

  onMount(() => {
    axios
      .get(BACKEND_URL + "/login/profile")
      .then((res) => {
        if (typeof res.data === "object") {
          id = res.data.data.id;
          name = res.data.data.name;
          email = res.data.data.email;
          photo = res.data.data.photo;
          username.set(res.data.data.name);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  });

  let menu;

  $: id = 0;
  $: name = "";
  $: photo = "";
  $: email = "";
</script>

{#if name === ""}
  <a
    href={BACKEND_URL + "/login/google"}
    style={"text-decoration:false;color:#ffffff"}>Login</a
  >
{:else}
  <Menu bind:this={menu}>
    <img
      src={photo}
      style={"border-radius:50%;height:100%"}
      alt="Avatar"
      slot="activator"
      on:click={() => menu.setOpen(true)}
    />
    <List>
      <ListItem disabled>
        <h6 style="align:center;">{name}</h6>
        <h7>{email}</h7>
      </ListItem>
      <ListItem on:click={() => window.location.replace("/login/logout")}>
        <h6>Logout</h6>
      </ListItem>
    </List>
  </Menu>
{/if}

<style>
</style>
