window.SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.mozSpeechRecognition;

const recognition = new window.SpeechRecognition();

const getRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

new Vue({
  el: "#msg",
  data: {
    message: 0,
    guess: "GO HIGHER",
  },
  mounted() {
    recognition.start();
    recognition.addEventListener("result", this.onSpeak);
    recognition.addEventListener("end", () => recognition.start());
  },
  methods: {
    playAgain() {
      window.location.reload();
    },
    onSpeak(e) {
      const number = Number(e.results[0][0].transcript);
      this.checkValidNumber(number);
    },
    checkValidNumber(number) {
      const randomNumber = getRandomNumber();
      if (isNaN(number)) {
        this.message = "That is not a valid number";
        this.guess = "GO FOR NUMBER";
        return;
      }

      if (number > 100 || number < 1) {
        this.message = "Number  must be beween 1 and 100";
        this.guess = "GO IN BETWEEN";
        return;
      }

      if (number === randomNumber) {
        this.message = `Congrats! You have guessed the right number. <br/> The number is ${number}`;
        this.guess = false;
      } else if (number > randomNumber) {
        this.message = number;
        this.guess = "GO LOWER";
      } else {
        this.message = number;
        this.guess = "GO HIGHER";
      }
    },
  },
});
