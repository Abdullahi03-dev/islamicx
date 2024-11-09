let date=new Date()
const day=date.getDate().toString().padStart(2,'0');
const month=(date.getMonth()+1).toString().padStart(2,'0');
const year=date.getFullYear().toString().slice(2);
const formattedDate=`${day}-${month}-${year}`
console.log(formattedDate)
const cityInput = document.getElementById('form');
const searchBtn = document.getElementById('submitbtn');
const weatherData = document.getElementById('weather-data');
const prayerName=document.querySelector('.p_name');
const azanName=document.querySelector('.A_time');

const apiUrl = `https://api.aladhan.com/v1/timingsByCity/${formattedDate}`

searchBtn.addEventListener('click', getSalahData);

function azanTime(time){
    const [hours,minutes]=time.split(":").map(Number);
    const newMinutes=minutes-10;
    const newHours=hours+Math.floor(newMinutes/60);
    const finalMinutes=Math.abs(newMinutes)%60;
    const finalHours=newHours%24;

    const result=`${String(finalHours).padStart(2,'0')}:${String(finalMinutes).padStart(2,'0')}`;

    return result;
}

function getSalahData() {
    const city = cityInput.value.trim();
    if (city) {
        const url =`${apiUrl}?city=${city}&country=Nigeria`;;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const prayerTimes = `
            <li>${data.data.timings.Fajr}</li>
            <li>${data.data.timings.Dhuhr}</li>
            <li>${data.data.timings.Asr}</li>
            <li>${data.data.timings.Maghrib}</li>
            <li>${data.data.timings.Isha}</li>
        `;


        const Azantimes = `
            <li>${azanTime(data.data.timings.Fajr)}</li>
            <li>${azanTime(data.data.timings.Dhuhr)}</li>
            <li>${azanTime(data.data.timings.Asr)}</li>
            <li>${azanTime(data.data.timings.Maghrib)}</li>
            <li>${azanTime(data.data.timings.Isha)}</li>
        `;


                prayerName.innerHTML = prayerTimes;
                azanName.innerHTML = Azantimes;

            })
            .catch(error => console.error(error));
    } else {
        alert('Please enter a city name');
    }
}