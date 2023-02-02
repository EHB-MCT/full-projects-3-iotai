window.onload = (event) => {
    var laadInterval = setInterval(call_back, 6000);
    function call_back() {
        document.location.href = 'html/welcome.html';
        clearInterval(laadInterval);
    }
};
