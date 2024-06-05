//未用
import { Style } from 'mapbox-gl'
const mapVecStyle: Style = {
  name: '矢量地图',
  zoom: 3,
  version: 8,
  layers: [
    {
      id: 'tdtVec',
      type: 'raster',
      source: 'tdtVec',
      minzoom: 0,
      maxzoom: 18
    },
    {
      id: 'tdtCva',
      type: 'raster',
      source: 'tdtCva',
      minzoom: 0,
      maxzoom: 18
    }
  ],
  sources: {
    tdtVec: {
      type: 'raster',
      tiles: [
        // 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=9e52691478668502f94b66e1b1b46e81',
        'http://t1.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=9e52691478668502f94b66e1b1b46e81',
        'http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=9e52691478668502f94b66e1b1b46e81',
        'http://t3.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=9e52691478668502f94b66e1b1b46e81',
        'http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=9e52691478668502f94b66e1b1b46e81',
        'http://t5.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=9e52691478668502f94b66e1b1b46e81',
        'http://t6.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=9e52691478668502f94b66e1b1b46e81',
        'http://t7.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=9e52691478668502f94b66e1b1b46e81'
        // 'http://10.6.130.132:81/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=9e52691478668502f94b66e1b1b46e81'
      ],
      tileSize: 256
    },
    tdtCva: {
      type: 'raster',
      tiles: [
        // 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=9e52691478668502f94b66e1b1b46e81',
        'http://t1.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=9e52691478668502f94b66e1b1b46e81',
        'http://t2.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=9e52691478668502f94b66e1b1b46e81',
        'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=9e52691478668502f94b66e1b1b46e81',
        'http://t4.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=9e52691478668502f94b66e1b1b46e81',
        'http://t5.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=9e52691478668502f94b66e1b1b46e81',
        'http://t6.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=9e52691478668502f94b66e1b1b46e81',
        'http://t7.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=9e52691478668502f94b66e1b1b46e81'
        //'http://10.6.130.132:81/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=9e52691478668502f94b66e1b1b46e81'
      ],
      tileSize: 256
    }
  }
}
export default mapVecStyle
