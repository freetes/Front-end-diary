(function getData(){
  var xhr = new XMLHttpRequest()
  xhr.open('GET', './data.json', true)
  
  xhr.onreadystatechange = function(){
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
      let data = JSON.parse(xhr.responseText)
      let chs = data.chs
      const container = document.querySelector('div#container')
  
      for(let item of chs){
        let div = document.createElement('div')
  
        div.innerHTML = `
          <a onclick="goto('/Front-end-diary/${item.path}/')">${item.title}</a>
          <p>${item.description}</p>
          <p style="text-align: right">${item.date}</p>
        `
        container.appendChild(div)
      }
      document.querySelector('div#container a').click()
    }
  }

  xhr.send()
})()

var iframe = document.querySelector('iframe')

function goto(url){
  iframe.setAttribute('src', url)
}
