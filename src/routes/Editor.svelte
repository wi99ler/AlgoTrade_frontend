<script lang="ts">
  import { beforeUpdate, onMount } from "svelte";
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

  import { deepEqual, deepClone } from "../shared/util";

  let editor: ace.Editor;
  let newDocName = "";

  let iconTabs = [
    {
      icon: "add",
      label: "",
      value: "",
      function: async () => {
        await dialog.open();
      },
    },
  ];

  let savedTabs = deepClone(iconTabs);

  setInterval(async () => {
    for (let i = 0; i < iconTabs.length; i++)
      if (iconTabs[i].label === current) iconTabs[i].value = editor.getValue();

    if (!deepEqual(savedTabs, iconTabs)) {
      await saveToServer();
      savedTabs = deepClone(iconTabs);
    }
  }, 5000);

  $: resolveTabs = Promise.resolve(iconTabs);

  let activeTab = iconTabs[0];
  let current = "first";

  let visible = true;

  let dialog;

  let innerWidth = 800;
  let innerHeight = 600;

  function closeHandler(e) {
    let unique = true;
    for (let i = 0; i < iconTabs.length; i++) {
      if (iconTabs[i].label === newDocName) unique = false;
    }
    if (unique) {
      iconTabs = [
        {
          icon: "description",
          label: newDocName,
          value: "",
          function: async () => {},
        },
        ...iconTabs,
      ];
    }
    newDocName = "";
    if (iconTabs.length === 1) visible = false;
    else visible = true;
  }

  onMount(async () => {
    editor = ace.edit("editor");
    editor.getSession().setMode("ace/mode/python");
    editor.setTheme("ace/theme/monokai");
    editor.setKeyboardHandler("ace/keyboard/vim");
    editor.$blockScrolling = Infinity;
    await loadFromServer();
    editor.setValue(activeTab.value);
    editor.clearSelection();
  });

  beforeUpdate(() => {
    if (iconTabs.length === 1) visible = false;
    if (editor) {
      const position = editor.getCursorPosition();
      for (let i = 0; i < iconTabs.length; i++) {
        if (iconTabs[i].label === current)
          iconTabs[i].value = editor.getValue();
      }
      editor.setValue(activeTab.value);
      editor.clearSelection();
      current = activeTab.label;
      editor.moveCursorTo(position.row, position.column);
    }
    if (activeTab.icon === "add") activeTab = iconTabs[0];
  });

  async function saveToServer() {
    // let id = 0;
    // let name = "";
    // let email = "";

    // const res = await axios.get("https://wiquant.site/login/profile");
    // if (typeof res.data === "object") {
    //   id = res.data.data.id;
    //   name = res.data.data.name;
    //   email = res.data.data.email;
    // }

    iconTabs.forEach((item) => {
      if (item.icon !== "add") {
        axios.post("https://wiquant.site/api/file/", {
          title: item.label,
          content: item.value,
        });
      }
    });
  }

  async function loadFromServer() {
    axios.get("https://wiquant.site/api/file/").then((res) => {
      res.data.forEach((item) => {
        iconTabs = [
          {
            icon: "description",
            label: item.filename,
            value: item.content,
            function: async () => {},
          },
          ...iconTabs,
        ];
      });
      if (iconTabs.length === 1) visible = false;
      else visible = true;
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
  <div
    id="editor"
    class="editor"
    style={'height:500px;clear:both;'}
    hidden={!visible} />

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
