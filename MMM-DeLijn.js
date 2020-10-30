
var val;

function getInfo() {
	var xmlhttp = new XMLHttpRequest();
		var url = "https://api.delijn.be/DLKernOpenData/v1/beta/haltes/0/$BUS_STOP/real-time";
			xmlhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						var myArr = JSON.parse(this.responseText);
						//console.log(myArr);
						val = myArr.halteDoorkomsten[0].doorkomsten;
					}
			};
			xmlhttp.open("GET", url, true);
			xmlhttp.setRequestHeader("Ocp-Apim-Subscription-Key", "$API_KEY");
			xmlhttp.send();
}

function makeTable(){
	let table = document.createElement('table');
	if(val != undefined){
		for(let i = 0; i < val.length; i++){
			let row = document.createElement('tr');
			let lijnnr = document.createElement('td');
			lijnnr.innerHTML = Number(val[i].lijnnummer)
			row.appendChild(lijnnr);
			let date = new Date(val[i]['real-timeTijdstip']);
			let now = new Date();
			console.log((date.getTime() - now.getTime())/(1000*60));
			let tijd = document.createElement('td');
			tijd.innerHTML = '' + date.getHours() + ':' + ("0" + date.getMinutes()).slice(-2);
			row.appendChild(tijd);
			let diff = document.createElement('td');
			diff.innerHTML = Math.round((date.getTime() - now.getTime())/(1000*60));
			row.appendChild(diff);

			table.appendChild(row);
		}

	}
	return table;
}

Module.register("MMM-DeLijn",{
	// Default module config.
	defaults: {
		text: "Loading..."
	},
	// Override dom generator.
	getDom: function() {
		var wrapper = makeTable(wrapper);
		wrapper.className = "table table-bordered table-dark";
		console.log(wrapper);
		return wrapper;
	},
	getStyles: function() {
		return ["MMM-DeLijn.css"];
	},
	start: function(){
		var self = this;
		this.ready = false;
		this.val = this.config.text;
		setInterval(function() {
			if(this.ready){
				getInfo();
				self.updateDom();
			}
		},10000);
	},

	notificationReceived: function(notification, payload, sender){
		if(notification == 'DOM_OBJECTS_CREATED'){
			self.ready = true;
		}
	}

});
