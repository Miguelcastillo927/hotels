import { createHotelCard } from "./src/createhotelscard.js";
import { applyFilters } from "./src/filters.js";
import { consultarHoteles } from "./src/api.js";

const filterCountries = document.getElementById('filter-countries');
const filterStartDate = document.getElementById('fecha-inicio');
const filterEndDate = document.getElementById('fecha-final');
const filterPrices = document.getElementById('prices');
const filterSizes = document.getElementById('sizes');
const clearButton = document.getElementById('clear');
const hotelContainer = document.querySelector(".hotel-container") 

const hotelsdata = async () => {
    const response = await consultarHoteles();
    const data = await response.json();
    const filteredHotels = applyFilters(data);
    console.log(applyFilters(data))

    const messageContainer = document.querySelector(".no-hotels-message"); // Cambia el selector para obtener el elemento correcto
    const hotelContainer = document.querySelector(".hotel-container");

    if (filteredHotels.length === 0) {
        messageContainer.style.display = "block";
        hotelContainer.innerHTML = ""; // Limpiamos el contenido de las tarjetas
    } else {
        messageContainer.style.display = "none";
        hotelContainer.innerHTML = ""; // Limpiamos el contenido de las tarjetas
        filteredHotels.forEach((hotel) => {
            createHotelCard(hotel);
        });
    }
};

hotelsdata();

const clearFilters = async() => {
    filterCountries.value = 'All';
    filterStartDate.value = '';
    filterEndDate.value = '';
    filterPrices.value = 'All';
    filterSizes.value = 'All';
    await hotelsdata()
};

filterCountries.addEventListener('change', async () => await hotelsdata());
filterStartDate.addEventListener('change', async () => await hotelsdata());
filterEndDate.addEventListener('change', async () => await hotelsdata());
filterPrices.addEventListener('change', async () => await hotelsdata());
filterSizes.addEventListener('change', async () => await hotelsdata());
clearButton.addEventListener('click', clearFilters);


