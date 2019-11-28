// fetch is provided by the browser and not available for js or node.
// node doesn't support fetch

const fetchWeatherInfo = searchTerm => {
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${searchTerm}`)
    .then(response => {
      response.json().then(data => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

const weatherForm = document.querySelector("form");
const searchTerm = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  fetchWeatherInfo(searchTerm.value);
});
