(function getData(){
  var baseUrl = 'https://freetes.github.io/Front-end-diary/'
  var xhr = new XMLHttpRequest()
  xhr.open('GET', baseUrl+'data.json', true)
  
  xhr.onreadystatechange = function(){
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
      let data = JSON.parse(xhr.responseText)
      let chs = data.chs
      const container = document.querySelector('div#container')
  
      // 按照日期排序
      chs.sort((a, b)=>new Date(b.date) - new Date(a.date))
      for(let item of chs){
        let div = document.createElement('div')
  
        div.innerHTML = `
          <a onclick="goto('${baseUrl}/${item.path}/', this)">${item.title}</a>
          <p>${item.description}</p>
          <p style="text-align: right">${item.date}</p>
        `
        container.appendChild(div)
      }
      document.querySelector('div#container div').setAttribute('class', 'selected')
      document.querySelector('div#container a').click()
    }
  }

  xhr.send()
})()

var iframe = document.querySelector('iframe')

function goto(url, node){
  // change style
  document.querySelector('div.selected').removeAttribute('class')
  node.parentNode.setAttribute('class', 'selected')
  
  iframe.setAttribute('src', url)
}
