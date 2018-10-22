
// return daysNumber(int)
Date.prototype.getDaysNumber = function (){
  const bigDaysArr = [1, 3, 5, 7, 8, 10, 12],
        smallDaysArr = [4, 6, 9, 11],
        year = this.getFullYear(),
        month = this.getMonth() + 1
  
  if(bigDaysArr.indexOf(month) >= 0){
    return 31
  }
  else if(smallDaysArr.indexOf(month) >= 0){
    return 30
  }
  // 判断闰年
  else if((year%4 == 0 && year%100 != 0)||year%400 == 0){
    return 29
  }
  else return 28
}

Date.prototype.getMonthDays = function (){
  const year = this.getFullYear(),
        month = this.getMonth() + 1,
        thisMonthDays = this.getDaysNumber()
        
  let lastMonthDays = (new Date(year + '-' + (month-1))).getDaysNumber(),
      nextMonthDays = (new Date(year + '-' + (month+1))).getDaysNumber()
  
  if(month == 1){
    lastMonthDays = (new Date(year-1 + '-12')).getDaysNumber()
  }
  else if(month == 12){
    nextMonthDays = (new Date(year+1 + '-1')).getDaysNumber()
  }

  return [lastMonthDays, thisMonthDays, nextMonthDays]
}