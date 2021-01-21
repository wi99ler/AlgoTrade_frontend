<script>
  import { Route } from "svelte-routing";
  import { Card } from "svelte-materialify";

  import Home from "../routes/Home.svelte";
  import Editor from "../routes/Editor.svelte";
  import Graph from "../routes/Graph.svelte";
  import NotFound from "../routes/NotFound.svelte";
</script>

<Card class="main-content" style={"padding:16px;"}>
  <Route path="/">
    <Home />
  </Route>
  <Route path="/editor">
    <Editor />
  </Route>
  <Route path="/graph">
    <Graph />
  </Route>
  <Route path="*">
    <NotFound />
  </Route>
</Card>

<style>
  .main-content {
    padding: 16px;
  }
</style>
