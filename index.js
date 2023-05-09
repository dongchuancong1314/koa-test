const Koa = require("koa");
const fs = require("fs");
const sketch2json = require("sketch2json");
const layerParser = require("./parser/layerParser");
const ebComRender = require("./render/ebComRender");

const app = new Koa();

const handleReadFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, data) => {
        if (error) {
          reject(error);
        } else {
          sketch2json(data).then((json) => {
            resolve(json);
          });
        }
    });
  });
};

const main = async (ctx) => {
  let pageData = {};
  const sketchJson = await handleReadFile("./file/Demo-group.sketch");
  const { pages } = sketchJson;

  // 对每个页面进行处理解析
  const result = Object.keys(pages).map((key) => {
    const page = pages[key];
    return layerParser(page);
  });

  // 以artboard（面板）为单位输出页面, 把处理后的json数据，转换成eb组件
  // pageData = result.children?.map((child) => ebComRender(child))
  result.forEach((page) => {
    page.children.forEach((artboard) => {
      const ebComs = ebComRender(artboard);

      pageData[`${Math.random()}`] = {
        comps: ebComs,
      };
    });
  });

  ctx.response.body = pageData;
};

app.use(main);
app.listen(8001);
