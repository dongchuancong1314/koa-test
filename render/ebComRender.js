const createConfig = (layer) => {
  console.log(layer, "layer==");
  const { style = {} } = layer;
  return {
    type: "SimpleText",
    name: "文本",
    styles: [{ category: "1", useCustom: true }, { ...style }],
  };
};

const createEbCom = (layer, config) => {
  return {
    id: `${Math.random()}`,
    terminalType: "PC",
    updateTime: new Date().getTime(),
    config,
  };
};

const ebComRender = (layer) => {
  return layer.children.map((child) => {
    const config = createConfig(child);
    const ebCom = createEbCom(child, config);
    return ebCom;
  });
};

module.exports = ebComRender;
