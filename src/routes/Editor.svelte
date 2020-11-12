<script lang="ts">
  import { afterUpdate, beforeUpdate, onMount } from "svelte";
  import axios from "axios";
  import Tab, { Icon, Label } from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import Button from "@smui/button";
  import TextField from "@smui/textfield";
  import Dialog, { Title, Content, Actions } from "@smui/dialog";

  import ace from "brace";
  import "brace/mode/python";
  import "brace/keybinding/vim";
  import "brace/theme/monokai";

  let editor: ace.Editor;
  let newDocName = "";

  let iconTabs = [
    {
      icon: "add",
      label: "",
      edit: false,
      value: "",
      function: async () => {
        let flag = true;
        while (flag) {
          await dialog.open();
          for (let i = 0; i < iconTabs.length; i++) {
            if (iconTabs[i].label === newDocName) flag = true;
          }
          flag = false;
        }
      },
    },
  ];

  $: resolveTabs = Promise.resolve(iconTabs);

  let activeTab = iconTabs[0];
  let current = "first";

  let visible = true;

  let dialog;

  let innerWidth = 800;
  let innerHeight = 600;

  function closeHandler(e) {
    iconTabs = [
      {
        icon: "description",
        label: newDocName,
        edit: true,
        value: "",
        function: async () => {},
      },
      ...iconTabs,
    ];
    if (iconTabs.length === 1) visible = false;
    else visible = true;
    console.log(iconTabs);
  }

  onMount(async () => {
    editor = ace.edit("editor");
    editor.getSession().setMode("ace/mode/python");
    editor.setTheme("ace/theme/monokai");
    editor.setKeyboardHandler("ace/keyboard/vim");
    editor.setValue(activeTab.value);
    editor.clearSelection();
  });

  beforeUpdate(() => {
    console.log("update");
    if (iconTabs.length === 1) visible = false;
    if (editor) {
      for (let i = 0; i < iconTabs.length; i++) {
        if (iconTabs[i].label === current)
          iconTabs[i].value = editor.getValue();
      }
      editor.setValue(activeTab.value);
      editor.clearSelection();
      current = activeTab.label;
    }
  });

  afterUpdate(() => {});

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
    <TabBar tabs={iconTabs} let:tab bind:active={activeTab}>
      <Tab {tab} minWidth on:click={tab.function}>
        <Icon class="material-icons">{tab.icon}</Icon>
        <Label>{tab.label}</Label>
      </Tab>
    </TabBar>
  {/await}
  <div id="editor" class="editor" style={'height:500px'} hidden={!visible} />
  <Button on:click={saveToServer}>save</Button>

  <Dialog bind:this={dialog} on:MDCDialog:closed={closeHandler}>
    <Title>New Document</Title>
    <Content>
      <TextField bind:value={newDocName} label="New Document Name" />
    </Content>
    <Actions>
      <Button action="submit">Submit</Button>
    </Actions>
  </Dialog>
</main>

<!--
          {#if !Tab.edit}
          <Icon class="material-icons">{tab.icon}</Icon>
          <Label>{tab.label}</Label>
        {:else}
          <TextField label={tab.label} bind:value={newlabel} />
        {/if}

-->
