 import * as LightweightCharts from "lightweight-charts"; 

export const chartProps = {
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
};

export const candleProps = {
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
};

export const areaProps : LightweightCharts.AreaSeriesPartialOptions = {
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
};

export const lineProps : LightweightCharts.LineSeriesPartialOptions = {
  // title: "5 unit average",
  color: "rgba(55, 150, 250, 1)",
  lineWidth: 2,
};

