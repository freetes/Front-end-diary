
/*
  1   to  一
  11  to  十一
  21  to  二十一
  111 to  一百一十一
*/

var chineseNumber = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']

var count = ['', '十', '百', '千']

function showNumber(val) {
  document.querySelector('#result').innerText = getNumber(val)
}

function getNumber(val) {
  // 反转
  val = `${val}`.split('').reverse().join('')

  // 分组
  var numberArr = (val.split(/(\d{4})/).deleteEmpty()).map(val=>val.split(''))

  var finalArr = (numberArr.map(arr=>
    arr.map((val, index)=>
      chineseNumber[val] + (val==0?'':count[index])
    ).reverse()
  )).reverse()

  // 查重、去零
  

  // 连接
  if(finalArr.length == 1){
    return finalArr[0].join('')
  }
  else if(finalArr.length == 2){
    return (finalArr.join('万')).split(',').join('')
  }
  else{
    return finalArr[0].join('') + '亿' + finalArr[1].join('') + '万' + finalArr[2].join('')
  }
}


Array.prototype.deleteEmpty = function(){
  var arr = []

  this.map(function(val){
    if(val !== '' && val != undefined)
      arr.push(val)
  })

  return arr
}
