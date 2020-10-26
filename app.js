fetch("https://coronavirus-19-api.herokuapp.com/countries", {
	"method": "GET",
})

.then(response => response.json())

.then(data => {
	class ui{
		static display(i){
			let id = document.getElementById('country');
			if( i !== 0){
				id.innerHTML = data[i].country;
			}
			else{
				id.innerHTML = "Global Status";
			}
			let totalCases = document.getElementById('totalCases');
			totalCases.innerHTML = data[i].cases;
			let totalRecoveries = document.getElementById('totalRecoveries');
			totalRecoveries.innerHTML = data[i].recovered;
			let totalDeaths = document.getElementById('totalDeaths');
			totalDeaths.innerHTML = data[i].deaths;
			let casesToday = document.getElementById('casesToday');
			casesToday.innerHTML = data[i].todayCases;
			let deathsToday = document.getElementById('deathsToday');
			deathsToday.innerHTML = data[i].todayDeaths;
			let activeCases = document.getElementById('activeCases');
			activeCases.innerHTML = data[i].active;
		}
		static search(searchItem){
			let matches = data.filter( data => {
				const regex = new RegExp(`${searchItem}`, 'gi');
				return data.country.match(regex);
			});
			if (searchItem.length === 0){
				matches = [];
			}
		
			const html = matches.map(
				x => `<option value = "${x.country}"> country Name</option>`
			).join('');
			return html;
		}
	}
	ui.display(0);
	var form = document.getElementById('countrySearch');
	form.addEventListener('input', (e) => {
		e.preventDefault();
		let searchTxt = document.getElementById('searchTxt').value;
		let html = ui.search(searchTxt);
		var datalist = document.querySelector('#datalist');
    	datalist.innerHTML = html;
	});
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		let searchTxt = document.getElementById('searchTxt').value;
		let countryName = searchTxt;
		for( let j=0; j<data.length; j++){
			if ( data[j].country === countryName ) {
				ui.display(j);			
			}
		}
		form.reset();
	})

})
.catch(err => {
	console.error(err);
});