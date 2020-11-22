import { useEffect } from "react";
import { yaMetricsInstanceName } from "../const";
import { warn } from "../utils";

export const useYMScript = (init?: () => void) => {
  useEffect(() => {
    (function(window, document, scriptTag, scriptLocation, instanceName) {
      try {
        window[instanceName] =
          window[instanceName] ||
          function() {
            (window[instanceName].a = window[instanceName].a || []).push(
              arguments
            );
            window[instanceName].l = Number(new Date());
          };
      } catch (e) {
        warn(e.message || e);
      }

      const firstScriptTag = document.getElementsByTagName(scriptTag)[0];

      const yaMetricsScript = document.createElement(
        scriptTag
      ) as HTMLScriptElement;
      yaMetricsScript.async = true;
      yaMetricsScript.src = scriptLocation;

      firstScriptTag.parentNode?.insertBefore(yaMetricsScript, firstScriptTag);

      if (init) {
        init();
      }

      return () => {
        firstScriptTag.parentNode?.removeChild(yaMetricsScript);
      };
    })(
      window,
      document,
      "script",
      "https://mc.yandex.ru/metrika/tag.js",
      yaMetricsInstanceName
    );
  }, [init]);
};
