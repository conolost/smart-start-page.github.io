import "./styles.css";

// require("dotenv")
// const dotenv = require("dotenv-webpack");
// dotenv.config();

import "jquery";
import "popper.js";
import "./api.js";

$(document).ready(() => {
  setInterval(time, 1000);
});
function time() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  function addZero(x) {
    x = x < 10 ? "0" + x : x;
    return x;
  }

  function twelveHour(x) {
    x = x > 12 ? x - 12 : x == 0 ? (x = 12) : x;
    return x;
  }

  function AmPm(h) {
    h = h > 12 ? "pm" : "am";
    return h;
  }

  function greeting(h) {
    let greet =
      0 <= h && h < 6
        ? "Good night,"
        : 6 <= h && h < 12
        ? "Good morning,"
        : 12 <= h && h < 18
        ? "Good afternoon,"
        : "Good evening,";
    return greet;
  }

  function background(h) {
    let bg =
      0 <= h && h < 6
        ? "night.jpg"
        : 6 <= h && h < 12
        ? "morning.jpg"
        : 12 <= h && h < 18
        ? "afternoon.jpg"
        : "evening.jpg";

    $("html").css("backgroundImage", `url('./img/${bg}')`);
  }

  $("#time").text(
    `${addZero(twelveHour(hours))}:${addZero(minutes)}:${addZero(
      seconds
    )} ${AmPm(hours)}`
  );

  $("#greeting").text(greeting(hours));

  background(hours);
}

$("[contenteditable ='true']").bind("keydown", function (event) {
  var target = $(event.target);
  let c = event.keyCode;

  if (c === 13 || c === 27) {
    $("[contenteditable ='true']").blur();
    // Workaround for webkit's bug
    window.getSelection().removeAllRanges();
  }
});

function getName() {
  if (localStorage.getItem("name") === null) {
    $("#name").text("INPUT_NAME");
  } else {
    $("#name").html(localStorage.getItem("name"));
  }
}

function getFocus() {
  if (localStorage.getItem("focus") === null) {
    $("#focus").text("INPUT_FOCUS");
  } else {
    $("#focus").html(localStorage.getItem("focus"));
  }
}

function setName() {
  localStorage.setItem("name", $("#name").text());
}

function setFocus() {
  localStorage.setItem("focus", $("#focus").text());
}

$("#name").on("blur", setName);
$("#focus").on("blur", setFocus);
getName();
getFocus();
