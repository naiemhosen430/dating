
  export const showNotification = (title, body) => {
    if (window.Toaster) {
      window.Toaster.postMessage(JSON.stringify({ title, body }));
    }
  };



