// module.exports = {
    
//     devServer: {
//         //设置主机地址
//         host: 'localhost',
//         // 设置默认端口
//         port: 8081,
//        //设置代理n
//         proxy: {
//             '/api': {
//                 // 目标 API 地址
//                 target: 'http://www.bridge.cn',
//                 // 如果要代理 websockets
//                 ws: true,
//                 // 将主机标头的原点更改为目标URL
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/api': ''//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
//                   }
//             }
//         }
//     }
// }
