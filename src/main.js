const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.lastLi");
const x = localStorage.getItem("x");

const XObject = JSON.parse(x);

const hashMap = XObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "B", url: "https://www.bilibili.com" }
];

const simplifyURL = url => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
const render = () => {
  $siteList.find("li:not(.lastLi)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`
          <li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyURL(node.url)}</div>
                <div class="close">
                <svg class="icon">
                    <use xlink:href="#icon-close">
                </use></svg>
            </div>
           
          </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    // 阻止默认的冒泡
    $li.on("click", ".close", e => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();

$(".addButton").on("click", () => {
  let url = window.prompt("输入你想添加的网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyURL(url)[0].toUpperCase(),
    logoType: "text",
    url: url
  });

  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on("keypress", e => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
