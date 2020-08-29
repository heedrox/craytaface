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
