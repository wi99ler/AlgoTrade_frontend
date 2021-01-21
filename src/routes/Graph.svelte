<script lang="ts">
  import { onMount } from "svelte";
  import { afterUpdate, onDestroy } from "svelte/internal";
  import * as LightweightCharts from "lightweight-charts";
  import axios from "axios";
  import _ from "lodash";
  import { Button } from "svelte-materialify";

  import {
    chartProps,
    candleProps,
    areaProps,
    lineProps,
  } from "./Graph/graphProps";

  let innerWidth = 800;
  let innerHeight = 600;

  let current = { from: 0, to: 0 };

  let candleData = [];
  let volumeData = [];
  let averageData = [];

  // Life cycle
  afterUpdate(() => {
    chart.resize(innerWidth * 0.8, innerHeight * 0.6);
  });

  var chart: LightweightCharts.IChartApi,
    candleSeries: LightweightCharts.ISeriesApi<"Candlestick">,
    areaSeries: LightweightCharts.ISeriesApi<"Area">,
    lineSeries: LightweightCharts.ISeriesApi<"Line">;

  onMount(async () => {
    // Chart Initialize
    chart = LightweightCharts.createChart("chart", chartProps);
    candleSeries = chart.addCandlestickSeries(candleProps);
    areaSeries = chart.addAreaSeries(areaProps);
    lineSeries = chart.addLineSeries(lineProps);

    chart.timeScale().subscribeVisibleLogicalRangeChange(async (param) => {
      const barsInfo = candleSeries.barsInLogicalRange(param);

      if (barsInfo !== null && barsInfo.barsBefore < 50) {
        const result = await axios.get(
          BACKEND_URL +
            "/api/chart/day?start=" +
            (current.from - 60 * 60 * 3).toString() +
            "&end=" +
            (current.from - 60).toString()
        );
        // console.log("data size", result.data.length, result.data);
        await setData(result.data);
        current.from = result.data[0].time;
      }
    });

    const result = await axios.get(BACKEND_URL + "/api/chart/day");
    //    console.log(result);
    const data = result.data.sort((a, b) => a.time - b.time);
    current.from = data[0].time;
    current.to = data[data.length - 1].time;
    setData(data);
  });

  async function setData(data) {
    //    console.log("setData", current);
    //    console.log(data[0].time, data[data.length - 1].time);
    //    console.log(candleData.length, data.length);
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
  }

  function test() {
    //    console.log(averageData);
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

<svelte:window bind:innerWidth bind:innerHeight />

<main>
  <Button on:click={test}>click</Button>
  <div id="chart" />
</main>

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
