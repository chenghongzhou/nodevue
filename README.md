# vueblogs

express+mongodb+前台vue+后台管理swig模板，搭建的小型博客。  

包括分类，登陆，注册，评论  

本来是想写好放线上去，但看了看一台独立的服务器还挺贵的哈。想了想就算了，直接在github上搞个个人博客算了。地址:'https://github.com/insistmd/insistmd.github.io'  

所以也不准备再写了,页面很简陋。但还是先留着把，说不定以后会用上  


打包前台vue:npm run build同时启动服务，数据库。地址栏输入:http://localhost:8088/。就可以看到打包后的界面了  

开启数据库借助的是robo3T 下载地址:'https://robomongo.org/'  

先打开控制台，进入mongodb的文件下面的bin目录执行  
mongod --dbpath=d:\vueblogs\bd --port=27020 #d:\vueblogs\bd 是项目  
然后打开robo3T里面你建立的27020的连接，就启动成功了。

