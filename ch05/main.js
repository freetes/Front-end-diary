
function importFile(e) {
  var files = e.target.files, f = files[0]
  var rABS = true // 后期配置属性

  var reader = new FileReader()

  reader.onload = function(e) {
    var data = e.target.result


    if(!rABS) data = new Uint8Array(data)
    var workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'})

    var parsedData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])

    xlsxToTable(parsedData)

  }
  if(rABS) reader.readAsBinaryString(f) 
  else reader.readAsArrayBuffer(f)
}

function xlsxToTable(jsonData){
  var tableHead = [], tableHeadHtml = '', tableBodyHtml = ''

  if(!jsonData || jsonData.length == 0){
    return 
  }

  Object.keys(jsonData[0]).forEach(key=>{
    tableHead.push(key)
  });

  // 生成thead
  for(let item of tableHead){
    tableHeadHtml += `
      <th>${item}<th>
    `
  }

  // 生成tbody
  for(let item of jsonData){
    var string = ''
    for(let theadNode of tableHead){
      string += `
        <td contenteditable="true">
          ${item[theadNode] || ''}
        <td>
      `
    }
    tableBodyHtml += `
      <tr>
        ${string}
      </tr>
    `
  }

  document.querySelector('table').innerHTML = `
    <thead>
      <tr>
        ${tableHeadHtml}
      </tr>
    </thead>
    <tbody>
      ${tableBodyHtml}
    </tbody>
  `

  // 后期扩展使用
  // var tableElement = document.createElement('table')

  // tableElement.innerHTML = `
  //   <thead>
  //     <tr>
  //       ${tableHeadHtml}
  //     </tr>
  //   </thead>
  //   <tbody>
  //     ${tableBodyHtml}
  //   </tbody>
  // `

  // document.querySelector('body').appendChild(tableElement)
}

function exportFile() {
  var table = document.querySelector("table")

  if(!table.innerHTML || table.innerHTML == ''){
    return alert('请先导入数据！')
  }

  var sheet = XLSX.utils.table_to_sheet(table)
  openDownloadDialog(sheet2blob(sheet), 'data.xlsx')
}

// 将 sheet 转换成 blob 类型，再进行下载
function sheet2blob(sheet, sheetName) {
  sheetName = sheetName || 'sheet1'
  var workbook = {
      SheetNames: [sheetName],
      Sheets: {}
  }
  workbook.Sheets[sheetName] = sheet // 生成excel的配置项

  var wopts = {
      bookType: 'xlsx', // 要生成的文件类型
      bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      type: 'binary'
  }
  var wbout = XLSX.write(workbook, wopts)
  var blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream"
  }) // 字符串转ArrayBuffer
  function s2ab(s) {
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0 ;i != s.length; i++) view[i] = s.charCodeAt(i) & 0xFF
      return buf
  }
  return blob
}

function openDownloadDialog(url, saveName) {
  if (typeof url == 'object' && url instanceof Blob) {
      url = URL.createObjectURL(url); // 创建blob地址
  }
  var aLink = document.createElement('a');
  aLink.href = url;
  aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
  var event;
  if (window.MouseEvent) event = new MouseEvent('click');
  else {
      event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  }
  aLink.dispatchEvent(event);
}

document.querySelector('input').addEventListener('change', importFile)
