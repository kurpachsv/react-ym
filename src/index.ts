import { isBrowser, warn, log } from "./utils";
import { yaMetricsInstanceName } from "./const";

const executeCommand = (target, ...args) => {
  if (!isBrowser()) {
    return;
  }
  if (!window[yaMetricsInstanceName]) {
    warn("ym must be initialized");
    return;
  }
  const [command] = args;
  if (typeof command !== "string") {
    warn("ym command must be a string");
    return;
  }
  try {
    window[yaMetricsInstanceName](target, ...args);
    log(`${command} executed`);
  } catch (e) {
    warn(e.message || e);
  }
};

export const init = (target, opts = {}) => {
  executeCommand(target, "init", {
    id: target,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    ...opts
  });
};

export const reachGoal = (target, opts = {}) => {
  executeCommand(target, "reachGoal", opts);
};
