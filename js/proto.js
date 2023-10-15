 //#region Prototypes 


Object.prototype.merge = function (obj) {
     /*  Object merge
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
    return Object.keys(obj).reduce((merged, key) =>
      ({
        ...merged,
        [key]:
          typeof obj[key] === 'object' && !Array.isArray(obj[key]) && this[key]
            ? this[key].merge(obj[key])
            : obj[key],
      }),
      { ...this }
    );
  };

 

function loadResources(resources, callback) {  
     // Example usage with an array of resources
//   const resourceArray = [
//     'your-css-file.css',
//     'your-js-file.js',
//     'your-other-css-file.cssString { background-color: yellow; }'
//   ];
  
//   loadResources(resourceArray, () => {
//     // Your callback code here
//   });
  
    if (!Array.isArray(resources) || resources.length === 0) {
      return;
    }
  
    const loadResource = (resource, index) => {
      if (resource.endsWith('.css')) {
        if (!document.querySelector(`link[href="${resource}"]`)) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.type = 'text/css';
          link.href = resource;
          document.head.appendChild(link);
        }
      } else if (resource.endsWith('.js')) {
        if (!document.querySelector(`script[src="${resource}"]`)) {
          const script = document.createElement('script');
          script.src = resource;
          if (index === resources.length - 1 && callback) {
            script.onload = callback;
          }
          document.head.appendChild(script);
        }
      } else if (resource.endsWith('.cssString')) {
        const styleTag = document.querySelector(`style[data-custom-style="${resource}"]`);
        if (!styleTag) {
          const style = document.createElement('style');
          style.setAttribute('data-custom-style', resource);
          style.textContent = resource;
          document.head.appendChild(style);
        }
      }
  
      if (index < resources.length - 1) {
        loadResource(resources[index + 1], index + 1);
      }
    };
  
    loadResource(resources[0], 0);
  }
  




