<script lang="ts">
  import { beforeUpdate, onMount } from "svelte";
  import axios from "axios";
  import Tab, { Icon, Label } from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import Button from "@smui/button";
  import TextField from "@smui/textfield";

  import ace from "brace";
  import "brace/mode/python";
  import "brace/keybinding/vim";
  import "brace/theme/monokai";

  let editor: ace.Editor;
  let newlabel = "";

  let iconTabs = [
    {
      icon: "add",
      label: "",
      edit: false,
      value: "",
      function: () => {
        iconTabs = [
          {
            icon: "description",
            label: "new",
            edit: true,
            value: "",
            function: () => {},
          },
          ...iconTabs,
        ];
        // iconTabs.push({
        //   icon: "add",
        //   label: "new",
        //   edit: true,
        //   value: "",
        //   function: () => {},
        // });
        if (iconTabs.length === 1) visible = false;
        else visible = true;
        console.log(iconTabs);
      },
    },
  ];

  $: resolveTabs = Promise.resolve(iconTabs);

  let visible = false;

  let innerWidth = 800;
  let innerHeight = 600;

  onMount(async () => {
    editor = ace.edit("editor");
    editor.getSession().setMode("ace/mode/python");
    editor.setTheme("ace/theme/monokai");
    editor.setKeyboardHandler("ace/keyboard/vim");
  });

  beforeUpdate(() => {
    if (iconTabs.length === 1) visible = false;
  });

  function saveToServer() {
    console.log(editor.getValue());
    axios
      .post("http://localhost:3000/api/file/", { data: editor.getValue() })
      .then((res) => {
        console.log("response is ", res);
      });
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  #editor {
    width: auto;
    height: 500px;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<svelte:window bind:innerWidth bind:innerHeight />

<main>
  {#await resolveTabs then iconTabs}
    <TabBar tabs={iconTabs} let:tab>
      <Tab {tab} minWidth on:click={tab.function}>
        <Icon class="material-icons">{tab.icon}</Icon>
        <Label>{tab.label}</Label>
      </Tab>
    </TabBar>
  {/await}
  <div id="editor" class="editor" style={'height:500px'} hidden={!visible} />
  <Button on:click={saveToServer}>save</Button>
</main>

<!--
          {#if !Tab.edit}
          <Icon class="material-icons">{tab.icon}</Icon>
          <Label>{tab.label}</Label>
        {:else}
          <TextField label={tab.label} bind:value={newlabel} />
        {/if}

-->
