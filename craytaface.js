// Do not expect clean code.
// Expect just Proof of concepts to check if any of this works.
// If it works, then we will clean this up.

const synchronizeModels = () => {
  (() => {
    const elements = document.querySelectorAll("[data-bind-value]");
    elements.forEach(x => {
      const expresion = x.getAttribute("data-bind-value");
      x.innerText = eval(expresion);
    })
  })();

  (() => {
    const elements = document.querySelectorAll("[data-bind-style-background-color]");
    elements.forEach(x => {
      const expresion = x.getAttribute("data-bind-style-background-color");
      x.style.backgroundColor = eval(expresion);
    })
  })();

  const mockFonts = () => {
    for (var sheet=0; sheet < document.styleSheets.length; sheet++) {
      try {
        for (var i=0; i<document.styleSheets[sheet].cssRules.length; i++)
          {
          var rule = document.styleSheets[sheet].cssRules[i];
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
    };
  }
mockFonts();
// fontObjects.forEach( function(v) { console.log(v.toString()); });
};

window.onload = synchronizeModels;

window.engine = {
  on: (funcName, func) => { window[funcName] = func },
  createJSModel: (modelName, value) => { window[modelName] = value },
  updateWholeModel: (object) => {},
  synchronizeModels: synchronizeModels
}
window.craytaFace = {
  callFunction: (funcName, ...vars) => window[funcName](vars),
};
