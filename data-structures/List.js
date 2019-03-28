function List(){
  this.listSize = 0;
  this.position = 0;
  this.dataStore = [];

  this.clear = function(){
    this.dataStore = [];
    this.listSize = 0;
    this.position = 0;
  }

  this.append = function(element){
    this.dataStore[this.listSize] = element;
    this.listSize++;
  }

  this.find = function(element){
    for(let i=0; i < this.dataStore.length; i++){
      if(this.dataStore[i] == element){
        return i;
      }
    }

    return -1;
  }

  this.remove = function(element){
    let foundAt = this.find(element);

    if(foundAt > -1){
      this.dataStore.splice(foundAt, 1);
      this.listSize--;

      return true;
    }
    return false;
  }

  this.length = function(){
    return this.listSize;
  }

  this.insert = function(element, after){

  }

  this.front = function(){
    this.position = 0;
  }
  this.end = function(){
    this.position = this.listSize-1;
  }
  this.prev = function(){
    if(this.position > 0){
      this.position--;
    }
  }
  this.next = function(){
    if(this.position < this.listSize-1){
      this.position++;
    }
  }
  this.currPos = function(){
    return this.position;
  }
  this.moveTo = function(position){
    this.position = position;
  }
  this.getElement = function(){
    return this.dataStore[this.position];
  }
}

var testList = new List();
console.log(testList)