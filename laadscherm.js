window.onload = (event) => {
  var laadInterval = setInterval(call_back, 50000);
  function call_back() {
     document.location.href = "welcome.html";
     clearInterval(laadInterval);
  }
  };