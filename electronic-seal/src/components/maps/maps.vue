<template>
  <div class="home_div">
    <div id="title">已联网煤矿分布图</div>
    <div id="container"></div>
  </div>
</template>
<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from '@vue/reactivity';

export default {
  setup() {
    const map = shallowRef(null);
    return {
      map,
    };
  },
  create() {},
  methods: {
    ininMap() {
      AMapLoader.load({
        key: '442d49b895586ee2fc57400954757435', // 设置您的key
        version: '2.0',
        plugins: [
          'AMap.ToolBar',
          'AMap.Driving',
          'AMap.OverView',
          'AMap.MapType',
          'AMap.Geolocation',
        ],
        AMapUI: {
          version: '1.1',
          plugins: [],
        },
        Loca: {
          version: '2.0.0',
        },
      })
        .then((AMap) => {
          this.map = new AMap.Map('container', {
            viewMode: '3D',
            zoom: 6,
            zooms: [2, 22],
            center: [109.47, 36.6],
          });

          const positionArr = [
            [110.23, 37.78],
            [113.73, 37.49],
            [108.79, 37.61],
            [117.59, 37.6],
            [111.07, 39.05],
            [110.07, 38.05],
            [112.07, 37.05],
            [112.106257, 36.962733],
            [106.830097, 38.859027],
            [116.449181, 39.98614],
          ];
          positionArr.forEach((item) => {
            const marker = new AMap.Marker({
              title: `煤矿，经纬度：${item[0]},${item[1]}`,
              position: [item[0], item[1]],
            });
            this.map.add(marker);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addMarker() {},
  },
  mounted() {
    // DOM初始化完成进行地图初始化
    this.ininMap();
  },
};
</script>
<style scope>
.home_div {
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
  position: relative;
}
#container {
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
  z-index: 0;
}
#title {
  position: absolute;
  width: auto;
  height: 22px;
  top: 20px;
  left: 20px;
  z-index: 100;
  font-size: 22px;
  line-height: 22px;
  font-weight: 400;
}
</style>
