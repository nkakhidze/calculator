function load() {
  const btns = document.querySelectorAll("#calculator span");
  const operators = ["+", "-", "x", "÷"];
  const inputScreen = document.querySelector("#screen");
  let btnValue;
  let input;

  for (let i = 0; i < btns.length; i++) {
    let decimalAdded = false; 

    btns[i].addEventListener("click", function() {
      btnValue = this.innerHTML;
      input = inputScreen.innerHTML;

      switch (btnValue) {
        case "C":
          inputScreen.innerHTML = "";
          decimalAdded = false;
          break;
        case "=":
          lastChar = input[input.length - 1];

          input = input.replace(/x/g, "*").replace(/÷/g, "/");

          if (operators.indexOf(lastChar) > -1 || lastChar == ".")
            input = input.replace(/.$/, "");

          if (input) {
            inputScreen.innerHTML = eval(input);
          }
          decimalAdded = false;
          break;
        case ".":
          if (!decimalAdded) {
            inputScreen.innerHTML += btnValue;
            decimalAdded = true;
          }
          break;
        case "+":
        case "-":
        case "x":
        case "÷":
          lastChar = input[input.length - 1];

          if (input != "" && operators.indexOf(lastChar) == -1)
            inputScreen.innerHTML += btnValue;
          else if (input == "" && btnValue == "-")
            inputScreen.innerHTML += btnValue;

          if (operators.indexOf(lastChar) > -1 && input.length > 1) {
            inputScreen.innerHTML = input.replace(/.$/, btnValue);
          }
          decimalAdded = false;
          break;
        default:
          inputScreen.innerHTML += btnValue;
          decimalAdded = false;
          break;
      }
    });
  }
  const handle = document.getElementById('handle');
  let isDragging = false;
  let startY;

  handle.addEventListener('mousedown', (e) => {
      isDragging = true;
      startY = e.clientY - handle.offsetTop; // Сохраняем начальную позицию клика
  });

  document.addEventListener('mousemove', (e) => {
      if (isDragging) {
          e.preventDefault(); // Предотвращаем выделение текста
          const y = e.clientY - startY;
          if (y >= -250 && y <= -120) { 
              handle.style.top = `${y}px`;
              if (y >= -125 && y <= -120) {   
                window.getSelection().removeAllRanges();            
                const imageContainer = document.getElementById('imageContainer');
                imageContainer.classList.remove('hidden');
                setTimeout(() => {
                  imageContainer.classList.add('show');
                  }, 2000);
                
                setTimeout(() => {
                  imageContainer.classList.remove('show')              
                  }, 1000);
                setTimeout(() => {
                  imageContainer.classList.add('hidden');
                  }, 1000);
                  inputScreen.innerHTML = Number(inputScreen.innerHTML)**2;
                        }
          }
        }
  });

  document.addEventListener('mouseup', () => {
      isDragging = false;
      handle.style.top = '-250px'; // Возвращение в исходное состояние
  });

  const square = document.getElementById('square');

  square.addEventListener('click', () => {
      alert('Слабо нажали. Попробуйте сильнее!');
  });
}


