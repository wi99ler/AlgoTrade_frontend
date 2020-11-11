<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  import Tab, { Icon, Label } from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import Button from "@smui/button";

  let iconTabs = [
    { icon: "star", label: "First" },
    { icon: "second", label: "Second" },
  ];

  import ace from "brace";
  import "brace/mode/python";
  import "brace/keybinding/vim";
  import "brace/theme/monokai";
  let editor: ace.Editor;

  let innerWidth = 800;
  let innerHeight = 600;

  onMount(async () => {
    editor = ace.edit("editor");
    editor.getSession().setMode("ace/mode/python");
    editor.setTheme("ace/theme/monokai");
    editor.setKeyboardHandler("ace/keyboard/vim");
    editor;
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
  <TabBar tabs={iconTabs} let:tab>
    <Tab {tab}>
      <Icon class="material-icons">{tab.icon}</Icon>
      <Label>{tab.label}</Label>
    </Tab>
  </TabBar>
  <div id="editor" class="editor" style={'height:500px'} />
  <Button on:click={saveToServer}>save</Button>
</main>
