# craytaFace

An open attempt to mock Gameface in browser, so we can speed up development of UI widgets in Crayta games.

If you want to test this with me, provide code, or whatever, please let me know. This is an open initiative, and I'm willing to work this with more people. The more the merrier.

# Test it

If you open "example.html" in your Chrome browser, it will work. It looks like a UI widget, but
it is executable in the browser. It works because it calls "craytaface.js", which implements or mocks:

- engine.on(..) calls.
- engine.createJSModel call.
- data-bind-* stuff (value and style-background-color, more precisely)

You can also do calls to your functions. Open a console inspector in your chrome, while opening the "example.html" file, and type:

> window.craytaFace.callFunction("setSeconds", 7)

# What needs to be done

- Implement the rest of databinding: https://coherent-labs.com/Documentation/cpp-gameface/d1/ddb/data_binding.html

- implement more engine.x calls.

- ...

# What does this mean. Will it ever be something this repo?

I honestly, do not think so. The Gameface engine used in Crayta is a different browser engine
than Chrome, Safari, etc. So, there subset of supported html tags, css properties, etc. are
different to those in the browser. Check: https://coherent-labs.com/Documentation/cpp-gameface/d7/dd9/html_elements.html

So, it would be technically impossible to really simulate the real gameface browser in a chrome browser, for example.

In the other hand, there is a LOT of work reimplementing all data-bind-X stuff. And although it
can be implemented, the way it renders it might be slightly different to the Gameface browser, so once I again, I think there would be slight differences in both browser engines that would make this not usable at the end.

Is that so? We don't know. We can only explore, and see what the future brings to us...
