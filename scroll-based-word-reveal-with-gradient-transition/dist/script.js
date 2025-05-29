document.addEventListener('scroll', function() {
  const words = document.querySelectorAll('.word');
  const windowHeight = window.innerHeight;
  
  let currentLineTop = null;
  let lineWords = [];

  words.forEach((word, wordIndex) => {
    const wordPosition = word.getBoundingClientRect();

    // Erkennen einer neuen Zeile
    if (currentLineTop === null || wordPosition.top !== currentLineTop) {
      if (lineWords.length > 0) {
        applyScrollEffect(lineWords);
      }

      currentLineTop = wordPosition.top;
      lineWords = [];
    }

    lineWords.push(word);
  });

  if (lineWords.length > 0) {
    applyScrollEffect(lineWords);
  }

  function applyScrollEffect(lineWords) {
    const firstWord = lineWords[0];
    const lineTop = firstWord.getBoundingClientRect().top;

    // Berechne den Fortschritt des Scrollens für diese Zeile
    if (lineTop < windowHeight * 0.75 && lineTop > windowHeight * 0.5) {
      const progress = 1 - (lineTop - windowHeight * 0.5) / (windowHeight * 0.25);
      
      lineWords.forEach((word, index) => {
        const threshold = index / lineWords.length;

        if (progress >= threshold && !word.classList.contains('visible')) {
          word.classList.add('visible');
        }
      });
    } else if (lineTop <= windowHeight * 0.5) {
      lineWords.forEach(word => {
        if (!word.classList.contains('visible')) {
          word.classList.add('visible');
        }
      });
    } else {
      // Wenn die Zeile noch nicht bei 75% ist, entferne die Farbe (nur, wenn sie nicht sichtbar sein sollte)
      lineWords.forEach(word => {
        if (lineTop > windowHeight * 0.75 && word.classList.contains('visible')) {
          word.classList.remove('visible');
        }
      });
    }
  }
});