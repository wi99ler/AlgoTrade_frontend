<script lang="ts">
  export let name: string;
  import * as LightweightCharts from "lightweight-charts";
  import axios from "axios";
  import { validate_component } from "svelte/internal";

  // Add dependencies
  var chart = LightweightCharts.createChart(document.body, {
    width: 600,
    height: 300,
    layout: {
      backgroundColor: "#000000",
      textColor: "rgba(255, 255, 255, 0.9)",
    },
    grid: {
      vertLines: {
        color: "rgba(197, 203, 206, 0.5)",
      },
      horzLines: {
        color: "rgba(197, 203, 206, 0.5)",
      },
    },
    crosshair: {
      mode: LightweightCharts.CrosshairMode.Normal,
    },
    rightPriceScale: {
      borderColor: "rgba(197, 203, 206, 0.8)",
    },
    timeScale: {
      borderColor: "rgba(197, 203, 206, 0.8)",
    },
  });

  var candleSeries = chart.addCandlestickSeries({
    upColor: "rgba(255, 144, 0, 1)",
    downColor: "#000",
    borderDownColor: "rgba(255, 144, 0, 1)",
    borderUpColor: "rgba(255, 144, 0, 1)",
    wickDownColor: "rgba(255, 144, 0, 1)",
    wickUpColor: "rgba(255, 144, 0, 1)",
  });

  axios.get("http://localhost:3000/api/charts").then((res) => {
    console.log(res.data);

    candleSeries.setData(res.data);
  });

  // candleSeries.setData([
  //   {
  //     time: "2018-10-19",
  //     open: 180.34,
  //     high: 180.99,
  //     low: 178.57,
  //     close: 179.85,
  //   },
  // ]);
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
</main>
