import React, { useEffect } from "react";

const canUseDOM = () => {
  return !!window?.document?.createElement;
};

type zen_desk_widget_api = {
  setLocale?: (locale: string) => void;
  identify?: (user: Record<string, string>) => void;
  hide?: () => void;
  show?: () => void;
  activate?: (options: unknown) => void;
  setHelpCenterSuggestions?: (options: unknown) => void;
};

/**
 * Allows you to override the settings in the widget
 *
 * @param args any arguments from https://developer.zendesk.com/api-reference/widget/api/
 */
export const ZendeskAPI = (
  method_name: keyof zen_desk_widget_api,
  method_args: zen_desk_widget_api[typeof method_name]
) => {
  const has_method = window.zE && window.zE[method_name];
  if (canUseDOM() && window.zE && has_method) {
    window.zE[method_name](method_args);
  } else if (has_method) {
    console.warn("Zendesk is not initialized yet");
  } else {
    console.warn("i can not do this operation: ", method_name);
  }
};

type zdh_props = {
  onLoaded?: () => PromiseLike<void>;
  onRemoved?: () => PromiseLike<void>;
  zen_desk_key: string;
  defer?: boolean;
  zen_desk_settings?: unknown;
};

/**
 * A helper to append the zendesk script to the page, configure it, and clean up after
 * itself. Please use `ZendeskAPI` post load to configure
 *
 * @param handler_props - the config for zen desk
 */
export const ZenDeskHandler = ({
  zen_desk_key,
  onLoaded,
  onRemoved,
  defer,
  zen_desk_settings,
}: zdh_props): JSX.Element => {
  useEffect(() => {
    const script = document.createElement("script");
    if (defer) {
      script.defer = true;
    } else {
      script.async = true;
    }
    script.id = "ze-snippet";
    script.src = `https://static.zdassets.com/ekr/snippet.js?key=${zen_desk_key}`;
    if (zen_desk_settings) window.zESettings = zen_desk_settings;
    if (onLoaded) script.addEventListener("load", onLoaded);
    if (onRemoved) script.addEventListener("unload", onRemoved);
    document.body.appendChild(script);
    return () => {
      const found_script = document.querySelector("#ze-snippet");
      if (found_script) {
        document.body.removeChild(found_script);
        delete window.zE;
        delete window.zESettings;
      }
    };
  }, [zen_desk_key]);
  return <></>;
};
