<template>
  <div class="newspart">
   <p>网站动态</p>
    <div class="newspartlist">
      <a href="javascript:;" class="newspartifo">年少衬轻狂</a>
      <a href="javascript:;" class="newspartifo">谈笑倚同窗</a>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'News'
  }
</script>

<style scoped>
.newspart{
  margin-top: 16px;
  background: #fff;
  width: 266;
  min-height: 300px;
  /*padding: 16px 12px;*/
}
  p{
    font-size: 16px;
    text-align: center;
    height: 35px;
    line-height: 35px;
    background: #fbfbfb;
    border-bottom: 1px solid #f0f0f0;
  }
  .newspartlist{
    width:256px;
    padding: 10px 12px;
  }
  .newspartifo{
    width: 100%;
    height: 30px;
    color: #666;
    line-height: 30px;
    word-break: break-all;
    border-bottom: 1px dashed #d9d9d9;
    text-indent: 5px;
    display: block;
  }
.newspartifo:hover{
  color: darkred;
  text-decoration: underline;
}
</style>
