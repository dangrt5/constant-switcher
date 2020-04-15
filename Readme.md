# Dynamic Constant Changer

## Features

- Serve library of constants from local storage
- Update environment of single constant without rebuilding and save to local storage
- Update environment of all constants without rebuilding and save to local storage
- Add custom values to defined variables

## Requirements

1. Yarn add "react-select @material-ui/core";

2. Store constants for all environments in ./config/

**config.js**

```javascript
if (process.env.NODE_ENV === "production") {
  module.exports = require("./config.prod");
} else if (process.env.NODE_ENV === "development") {
  module.exports = require("./config.dev");
} else if (process.env.NODE_ENV === "test") {
  module.exports = require("./config.test");
}
```

**config.{env}.js**

```javascript
module.exports = {
  CONSTANT1: VALUE,
  CONSTANT2: VALUE,
};
```

3. Import library of constants into util and add required fields where needed

**./utils/constantsUtil.js**

```javascript
import defaultConstants from  "./config/config";

const PRODUCTION_SITE = 'add production site here'// <-- add here

export const TOOL_WHITE_LIST = [
	'localhost',
	'yourqasite1.com' // <-- add here
	'yourqasite2.com'
	'yourqasite3.com'
	// ...etc
]
```

4. Add optional data in case items need to be hidden and/or has boolean values instead of a string

**./src/index.js**

```js
const BLOCK_LIST = [];
const BOOL_LIST = [];
```

## Implementation

1. Import _getEnv_ into your component and declare the constant you want to retrieve

**yourComponent.js**

```js
import { getEnv } from "./utils/constants";
const VALUE = getEnv("YOUR_CONSTANT");
```

## Switching Variables

1. Import ./index.js where you want displayed in your project and add necessary items to trigger open to view tool

**your_page.js**

```jsx
import React, { useState } from "react";
import EditConstantsUtil from "path/to/index.js";

const YourPage = () => {
  const [openConstantsTool, setOpenConstantsTool] = useState(false);
  return (
    <div>
      <YourHTMLElement onClick={() => setOpenConstantsTool(true)} />
      <EditConstantsUtil
        openConstantsTool={openConstantsTool}
        setOpenConstantsTool={setOpenConstantsTool}
      />
    </div>
  );
};
```
