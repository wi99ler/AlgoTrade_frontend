<script>
  import axios from "axios";
  import { onMount } from "svelte";

  import Menu from "@smui/menu";
  import List, { Item, Text } from "@smui/list";

  import { username } from "../shared/stores";

  onMount(() => {
    axios
      .get("http://localhost:3000/login/profile")
      .then((res) => {
        if (typeof res.data === "object") {
          id = res.data.data.id;
          name = res.data.data.name;
          email = res.data.data.email;
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
  $: email = "";
</script>

<style>
</style>

{#if name === ''}
  <div>
    <a
      href="/login/google"
      style={'text-decoration:false;color:#ffffff'}>Login</a>
  </div>
{:else}
  <div on:click={() => menu.setOpen(true)}>
    <Text>{name + '(' + email + ')'}</Text>
    <Menu bind:this={menu}>
      <List>
        <Item on:click={() => window.location.replace('/login/logout')}>
          <Text>Logout</Text>
        </Item>
      </List>
    </Menu>
  </div>
{/if}
