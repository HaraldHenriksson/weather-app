/**
 * 🌧️.
 *
 */

const forecastEl = document.querySelector('#forecast');
const spinnerEl = document.querySelector('#spinner');

 const renderAlert = (msg, severity = 'info') => {
	forecastEl.innerHTML =
		`<div class="alert alert-${severity}">${msg}</div>`;
}

const renderNotice = msg => renderAlert(msg, 'info');
const renderWarning = msg => renderAlert(msg, 'warning');
const renderError = msg => renderAlert(msg, 'danger');

const renderCurrentWeather = data => {
    console.log("eeather:", data.weather)

    const conditions = data.weather.map(conditions => 
        `<li>
        <img src="http://openweathermap.org/img/wn/${conditions.icon}@2x.png" alt="" title="${conditions.discription}">
    </li>`);

    const now = Math.round(Date.now() / 1000)
    let banner = (now > data.sys.sunrise && now < data.sys.sunset)
        ? 'assets/images/day.svg'
        : 'assets/images/night.svg';


        const freshness = new Date( data.dt * 1000)

	document.querySelector('#forecast').innerHTML = `
		<div class="card">
			<img src="${banner}" class="card-img-top">
			<div class="card-body">
				<h5 class="card-title" id="location">
					<span id="city">${data.name}</span>,
					<span id="country">${data.sys.country}</span>
				</h5>
				<p class="temp">
					<span id="temperature">${data.main.temp}</span>
					&deg;C
				</p>
				<p class="humidity">
					<span id="humidity">${data.main.humidity}</span>
					&percnt; humidity
				</p>
				<p class="wind">
					<span id="windspeed">${data.wind.speed}</span>
					m/s
				</p>

                <ul class="conditions">
                    ${conditions.join('')}
			</ul>

            <p class="test-muted small">${freshness.toLocaleString()}</p>
			</div>
		</div>
	`;
}

document.querySelector('#search-form').addEventListener('submit', async e => {
	e.preventDefault();

	const city = e.target.query.value.trim();

	if (city.length < 3) {
		renderNotice("Please enter at least 3 chars");
		return;
	}

    forecastEl.classList.add('hide');
    spinnerEl.classList.remove('hide');


	// do search
	console.log(`Searching for city "${city}"`);
	try {
		const data = await getCurrentWeather(city);

		// render current weather conditions
		renderCurrentWeather(data);
	} catch (e) {
		renderWarning("That does not look like a city.");
	}

    spinnerEl.classList.add('hide');
    forecastEl.classList.remove('hide');

});
