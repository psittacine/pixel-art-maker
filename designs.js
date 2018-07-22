$(document).ready(function() {

  // Select color input
  const colorPicker = $('#colorPicker');

  // Select size input
  const sizePicker = $('#sizePicker');  // form element for h&w inputs
  const inputHeight = $('#inputHeight'); // height input element
  const inputWidth = $('#inputWidth'); // width input element

  // Select canvas table element
  const pixelCanvas = $('#pixelCanvas');

  // Status of mouse click, is down
  let mouseIsDown = false;

  // Save art to image file button
  const saveArt = $('#saveArt');

  // When size is submitted by the user, call makeGrid()
  sizePicker.submit(function(e) {
    e.preventDefault();
    let heightVal = inputHeight.val();
    let widthVal = inputWidth.val();
    makeGrid(heightVal, widthVal);
  });

  // Make the grid canvas
  function makeGrid(height, width) {
    // Remove existing grid
    pixelCanvas.empty();
    // Add new grid
    //   height number of rows
    for (let row = 0; row < height; row++) {
      let tableRow = $('<tr></tr>');
      //   width number of cols
      for (let col = 0; col < width; col++) {
        let tableCell = $('<td></td>');
        // Add td to tr
        tableRow.append(tableCell);
      }
      // Add tr to table
      pixelCanvas.append(tableRow);
    }
  }  // end makeGrid function

  // Add color to cell when clicked
  pixelCanvas.on('click', 'td', function() {
    let colorVal = colorPicker.val();
    $(this).css('background-color', colorVal);
  });

  // Remove color from cell when double-clicked
  pixelCanvas.on('dblclick', 'td', function() {
    $(this).css('background-color', '');
  });

  // Status of mouse click - is down or up
  pixelCanvas.mousedown(function() {
    mouseIsDown = true;
  });
  pixelCanvas.mouseup(function() {
    mouseIsDown = false;
  });

  // Add color to cells continuously (paint) while mouse is clicked and dragged.
  pixelCanvas.on('mousemove', 'td', function(e) {
    e.preventDefault();
    let colorVal = colorPicker.val();
    if (mouseIsDown) {
      $(this).css('background-color', colorVal);
    }
  });

  // Save art to image file
  saveArt.click(function() {
    html2canvas(pixelCanvas, {
      onrendered: function(canvas) {
        const a = document.createElement('a');
        a.href = canvas.toDataURL();
        a.download = 'pixelart.png';
        a.click();
      }
    });
  });

});  // end document ready function
