// Do not expect clean code.
// Expect just Proof of concepts to check if any of this works.
// If it works, then we will clean this up.

const evaluateBindExpression = (expresion) => {
  const EXPRESION_REGEXP = new RegExp(/{{.*?}}/);
  const values = expresion.match(EXPRESION_REGEXP);
  values.forEach(v => {
    const realValue = eval(v.replaceAll("{", "").replaceAll("}", ""));
    expresion = expresion.replaceAll(v, realValue);
  });
  return eval(expresion);
};

const synchronizeModels = () => {
  const div = document.createElement('html');
  div.innerHTML = window["CRAYTAFACE_FIRST_BODY_TEMPLATE"].trim();
  console.log(div);
  document.body = div.getElementsByTagName("body")[0];
  (() => {
    const elements = document.querySelectorAll("[data-bind-value]");
    elements.forEach(x => {
      const expresion = x.getAttribute("data-bind-value");
      x.innerText = evaluateBindExpression(expresion);
    })
  })();

  (() => {
    const elements = document.querySelectorAll("[data-bind-style-background-color]");
    elements.forEach(x => {
      const expresion = x.getAttribute("data-bind-style-background-color");
      x.style.backgroundColor = evaluateBindExpression(expresion);
    })
  })();

  (() => {
    const elements = document.querySelectorAll("[data-bind-if]");
    elements.forEach(x => {
      let expresion = x.getAttribute("data-bind-if");
      const result = evaluateBindExpression(expresion);
      if (!result) x.parentNode.removeChild(x);
    })
  })();

  const mockFonts = () => {
    for (let sheet=0; sheet < document.styleSheets.length; sheet++) {
      try {
        for (let i=0; i<document.styleSheets[sheet].cssRules.length; i++)
          {
          const rule = document.styleSheets[sheet].cssRules[i];
          if (rule instanceof CSSFontFaceRule) {
                // console.log(rule.style.src);
                if (rule.style.src.indexOf("content.crayta.com") >= 0) {
                  const newSrc = rule.style.src.replace("https://content.crayta.com/fonts/", "./fonts/");
                  let font = new FontFace(rule.style.fontFamily, newSrc);
                  font.load().then(function(loadedFont)
                  {
                      document.fonts.add(loadedFont);
                  });
                }
          }
        }
      } catch (e) {
        // controlled exception when CORS -> console.log(e);
      }
    }
  };
mockFonts();
// fontObjects.forEach( function(v) { console.log(v.toString()); });
};

window.onload = () => {
  const target = document.body;
  const wrap = document.createElement('html');
  wrap.appendChild(target.cloneNode(true));
  window["CRAYTAFACE_FIRST_BODY_TEMPLATE"] = wrap.innerHTML;
  synchronizeModels();
};

window.engine = {
  on: (funcName, func) => { window[funcName] = func },
  createJSModel: (modelName, value) => { window[modelName] = value },
  updateWholeModel: (object) => {},
  synchronizeModels: synchronizeModels
};

window.craytaFace = {
  callFunction: (funcName, ...vars) => {
    if (!window[funcName]) alert('function not defined! Use engine.on(xxx, function) before!');
    return window[funcName](...vars)
  },
};
