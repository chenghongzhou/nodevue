import showdown from 'showdown'

const MainJs={
  toHtml() {
    const text = document.getElementById("conent") || '';
    if (text == '') {
      return false;
    }
    const rest = document.getElementById('rest') || '';
    const converter = new showdown.Converter();
    const htmls = converter.makeHtml(text.value);
    rest.innerHTML = htmls;
    const pre = document.querySelectorAll('pre') || '';
    const code = document.querySelectorAll('code') || '';
    for (var i = 0; i < pre.length; i++) {
      pre[i].style.fontSize = "13px";
      pre[i].style.padding = "9.5px";
      pre[i].style.lineHeight = "1.42857143";
      pre[i].style.color = "#333";
      pre[i].style.wordBreak = "break-all";
      pre[i].style.wordWrap = "break-word";
      pre[i].style.backgroundColor = "#f5f5f5";
      pre[i].style.border = "1px solid #ccc";
      pre[i].style.borderRadius = "4px";
      pre[i].style.margin = "10px 0px";
    }
    for (var i = 0; i < code.length; i++) {
      code[i].style.fontSize = "13px";
      code[i].style.padding = "9.5px";
      code[i].style.lineHeight = "1.42857143";
      code[i].style.color = "#333";
      code[i].style.wordBreak = "break-all";
      code[i].style.wordWrap = "break-word";
      code[i].style.backgroundColor = "#f5f5f5";
      code[i].style.border = "1px solid #ccc";
      code[i].style.borderRadius = "4px";
    }
  }
}

export default MainJs;
