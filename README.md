##仿水果网站

初识vue做的小型水果网站

***

####主要技术
> 前端框架vue(全家桶系列)+服务端node.js(框架express.js)+数据库mongo(mongoose)+bootstrap(布局)+图标库(阿里的iconfont)+iview(主要是使用了其中的步骤条)

#####第一版本(最后将版本合在一起了)
>第一个版本：没有使用状态管理
>第二个版本：在设置添加购物车时，实时改变购物车数量标记时用了状态管理

####主要功能
>主页面功能：登录、查看个人资料、浏览水果详细信息、退出登录、添加进购物车(必须登录才行)、图片懒加载、滑动加载
>购物车界面：单独删除某个水果、删除全部、选中全部、增加或者减水果数量
>地址界面：可以查看自己的所有地址、设置某个地址为收货地址、陈列多个地址
>确认地址:陈列地址和购买水果详细信息
>购买成功界面：生成订单号、以及展现所花钱


>初学vue供鉴赏 ^-^ ,如果有什么疑问或者建议希望联系菜鸟的我，*qq邮箱：1032869676@qq.com*

###如果没有安装nodejs，建议去odejs官网安装，同时你的得有数据库，主要使用mongo数据库
###git clone 下后npm install(使用淘宝镜像cnpm install)



##主要页面展示

1. 主界面： ![](https://github.com/UwonderMen/vue-mongo-nodejs/blob/master/public/images/%E6%B0%B4%E6%9E%9C%E7%BD%91%E7%AB%99%E4%B8%BB%E7%95%8C%E9%9D%A2.png)

2. 购物车界面： ![](https://github.com/UwonderMen/vue-mongo-nodejs/blob/master/public/images/%E8%B4%AD%E7%89%A9%E8%BD%A6%E5%9B%BE.png)
