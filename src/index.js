"use strict";
// https://restcountries.com/v3.1/name/${country}
// https://geocode.xyz/${lat},${lng}?geoit=json&auth=884174359364682846726x36503
const flag = document.querySelector(".flags");
const details = document.querySelector(".details");
const input = document.querySelector("input");
const form = document.querySelector("form");
const getit = async (country) => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);

    const [data] = await res.json();

    const flags = data.flags.png;
    flag.src = `${flags}`;
    const lang = data.languages;
    const llh = Object.values(lang);
    const html = `
     <p><span>Country:  </span>${data.name.common}</p>
            <p><span>Population:  </span>${data.population}</p>
            <p><span>Language:  </span>${llh[0]}</p>
            <p><span>Capital:  </span>${data.capital[0]}</p>
            <p><span>Continet:  </span>${data.continents[0]}</p>
    `;
    details.innerHTML = html;
  } catch (error) {
    alert(error.message);
  }
};

const getloc = () => {
  navigator.geolocation.getCurrentPosition(async (e) => {
    const { latitude: lat, longitude: lng } = e.coords;
    const res = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=884174359364682846726x36503`
    );
    const data = await res.json();
    getit(data.country);
  });
};
getloc();
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getit(input.value);
});
