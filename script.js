const micButton = document.querySelector('#micButton');
const input = document.querySelector('#input');
const resultButton = document.querySelector('#result');
const resultImg = document.querySelector('#resultImg');

// Create a new SpeechRecognition object
const recognition = new window.webkitSpeechRecognition();

// Set some options
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US';

function removeNonMathWords(str) {
  // Define a regular expression that matches non-math words
  const nonMathRegex = /[^\d+\-*/().]/g;
  
  // Remove non-math words using the replace() method
  return str.replace(nonMathRegex, "");
}

// When the user clicks the button, start the recognition process
micButton.addEventListener('click', function() {
  recognition.start();
});

// When the recognition process ends, send the captured text to a math evaluation API
recognition.addEventListener('result', function(event) {
  const speechResult = event.results[0][0].transcript;

  // get the expression
  const expressions = removeNonMathWords(speechResult);
  const expr = expressions.match(/[0-9+*/()-]+/g).join("");
  input.value = expr;

  resultButton.addEventListener('click', function() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        const result = JSON.parse(this.responseText).result;
        console.log(result);
        document.querySelector('#result').textContent = result;
        document.querySelector('#buttons').textContent = result;
        document.querySelector('#buttons').style.display = 'flex';
      }
    };
    xhr.open('POST', 'https://api.mathjs.org/v4/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({expr: input.value}));
  });
  
  num1 = Math.floor(Math.random() * 11);
  num2 = Math.floor(Math.random() * 11);
  num3 = Math.floor(Math.random() * 11);
  
  // Randomize the order of the numbers
  const numbers = [num1, num2, num3];
  numbers.sort(() => Math.random() - 0.5);
  
  const num1Button = document.querySelector('#num1button');
  const num2Button = document.querySelector('#num2button');
  const num3Button = document.querySelector('#num3button');
  num1Button.textContent = numbers[0];
  num2Button.textContent = numbers[1];
  num3Button.textContent = numbers[2];
  
  function checkAnswer(button) {
    const resultButton = document.querySelector('#buttons');
    const answer = button.textContent;
    const result = resultButton.textContent;
    if (parseInt(answer) === parseInt(result)) {
      document.getElementById("image").src = imageFile;
      document.getElementById("image-container").style.display = "block";
      document.getElementById("num1button").textContent = "";
      document.getElementById("num2button").textContent = "";
      document.getElementById("num3button").textContent = "";
      resultButton.style.display = 'none';
    } else {
      document.getElementById("image").src = imageFile;
      document.getElementById("image-container").style.display = "block";
    }
  }  

micButton.addEventListener('click', function() {
  // Show the buttons
  resultDiv.style.display = 'block';
  document.querySelector('#buttons').style.display = 'flex';
});

function displayImage(imageFile) {
  document.getElementById("image").src = imageFile;
  document.getElementById("image-container").style.display = "block";

  // Reset the numbers
  document.getElementById("num1button").textContent = "";
  document.getElementById("num2button").textContent = "";
  document.getElementById("num3button").textContent = "";
};

})
