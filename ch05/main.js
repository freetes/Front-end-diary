
var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
var fileInput = document.querySelector('input')

console.log(fileInput)

function handleDrop(e) {
  console.log(e)
  var files = e.target.files, f = files[0];

  console.log(f)
  var reader = new FileReader();
  reader.onload = function(e) {
    var data = e.target.result;
    if(!rABS) data = new Uint8Array(data);
    var workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});

    console.log(workbook)

    /* DO SOMETHING WITH workbook HERE */
  };
  if(rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
}

fileInput.addEventListener('change', handleDrop, false);
