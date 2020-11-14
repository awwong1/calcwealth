const fetchTimeout = (
  input: RequestInfo,
  init?: RequestInit,
  timeoutMs = 7000
): Promise<Response> => {
  let didTimeOut = false;

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      didTimeOut = true;
      reject(new Error(`Request ${input} timed out after ${timeoutMs} ms`));
    }, timeoutMs);

    fetch(input, init)
      .then((response) => {
        // Clear the timeout as cleanup
        clearTimeout(timeout);
        if (!didTimeOut) {
          resolve(response);
        }
      })
      .catch((err) => {
        if (didTimeOut) return;
        reject(err);
      });
  });
};

export default fetchTimeout;
