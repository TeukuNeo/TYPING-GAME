const typingText = document.querySelector(".typing-text p")
inpField = document.querySelector(".wrapper .input-field")
timeTag = document.querySelector(".time span b")
mistakeTag = document.querySelector(".mistake span")
wpmTag = document.querySelector(".wpm span")
cpmTag = document.querySelector(".cpm span")
tryAgainBtn = document.querySelector("button")


let timer,
    maxTime = 180,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0

function randomParagraph() {
    let randIndex = Math.floor(Math.random() * paragraphs.length)
    typingText.innerHTML = ""
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`
        typingText.innerHTML += spanTag
    })
    typingText.querySelectorAll("span")[0].classList.add("active")
    document.addEventListener("keydown", () => inpField.focus())
    typingText.addEventListener("click", () => inpField.focus())
}

function initTyping() {
    const characters = typingText.querySelectorAll("span")
    let typedChar = inpField.value.split("")[charIndex]
    if (charIndex < characters.length - 1 && timeLeft > 0) {
      if (!isTyping) {
        timer = setInterval(initTimer, 1000)
        isTyping = true
      }
      if (typedChar == null) {
        // No change needed here for ending on wrong key
      } else {
        if (characters[charIndex].innerText === typedChar) {
          characters[charIndex].classList.add("correct")
        } else {
          // End the game when a mistake is made
          characters.forEach(span => span.classList.remove("active"))
          inpField.value = "" // Clear input field
          clearInterval(timer)
          // Update stats (optional)
          mistakes++;
          wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60)
          wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
          mistakeTag.innerText = mistakes
          wpmTag.innerText = wpm
          cpmTag.innerText = charIndex - mistakes
          // (Optional) Display "Game Over" message
        }
        charIndex++;
      }
      characters.forEach(span => span.classList.remove("active"))
      characters[charIndex].classList.add("active")
    } else {
      inpField.value = ""
      clearInterval(timer)
    }
  }

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--
        timeTag.innerText = timeLeft
    } else {
        clearInterval(timer)
    }
}

function resetGame(){
    randomParagraph()
    inpField.value = ""
    clearInterval(timer)
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0
    timeTag.innerText = timeLeft
    mistakeTag.innerText = mistakes
    wpmTag.innerText = 0
    cpmTag.innerText = 0
}

randomParagraph()
inpField.addEventListener("input", initTyping)
tryAgainBtn.addEventListener("click", resetGame)