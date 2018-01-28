const REQUEST_LIMIT = 3;
const REQUEST_LIMIT_TIMEOUT = 1000;
const AFTER_LIMIT_TIMEOUT = 250;

export function debounce(fn: Function): (args?: any) => void {
  let limittedCallId: number = null;
  let lastCallId: number = null;  
  let requestsCount = 0;

  return function (this: any) {
    requestsCount++;
    clearTimeout(lastCallId);
    lastCallId = window.setTimeout(() => requestsCount = 0, REQUEST_LIMIT_TIMEOUT);
    const args = arguments;    

    if (requestsCount > REQUEST_LIMIT) {
      clearTimeout(limittedCallId);
      limittedCallId = window.setTimeout(() => fn.apply(this, args), AFTER_LIMIT_TIMEOUT);
    } else {
      fn.apply(this, args);
    }
  };
}
