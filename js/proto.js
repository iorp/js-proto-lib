
  

//#region Prototypes 
// todo bringg to js proto 
Object.prototype.deepMerge = function (obj) {
    
  return Object.keys(obj).reduce((merged, key) =>
    ({
      ...merged,
      [key]:
        typeof obj[key] === 'object' && !Array.isArray(obj[key]) && this[key]
          ? this[key].deepMerge(obj[key])
          : obj[key],
    }),
    { ...this }
  );
};
/* 
 Example usage:
var obj1 = {
  a: 1,
  b: {
    c: 2,
  },
};

var obj2 = {
  b: {
    d: 3,
  },
  e: 4,
};

var mergedObject = obj1.deepMerge(obj2);
console.log(mergedObject);
*/


Array.prototype.insertAt =  function insertAt(ele,index){
    let arr=this;
     
      arr.splice(index,0,ele)
      return arr;
    };
  Array.prototype.moveElement =  function moveElement(from,to){
      let arr=this;
        var ele = arr[from];
        arr.splice(from,1);
        arr.splice(to,0,ele)
        return arr;
      };
    Array.prototype.unique =function unique(){ 
        let arr = this;
        return arr.filter(function(element,index,self){return index===self.indexOf(element)})
      };
      // NestedObjectIndexator START
      
      // Recursively  Sets address indexation system to a nested array of objects
      // transforms the target and also returns target
      
      
      Array.prototype.indexate =  function indexate(arg){
      
        let defaults ={
          target:'____I',
          offset :0
        }
      
        arg = Object.assign(defaults,(arg||{}));
      
       
      
       return  iterate(this); 
      
      
      
      
      
        function iterate(items,parent=arg.offset-1){  
         items.map((item,index) => {
      
          item[arg.target]={index:index+arg.offset,parent};
          item[arg.target].address = getAddress(item); 
          item[arg.target].key = item[arg.target].address.join('_');
          item[arg.target].level = item[arg.target].address.length-1;
          
          if(item.children){
            iterate(item.children,item)
          }
        });
        return items;
      }
       
      function getAddress(item){
      
        let arr =[];
        arr.unshift(item[arg.target].index);
        let currentParent = item[arg.target].parent;
        while(currentParent[arg.target]){
          arr.unshift(currentParent[arg.target].index);
          currentParent = currentParent[arg.target].parent;
       
        }
      
       return arr;
      
      }
       
      
      }
      // NestedObjectIndexator END
       
      
      // NestedObjectIterator START
       // fn(item,index){...}
      Array.prototype.iterate =  function iterate(fn){  
        let arr=[];
          doIterate(this,fn);
          return arr;
        
      
        function doIterate(items,fn){
            items.map((item,index) => {
            if(fn) fn(item,index) 
            arr.push(item)
             if(item.children){
              doIterate(item.children,fn)
             }
           });
          }
         
      
        } 
       
      // NestedObjectIterator END
       
      
  
      // Get set and delete keys by string addres in nested objects 
      
      
        // // console.log([a].get('c.d'))
        // // console.log([a].set('c.d',4))
        // // console.log([a].get('c.d'))
        // // console.log([a].delete('c.e'))
        // // console.log([a].delete('c.e'))
       
       
  
        Array.prototype.renameKeys = function(){ 
               
        /// Rename keys of an object 
      //  [ObjectArray].renameKeys([['id','value'],['name','html']])
          let replacements;
      
          this.result = JSON.parse(JSON.stringify(this))
      
          if(Array.isArray(arguments[0])){
            replacements = arguments[0];
            //key array
          }else if(arguments.length==2 && typeof arguments[0]==='string'&& typeof arguments[0]==='string'){
            //single key
            replacements =[ [arguments[0], arguments[1]]];
          }else{
            console.warn('Prototype.renameKeys arguments error')
            return null;
          }
          
      
          this.result.iterate((item,index)=>{
            
           let keys = Object.keys(item);
       
            replacements.forEach((replacement)=>{
              
              item[replacement[1]] =item[replacement[0]];
              delete item[replacement[0]]
      
              });
        
          });
          return this.result;
        }
      
      // nested object
      Array.prototype.delete = function(path,removeParentIfEmpty){
      
          /*
        Deletes key
      
      
         // ARGUMENTS
      
      
         0:string path  
      
       
        
         */
      
      
         if(this.length!=1) return null; 
         let root =this[0];
         if(!path ||path=="") console.error("No path provided")
         if(!root ||root=="") console.error("No object provided")
      
        let current = root;
        let parent=null;
         if(typeof path==='string')path=path.split('.');
        for(let i=0;i<path.length;i++){ 
         if(!current[path[i]])     return root; 
        if(i==path.length-1 ){ 
           delete  current[path[i]];
           if(removeParentIfEmpty && parent!=null) {delete parent[path[i-1]];} 
        }else{
             //SET NEXT NODE
         parent=current;
         current=current[path[i]]; 
        } 
        }
      
        // Delete operation returns modified root object 
        return root
      
      
      
      } 
          // nested object
      Array.prototype.set = function(path,value,merge){
      
      
            /*
      
         Force create object in depth  
         Set operation returns object
      
      
         // ARGUMENTS
      
         0:object root
         1:string path 
         2:[value any] optional
      
         let obj = {a:1,b:{c:2,d:{e:3}}}
      
         // GET OPERATION
         fkey(obj,"") // {a:1,b:{c:2,d:{e:3}}}
         fkey(obj,"a") // returns 1
         fkey(obj,"a.b") // returns {c:2,d:{e:3}}
         fkey(obj,"a.b.c") // returns 2 
         fkey(obj,"a.b.c.d") // returns {e:3}
         fkey(obj,"a.b.c.d.e") // returns 3
        
         */
         if(this.length!=1) return null;
         let root=this[0];
         if(!root) console.error("No object provided")
         if(!path) console.error("No path provided")
      
        if( path=="" )   {
         root=value; 
        }else{
      
      
        let current = root;
         if(typeof path==='string')path=path.split('.');
        for(let i=0;i<path.length;i++){ 
        if(!current[path[i]]) current[path[i]]={};  
         
       
        if(i==path.length-1){
        
          if(merge){Object.assign(current[path[i]],value)}else{ current[path[i]]=value;}
      
        }else{
             //SET NEXT NODE
         current=current[path[i]]; 
        } 
        }
      }
      
        // Set operation returns modified root object 
         return root
      
      
      
      }    
       // nested object
      Array.prototype.get = function(path){
        
      
         /* 
         // ARGUMENTS
      
         0:string path  
         */
         if(this.length!=1) return null;
         let root=this[0];
         
         if(!root) console.error("No object provided")
         if(!path) console.error("No path provided")
      
         if(( path=="")  ) return root; 
      
      
        let current = root;
         if(typeof path==='string')path=path.split('.');
        for(let i=0;i<path.length;i++){ 
        if(!current[path[i]]) return null;// current[path[i]]={};  
        current=current[path[i]]; 
        }
        // Get operation returns selected key 
          return current
      
      
      
      
      
      
      }
  
  
      Array.prototype.iterateObjectKeys = function(fn){
        // usage [{a:1,b:2,c:3}].iterateObjectKeys((key,value)=>{console.log(key,value);});
       let obj = this[0];
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            fn(key, obj[key]);
          }
        }
      }
  
  
      Array.prototype.filterObjectKeys = function(fn){
        //usage [{a:1,b:2,c:3}].filterObjectKeys((key,value)=>{ return key!='a';});
        let obj = this[0];
        let res = {};
        [obj].iterateObjectKeys((key,value)=>{
          if(fn(key,value)===true) {
            res[key]=value;
          };
        });
        console.log('res',res);
        return res;
       }
  
  
       Array.prototype.removeKeys = function(keys){
        //usage  [{a:1,b:2,c:3}].removeKeys(['a','b'])
        let obj = this[0];
        let res = {};
        Object.keys(obj).forEach(key => {
          if(!keys.includes(key)){
            res[key]=obj[key];
          }
        });
       
        return res;
       }
      String.prototype.repeat = function(times) {
        return (new Array(times + 1)).join(this);
     };
      
  
  
  
  
  
  
  
  
     Element.prototype.insertChildAtIndex = function(child, index) {
      if (!index) index = 0
      if (index >= this.children.length) {
        this.appendChild(child)
      } else {
        this.insertBefore(child, this.children[index])
      }
    }
    
    Element.prototype.nodeIndex = function() {
     
    return [].indexOf.call(this.parentElement.children, this);
    }
  
    
  
    jQuery.fn.extend({
      place: function(element) {
       
        this.children().not('script').remove();
        this.append(element);
  
      //  return this.each(function() {
       //   this.checked = true;
       // });
  
      } 
    });
  
  
    //#endregion Prototypes 
   
   
  //#region Fson 
   
  
  // HyperText Protocol Object Notation
  
  /* 
  Use as  
  let obj = FSON.parse("(a:1,b:2,c:[3,4],d:xxx,e:(a:1,b:2))");
  console.log(FSON.stringify(obj));
  */
  const FSON_OBJECT_O = "(";
  const FSON_OBJECT_C = ")";
  const FSON_ARRAY_O = "[";
  const FSON_ARRAY_C = "]";
  const FSON_ESCAPE_M = "~";
  const FSON_ELEMENT_SEPARATOR = ",";
  const FSON_KEY_SEPARATOR = ":";
  
  class FSON{
  
  static getType(value){
    value=value.trim(); 
  if(value.startsWith(FSON_OBJECT_O) && value.endsWith(FSON_OBJECT_C)){ 
  return 'object';
  }else if(value.startsWith(FSON_ARRAY_O) && value.endsWith(FSON_ARRAY_C)){ 
  return 'array';
  }else{	
  return 'string';
  }
  }
  
  
  static   parse(value,result=null){
  //console.log(2,value)
  
  try{
  if(!value)return null;
  let type = FSON.getType(value);
  
  let elements;
  switch(type){
  case 'array':
   value = value.substr(1,value.length-2)  
   result = result ? result : [];
    elements=getElements(value); for(let i =0;i<elements.length;i++){result.push(FSON.parse(elements[i]))	}
  break;
  case 'object':
   value = value.substr(1,value.length-2)  
   result = result ? result : {}; 
    elements=getElements(value);for(let i =0;i<elements.length;i++){let segments = getKeyValue(elements[i]);if(!segments){break;} result[segments.key]= FSON.parse(segments.value);}
  break;
  case 'string':  
   result= value.replace(new RegExp((FSON_ESCAPE_M=="\\")? "\\\\" : FSON_ESCAPE_M,"g"), '') //replace escape marks
  
  }
  }catch(e){
  console.log(e);
  console.log(value);
  }
  
  
  function getKeyValue(str){
  for(let i =0;i<str.length;i++){
  if(str[i]==FSON_KEY_SEPARATOR){
  
  let key=str.substr(0,i);
  let val=str.substr(i+1,str.length-key.length);
  return {
  key:key.trim(),
  value:  val.trim()
  }
  }
  }
  }
  
  function getElements(str){
  
  ///
  // GET SEPARATORS
  let bracket=0; // bracket level
  let square=0;  // square bracket level	
  
  let separators=[];
  
  for(let i=0;i<str.length;i++) { 
  
  // continue if escaped 
  if(i>0 && str[i-1]==='\\') continue;
  
  //if(str[i]==FSON_OBJECT_O && (i>0 && str[i-1]==='\\')) continue;
  
  
  if(str[i]==FSON_OBJECT_O) {bracket++;}
  else if(str[i]==FSON_OBJECT_C) {bracket--;}
  if(str[i]==FSON_ARRAY_O) {square++;}
  else if(str[i]==FSON_ARRAY_C) {square--;}
  else if(square==0 && bracket==0 && str[i]==FSON_ELEMENT_SEPARATOR){
  separators.push(i)
  }
  
  }
  
  if(bracket!=0) console.error("Unclosed brackets")
  if(square!=0) console.error("Unclosed squares")
  
  /// GET ELEMENTS
  let elements=[];
  let previous=0;
  for(let i =0;i<separators.length;i++){
  let length; 
  length=separators[i]-previous;
  if(length>0)elements.push(str.substr(previous,length));
  previous = separators[i]+1;
  }
  // the last 
  if( str.length-previous>0)elements.push(str.substr(previous,str.length-previous));
  
  return elements;
  
  
  
  
  } 
  
  return result;
  }
  
  static stringify(value){
  
  let  res=value;
  res= JSON.stringify(res).replace(new RegExp('"',"g"), '')
  
  
  // NO  res=res.replace("[null]","[]");
  res=res.replace(new RegExp('{',"g"),FSON_OBJECT_O)
  res=res.replace(new RegExp('}',"g"),FSON_OBJECT_C) 
  //res=res.replace(new RegExp('$',"g"),FSON_ESCAPE_M)
  res=res.replace(new RegExp(',',"g"),FSON_ELEMENT_SEPARATOR)
  res=res.replace(new RegExp('\\[',"g"),FSON_ARRAY_O)
  res=res.replace(new RegExp('\\]',"g"),FSON_ARRAY_C) 
  res=res.replace(new RegExp(':',"g"),FSON_KEY_SEPARATOR)
  return res;
  } 
  }
  
  //#endregion Fson 
  

  window.proto = true;