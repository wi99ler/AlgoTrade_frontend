<script>
  import axios from "axios";
  import { onMount } from "svelte";

  import Menu from "@smui/menu";
  import List, { Item, Text, PrimaryText, SecondaryText } from "@smui/list";

  import { username } from "../shared/stores";

  onMount(() => {
    axios
      .get("http://localhost:3000/login/profile")
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

<style>
</style>

{#if name === ''}
  <a
    href="/login/google"
    style={'text-decoration:false;color:#ffffff'}>Login</a>
{:else}
  <img
    src={photo}
    style={'border-radius:50%;height:100%'}
    alt="Avatar"
    on:click={() => menu.setOpen(true)} />
  <div style="float:right;">
    <Menu bind:this={menu}>
      <List twoLine>
        <Item disabled>
          <Text>
            <PrimaryText style="align:center;">{name}</PrimaryText>
            <SecondaryText>{email}</SecondaryText>
          </Text>
        </Item>
        <Item on:click={() => window.location.replace('/login/logout')}>
          <Text>
            <PrimaryText>Logout</PrimaryText>
            <SecondaryText />
          </Text>
        </Item>
      </List>
    </Menu>
  </div>
{/if}
