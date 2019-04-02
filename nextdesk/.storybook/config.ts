import { configure } from "@storybook/react";
// import "@storybook/addon-console";
import { setConsoleOptions } from "@storybook/addon-console";

setConsoleOptions({
    panelExclude: [],
    panelInclude: [],
    consoleExclude: [],
    consoleInclude: [],
    log: "",
    warn: "",
    error: ""
});

// automatically import all files ending in *.stories.tsx
const req = require.context("../src", true, /.*\.stories\.tsx$/);

function loadStories() {
    req.keys().forEach(req);
}

configure(loadStories, module);
