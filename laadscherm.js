window.onload = (event) => {
  var laadInterval = setInterval(call_back, 600000);
  function call_back() {
     document.location.href = "welcome.html";
     clearInterval(laadInterval);
  }
  };