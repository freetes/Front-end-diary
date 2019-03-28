function Stack(){
  this.dataStore = [];
  this.top = 0;
  
  this.push = function(element){
    this.dataStore[this.top] = element;
    this.top++;
  }

  this.pop = function(){
    this.top--;
    return this.dataStore[this.top];
  }

  this.peek = function(){
    return this.dataStore[this.top-1];
  }

  this.length = function(){
    return this.top;
  }

  this.clear = function(){
    this.top = 0;
  }
}