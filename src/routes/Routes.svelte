<script>
  import { Route } from "svelte-routing";

  import Home from "./Home.svelte";
  import Editor from "./Editor.svelte";
  import Graph from "./Graph.svelte";
  import NotFound from "./NotFound.svelte";
</script>

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
