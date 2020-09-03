/* 
* Convert one RGB value (Red OR Green OR Blue) to HEX 
*/
var rgbToHex = function (rgb) {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
};

/* 
* Convert three RGB values (Red, Green, Blue) to HEX 
*/
var fullColorHex = function (r, g, b) {   
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return red + green +blue;
};

/* 
* Convert HEX to RGB 
* Not currently in use...
*/
var hexToRBG = function (hex) {
  let r = 0, g = 0, b = 0;

  // 3 digits
  if (hex.length == 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];

  // 6 digits
  } else if (hex.length == 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }
  
  return "rgb("+ +r + "," + +g + "," + +b + ")";
}

/* 
* Returns a random HEX color 
* Not curently in use...
*/
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/* 
* Determine if a color is light or dark
* Accepts color as HEX or RGB
* Accepts a specificiity, default of 2, which returns 2 options, LIGHT or DARK
* TODO: Allow up to five values returning (BRIGHT, LIGHT, MEDIUM, DIM, DARK)
*/
function lightOrDark(color, specificity = 2) {
  // Variables for red, green, blue values
  var r, g, b, hsp;
  
  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {

      // If RGB, store the red, green, blue values in separate variables
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
      
      r = color[1];
      g = color[2];
      b = color[3];
  } else {
      
      // If HEX, convert it to RGB:
      color = +("0x" + color.slice(1).replace( 
      color.length < 5 && /./g, '$&$&'));

      r = color >> 16;
      g = color >> 8 & 255;
      b = color & 255;
  }
  
  // HSP (Highly Sensitive Poo) alternative to HSV from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt( 0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) {

      return 'light';
  } 
  else {

      return 'dark';
  }
}

module.exports = getRandomColor();