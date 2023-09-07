let Router = (function (){
	function Router(callback){
		callback(Router.prototype);
		}
	Router.prototype = {
		isExist: false,
		base: String(window.location.href).replace(window.location.origin, ""),
		route: function (routes, callback){
			let arr_base = this.base.match(/\/([\w|\-|\+|\%]*)/g);
			let arr_routes = routes.match(/\/([\:|\w|\-|\+|\%]*)/g);
			let base_route = "";
			let par = {};
			
			if(arr_base.length != arr_routes.length){
				
				return false;
				}
			
			for(let i=0; i<arr_routes.length;i++){
				let param = arr_base[i];
				if(String(arr_routes[i]).includes(":") && String(arr_base[i]) != "/"){
					param = arr_routes[i];
					par[String(arr_routes[i]).replace(/\/\:/g, "")] = decodeURIComponent(String(arr_base[i]).replace(/\//g, ""));
					}
					base_route = base_route+param;
				}
			if(base_route == routes){
				callback(par);
				this.isExist = true;
				}
			},
		notFound: function (callback){
			if(!this.isExist){
				callback();
				}
			}
		}
	return Router;
	})();

