const yourElement = document.querySelector(".display");
const displayWrapper = document.querySelector("#displayWrapper");
const eCode = document.querySelector("code");
const cbBackground = document.querySelector("#switchBackground");
const iColor = document.querySelector("#iColor");
const iPaletteColor = document.querySelector("#iPaletteColor");
const iRangeStarLength = document.querySelector("#iRangeStarLength");
const iRangeDistance = document.querySelector("#iRangeDistance");
const iRangeDuration = document.querySelector("#iRangeDuration");
const iRangeFrequency = document.querySelector("#iRangeFrequency");
const iRangeMinFrequency = document.querySelector("#iRangeMinFrequency");
const iRangeBackgroundStars = document.querySelector("#iRangeBackgroundStars");

const labelColor = document.querySelector(".labelColor");
const labelDistance = document.querySelector(".labelDistance");
const labelStarLength = document.querySelector(".labelStarLength");
const labelDuration = document.querySelector(".labelDuration");
const labelFrequency = document.querySelector(".labelFrequency");
const labelMinFrequency = document.querySelector(".labelMinFrequency");
const labelBackgroundStars = document.querySelector(".labelBackgroundStars");

const shootingStar = new ShootingStar(yourElement, {});

const staticCode = "const shootingStar = new ShootingStar(yourElement";
let optionsToDisplay = {};

const render = () => {
  let newText = staticCode;
  if (!Object.keys(optionsToDisplay).length) {
    newText += ")";
  } else {
    newText += ",\n" + JSON.stringify(optionsToDisplay) + ")";
  }

  eCode.innerText = newText;
  hljs.highlightElement(eCode);
};

let preventer = false;
document.body.onclick = ({ target }) => {
  if (target.className === "palette") return;

  if (target.className !== "displayClickZone") preventer = false;
  else {
    if (!preventer) {
      preventer = true;
      iPaletteColor.click();
    } else preventer = false;
  }
};
iPaletteColor.onchange = ({ target }) => {
  yourElement.style.backgroundColor = target.value;
};

cbBackground.onchange = ({ target }) => {
  if (!target.checked) {
    shootingStar.showBackgroundStars();
    delete optionsToDisplay.showBackgroundStars;
  } else {
    shootingStar.hideBackgroundStars();
    optionsToDisplay.showBackgroundStars = false;
  }
  render();
};

iRangeStarLength.onchange = ({ target }) => {
  newValue = +target.value;
  if (newValue === 80) {
    delete optionsToDisplay.starLength;
  } else {
    optionsToDisplay.starLength = newValue;
  }
  shootingStar.setStarLength(newValue);
  labelStarLength.innerText = newValue + "px";
  render();
};
iRangeDistance.onchange = ({ target }) => {
  newValue = +target.value;
  if (newValue === 120) {
    delete optionsToDisplay.distance;
  } else {
    optionsToDisplay.distance = newValue;
  }
  shootingStar.setDistance(newValue);
  labelDistance.innerText = newValue + "px";
  render();
};
iRangeDuration.onchange = ({ target }) => {
  newValue = +target.value;
  if (newValue === 600) {
    delete optionsToDisplay.shootingDuration;
  } else {
    optionsToDisplay.shootingDuration = newValue;
  }
  shootingStar.setShootingDuration(newValue);
  labelDuration.innerText = newValue + "ms";
  render();
};
iRangeFrequency.onchange = ({ target }) => {
  newValue = +target.value;
  if (newValue === 1500) {
    delete optionsToDisplay.frequency;
  } else {
    optionsToDisplay.frequency = newValue;
  }
  shootingStar.setFrequency(newValue);
  labelFrequency.innerText = newValue + "ms";
  render();
};
iRangeMinFrequency.onchange = ({ target }) => {
  newValue = +target.value;
  const curFrequency = shootingStar.getCurrentOption("frequency");

  if (newValue > curFrequency) {
    newValue = target.value = curFrequency;
  }
  if (newValue === 500) {
    delete optionsToDisplay.minFrequency;
  } else {
    optionsToDisplay.minFrequency = newValue;
  }
  shootingStar.setMinFrequency(newValue);
  labelMinFrequency.innerText = newValue + "ms";
  render();
};
iRangeBackgroundStars.onchange = ({ target }) => {
  newValue = +target.value;
  if (newValue === 20) {
    delete optionsToDisplay.numberOfBackgroundStars;
  } else {
    optionsToDisplay.numberOfBackgroundStars = newValue;
  }
  shootingStar.setNumberOfBackgroundStars(newValue);
  labelBackgroundStars.innerText = newValue + "EA";
  render();
};
iColor.onchange = ({ target }) => {
  if (target.value === "#ccccff") {
    delete optionsToDisplay.starColor;
  } else {
    optionsToDisplay.starColor = target.value;
  }
  shootingStar.setStarColor(target.value);
  labelColor.innerText = target.value;
  render();
};

let playing = true;
const onClickPlayBtn = (btn) => {
  //   if (playing) {
  //     btn.innerText = "Stopped";
  //     optionsToDisplay.playWhenCreated = false;
  //     shootingStar.stop();
  //   } else {
  //     btn.innerText = "Playing";
  //     delete optionsToDisplay.playWhenCreated;
  //     shootingStar.play();
  //   }
  //   render();
  //   playing = !playing;
  shootingStar.setStarColor("red");
};

render();
