// Menu button on phones
var menuButton = document.querySelector(".menu-button");
var steps = document.querySelector(".steps");
if (menuButton && steps) {
  menuButton.addEventListener("click", function () {
    var open = steps.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    menuButton.textContent = open ? "Close" : "Menu";
  });
}

// Quiz: mark all answers when the student presses "Check my answers"
var checkButton = document.getElementById("check-quiz");
if (checkButton) {
  var questions = document.querySelectorAll(".q");

  checkButton.addEventListener("click", function () {
    var score = 0;
    var unanswered = 0;

    questions.forEach(function (q) {
      var chosen = q.querySelector("input:checked");
      var correct = q.getAttribute("data-answer");
      q.classList.remove("right", "wrong");
      q.querySelectorAll("label").forEach(function (l) { l.classList.remove("answer"); });

      if (!chosen) {
        unanswered++;
        return;
      }
      if (chosen.value === correct) {
        score++;
        q.classList.add("right");
        q.querySelector(".result").textContent = "Correct. " + q.getAttribute("data-why");
      } else {
        q.classList.add("wrong");
        q.querySelector(".result").textContent = "Not quite. " + q.getAttribute("data-why");
        q.querySelector('input[value="' + correct + '"]').parentElement.classList.add("answer");
      }
    });

    var total = questions.length;
    var message = "You scored " + score + " out of " + total + ".";
    if (unanswered > 0) {
      message += " You left " + unanswered + " question" + (unanswered > 1 ? "s" : "") + " blank.";
    }
    if (score === total) {
      message += " Excellent, you are ready for the project.";
    } else if (score >= total - 2) {
      message += " Good work. Read the explanations for the ones you missed.";
    } else {
      message += " Go back over Lessons 1 to 3, then try again.";
    }
    document.getElementById("quiz-score").textContent = message;
  });

  document.getElementById("reset-quiz").addEventListener("click", function () {
    questions.forEach(function (q) {
      q.classList.remove("right", "wrong");
      q.querySelectorAll("input").forEach(function (i) { i.checked = false; });
      q.querySelectorAll("label").forEach(function (l) { l.classList.remove("answer"); });
    });
    document.getElementById("quiz-score").textContent = "";
    window.scrollTo(0, 0);
  });
}
