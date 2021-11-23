# @ham-zeal/react-zendesk

> A component simplifies Zendesk widget usage in your React application

## Introduction

This component applies to Zendesk Web Widget including contact form, live chat, talk, answer bot and help center. For more information on widget and API, please check [Zendesk official documentation](https://developer.zendesk.com/embeddables/docs/widget/introduction)

## Installation

```sh
yarn add @ham-zeal/react-zendesk
```

## Component Usage

```js
import React from "react";
import ReactDOM from "react-dom";
import { ZenDeskHandler, ZendeskAPI } from "@ham-zeal/react-zendesk";
const ZEN_DESK_KEY = "your zendesk embed key";

// Take the contact form as an example
// Let's customize our contact form appearance, launcher, and add pre-filled content
const settings = {
  color: {
    theme: "#000",
  },
  launcher: {
    chatLabel: {
      "en-US": "Need Help",
    },
  },
  contactForm: {
    fields: [
      { id: "description", prefill: { "*": "My pre-filled description" } },
    ],
  },
};

// Will render a german version of your widget
const App = () => {
  return (
    <Zendesk
      defer
      zen_desk_key={ZEN_DESK_KEY}
      zen_desk_settings={settings}
      onLoaded={() => ZendeskAPI("setLocale", "de");}
    />
  );
};

ReactDOM.render(<App />, document.getElementById("#app"));
```

## Zendesk API usage

```js
import { ZendeskAPI } from "@ham-zeal/react-zendesk";
...
// Set Zendesk widgets in German
ZendeskAPI("setLocale", "de");
...

```

## Resources

[Zendesk Widget Documentation](https://developer.zendesk.com/embeddables/docs/widget)

## License

MIT
