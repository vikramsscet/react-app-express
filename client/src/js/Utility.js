const Util = {
    XMLHttpRequestApi : function(method, url, callback, context=this, data={}){
        return new Promise((resolve, reject)=>{
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.onload = function () {
                if(this.status === 200){
                    console.log(url);
                    resolve(callback.call(context,this.responseText));
                }
            };
            xhr.onerror = function(err) {
                console.log("Booo");
                reject(err);
            };
            xhr.send(JSON.stringify(data));
        });
    }
}
export default Util;