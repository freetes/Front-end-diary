function Queue(){
  this.dataStore = [];

  this.enqueue = function(element){
    this.dataStore.push(element);
  }
  this.dequeue = function(){
    this.dataStore.shift();
  }
  this.front = function(){
    return this.dataStore[0];
  }
  this.end = function(){
    return this.dataStore[this.dataStore.length-1];
  }
  this.empty = function(){
    return this.dataStore.length == 0;
  }
}