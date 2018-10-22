
function showSelector(node){
  let year = new Date().getFullYear(),
      month = new Date().getMonth() + 1

  document.querySelector('#year').value = year,
  document.querySelector('#month').value = month

  changeSelector()
}

function changeSelector(){
  var selector = document.querySelector('div.date-picker-container')
  var year = document.querySelector('#year').value
  var month = document.querySelector('#month').value

  let daysArr = new Date(year + '-' + month).getMonthDays(),
      weekend = new Date(year + '-' + month + '-1').getDay(),
      i

  selector.style.display = 'flex'
  daysArr[0] -= weekend

  let div = document.querySelector('.date-picker-item')
  div.innerHTML = ''
  for(i=0; i<weekend; i++){
    let span = document.createElement('span')
    span.className = 'gray'
    span.innerHTML = `${++daysArr[0]}`
    div.appendChild(span)
  }

  for(i=1; i<=daysArr[1]; i++){
    let span = document.createElement('span')
    span.onclick = function(){
      const day = this.innerText,
            year = document.querySelector('input#year').value,
            month = document.querySelector('input#month').value;
      
      selector.style.display = 'none'      
      document.querySelector('input#date-picker-input').value = `${year}-${month}-${day}`
    }
    span.innerHTML = `${i}`
    div.appendChild(span)
  }

  let nextMonthDays = 7 - document.querySelectorAll('.date-picker-item > span').length%7
  nextMonthDays = nextMonthDays==7?0:nextMonthDays

  for(i=1; i<=nextMonthDays; i++){
    let span = document.createElement('span')
    span.className = 'gray'
    span.innerHTML = `${i}`
    div.appendChild(span)
  }
}

