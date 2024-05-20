
  
  function showNotification(data,message) {
    if (window.Toaster) {
      window.Toaster.postMessage(message);
    }
  }
  
