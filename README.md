# zipTool-for-cocoscreator
for cocoscreator，可以利用cococreator原生的解压接口来解压

# 安装
cd 当前目录(含有package.json的目录)
npm install 

# 执行
node app.js 文件路径

# 结果
比如：a.json文件会压缩成a.jsonc

#cocoscreator内执行解压逻辑：
cc.loader.load(cc.url.raw('resources/json/game_data.jsonc'), function(err, data) {
    let jsonStr:string=ZipUtils.decode(data);
})
ps:微信小游戏的接口会有点不同。这个跟微信的加载机制有关系，因为不能直接原生使用，所以没有提供。
