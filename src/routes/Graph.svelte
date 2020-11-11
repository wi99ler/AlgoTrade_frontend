<script lang="ts">
  import { onMount } from "svelte";
  import { afterUpdate } from "svelte/internal";
  import * as LightweightCharts from "lightweight-charts";
  import axios from "axios";
  import _ from "lodash";
  import Button from "@smui/button";

  let innerWidth = 800;
  let innerHeight = 600;

  let current = { from: 0, to: 0 };

  let candleData = [];
  let volumeData = [];
  let averageData = [];

  async function setData(data) {
    console.log("setData", current);
    console.log(data[0].time, data[data.length - 1].time);
    console.log(candleData.length, data.length);
    const uniqueData = [];
    for (let i = 0; i < data.length; i++) {
      let flag = true;
      for (let j = 0; j < candleData.length; j++) {
        if (data[i].time === candleData[j].time) {
          flag = false;
          break;
        }
      }
      if (flag) {
        uniqueData.push(data[i]);
      }
    }
    candleData = _.union(candleData, uniqueData);
    candleData = candleData.sort((a, b) => a.time - b.time);

    candleSeries.setData(candleData);

    uniqueData.forEach((item) => {
      volumeData.push({ time: item.time, value: item.volume });
    });

    volumeData.sort((a, b) => a.time - b.time);
    areaSeries.setData(volumeData);

    const newData = [];

    let sum = 0;
    if (uniqueData.length > 10) {
      for (let i = 0; i < 10; i++) {
        sum += uniqueData[i].close;
      }
      for (let i = 10; i < uniqueData.length; i++) {
        sum -= uniqueData[i - 10].close;
        sum += uniqueData[i].close;
        newData.push({ time: uniqueData[i].time, value: sum / 10 });
      }
    }

    averageData = [...newData, ...averageData];
    averageData.sort((a, b) => a.time - b.time);
    lineSeries.setData(averageData);

    // let view = chart.timeScale().getVisibleLogicalRange();

    // console.log("move to ", data.length, view.to - view.from + data.length);

    // chart.timeScale().setVisibleLogicalRange({
    //   from: data.length,
    //   to: view.to - view.from + data.length,
    // });
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
      visible: true,
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

  chart.timeScale().subscribeVisibleLogicalRangeChange(async (param) => {
    const barsInfo = candleSeries.barsInLogicalRange(param);

    if (barsInfo !== null && barsInfo.barsBefore < 50) {
      console.log("barsInfo", barsInfo);
      console.log(
        "load new data",
        "current",
        current.from,
        current.to,
        "param",
        param.from,
        param.to
      );

      console.log(
        "scrap ",
        (current.from - 60 * 60 * 3).toString(),
        current.from
      );

      const result = await axios.get(
        "http://localhost:3000/api/chart/minute?start=" +
          (current.from - 60 * 60 * 3).toString() +
          "&end=" +
          (current.from - 60).toString()
      );
      console.log("data size", result.data.length, result.data);
      await setData(result.data);
      current.from = result.data[0].time;
    }
  });

  onMount(async () => {
    const result = await axios.get("http://localhost:3000/api/chart/minute");
    const data = result.data.sort((a, b) => a.time - b.time);
    current.from = data[0].time;
    current.to = data[data.length - 1].time;
    setData(data);
  });

  function test() {
    console.log(averageData);
    //    averageData = averageData.sort((a, b) => a.time - b.time);
    for (let i = 0; i < averageData.length - 1; i++) {
      if (averageData[i].time > averageData[i + 1].time) {
        console.log(
          "average ERROR!!!!!!!!!!!!!!!!!!!!!!",
          i,
          averageData[i],
          averageData[i + 1]
        );
      }
    }
    console.log("a");
    for (let i = 0; i < candleData.length - 1; i++) {
      if (candleData[i].time > candleData[i + 1].time) {
        console.log(
          "candle ERROR!!!!!!!!!!!!!!!!!!!!!!",
          i,
          candleData[i],
          candleData[i + 1]
        );
      }
    }
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<svelte:window bind:innerWidth bind:innerHeight />

<main>
  <Button on:click={test}>click</Button>
</main>
