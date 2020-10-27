<script lang="ts">
  export let name: string;
  import FusionCharts from "fusioncharts";
  import Charts from "fusioncharts/fusioncharts.charts";
  import SvelteFC, { fcRoot } from "svelte-fusioncharts";

  // Add dependencies
  fcRoot(FusionCharts, Charts);

  let dataSource = {
      chart: {
        caption: "Recommended Portfolio Split",
        subCaption: "For a net-worth of $1M",
        showValues: "1",
        showPercentInTooltip: "0",
        numberPrefix: "$",
        enableMultiSlicing: "1",
        theme: "fusion",
      },
      data: [
        {
          label: "Equity",
          value: "300000",
        },
        {
          label: "Debt",
          value: "230000",
        },
        {
          label: "Bullion",
          value: "180000",
        },
        {
          label: "Real-estate",
          value: "270000",
        },
        {
          label: "Insurance",
          value: "20000",
        },
      ],
    },
    chartConfig = {
      type: "pie2d",
      width: "600",
      height: "400",
      renderAt: "chart-container",
      dataSource,
    };
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Hello {name}!</h1>
  <h2>my first svelte app</h2>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p>
  <SvelteFC {...chartConfig} />
</main>
