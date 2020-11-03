<script lang="ts">
  import { onMount } from "svelte";
  import {
    afterUpdate,
    beforeUpdate,
    validate_component,
  } from "svelte/internal";
  import * as LightweightCharts from "lightweight-charts";
  import axios from "axios";

  let innerWidth = 800;
  let innerHeight = 400;

  let current = { from: 0, to: 0 };

  let candleData = [];
  let volumeData = [];
  let averageData = [];

  function setData(data) {
    console.log("setData");
    candleData = data.sort((a, b) => a.time - b.time);

    current.from = candleData[0].time;
    current.to = candleData[data.length - 1].time;

    console.log(current);

    //    candleSeries.setData(candleData);
    candleData.forEach((item) => candleSeries.update(item));

    candleData.forEach((item) => {
      volumeData.push({ time: item.time, value: item.volume });
    });

    //    areaSeries.setData(volumeData);
    volumeData.forEach((item) => areaSeries.update(item));

    candleData.forEach((item, i) => {
      if (i >= 10) {
        let sum = 0;
        for (let j = 0; j < 10; j++) {
          sum += data[i - j].close;
        }
        averageData.push({ time: item.time, value: sum / 10.0 });
      }
    });

    averageData.forEach((item) => lineSeries.update(item));

    //    lineSeries.setData(averageData);
  }

  // Add dependencies
  var chart = LightweightCharts.createChart(document.body, {
    width: innerWidth,
    height: innerHeight,
    layout: {
      backgroundColor: "#FFF",
      textColor: "rgba(0, 0, 0, 0.9)",
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
      timeVisible: true,
      borderColor: "rgba(197, 203, 206, 0.8)",
    },
  });

  const candleSeries = chart.addCandlestickSeries({
    // title: "BTC-USDT",
    upColor: "rgba(255, 0, 0, 1)",
    borderUpColor: "rgba(255, 0, 0, 1)",
    wickUpColor: "rgba(255, 0, 0, 1)",
    downColor: "rgba(0, 0, 255, 1)",
    borderDownColor: "rgba(0, 0, 255, 1)",
    wickDownColor: "rgba(0, 0, 255, 1)",
    scaleMargins: {
      top: 0,
      bottom: 0.2,
    },
  });

  const areaSeries = chart.addAreaSeries({
    // title: "Volume",
    topColor: "rgba(0, 200, 136, 1)",
    bottomColor: "rgba(0, 200, 136, 0.08)",
    lineColor: "rgba(0, 200, 136, 0.4)",
    priceFormat: {
      type: "volume",
    },
    priceScaleId: "volume",
    scaleMargins: {
      top: 0.9,
      bottom: 0.02,
    },
  });

  const lineSeries = chart.addLineSeries({
    // title: "5 unit everage",
    color: "rgba(55, 150, 250, 1)",
    lineWidth: 2,
  });

  afterUpdate(() => {
    chart.resize(innerWidth * 0.8, innerHeight * 0.6);
  });

  chart.timeScale().subscribeVisibleTimeRangeChange((param) => {
    console.log("time range change");
    const from = parseInt(param.from.toString());
    const to = parseInt(param.to.toString());
    console.log("from", from, "to", to);
    if (
      from !== to &&
      from - 60 * 20 < current.from // || to + 60 * 20 > current.to)
    ) {
      console.log("load new data", param);

      current.from = from - 60 * 60;
      current.to = to;

      axios
        .get(
          "http://localhost:3000/api/charts/minute?start=" +
            current.from +
            "&end=" +
            current.to
        )
        .then((res) => {
          console.log("data size", res.data.length);
          setData(res.data);
          // chart.timeScale().setVisibleRange({
          //   from: current.from + 60 * 60,
          //   to: current.to - 60 * 60,
          // });
        });
    }
  });

  onMount(async () => {
    const result = await axios.get("http://localhost:3000/api/charts/minute");
    setData(result.data);
  });
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

<svelte:window bind:innerWidth bind:innerHeight />

<main>
  <h2>my first svelte app</h2>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p>
  <h3>{innerWidth}, {innerHeight}</h3>
</main>
