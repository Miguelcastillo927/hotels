
import { consultarHoteles } from "./src/api.js";



const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clearFilters);

const createHotelCard = (hotel) => {
    const cardHotel = document.createElement("div");
    cardHotel.className = "card";

    const hotelContainer = document.querySelector(".hotel-container");
    hotelContainer.appendChild(cardHotel);

    cardHotel.style.backgroundImage = `url('${hotel.photo}')`;

    const contentContainer = document.createElement("div");
    contentContainer.className = "content-container";

    const nombreHotel = document.createElement("h2");
    nombreHotel.innerText = hotel.name;
    nombreHotel.className = "hotel-name";
    contentContainer.appendChild(nombreHotel);

    const hotelInfo = document.createElement("section");
    hotelInfo.className = "hotelcard-info";

    const banderaDiv = document.createElement("div");
    banderaDiv.className = "bandera";

    const banderaImg = document.createElement("img");
    const banderaImgSrc = `./assets/${hotel.country.toLowerCase()}.png`;
    banderaImg.src = banderaImgSrc;
    banderaImg.alt = "Bandera";
    banderaDiv.appendChild(banderaImg);

    const paisNombre = document.createElement("p");
    paisNombre.innerText = hotel.country;
    banderaDiv.appendChild(paisNombre);

    hotelInfo.appendChild(banderaDiv);
    contentContainer.appendChild(hotelInfo);
    cardHotel.appendChild(contentContainer);
    hotelContainer.appendChild(cardHotel);

    

    const hotelNumbers = document.createElement("div");
    hotelNumbers.className = "hotelcard-numbers";


    contentContainer.appendChild(hotelNumbers);


    const numberrooms = document.createElement("p");
    numberrooms.innerText = hotel.rooms + " Rooms";
    hotelNumbers.appendChild(numberrooms)
    numberrooms.className = "rooms"

    const priceSymbols = {
        1: "$",
        2: "$$",
        3: "$$$",
        4: "$$$$",
    };


    const precio = document.createElement("p");
    const priceSymbol = priceSymbols[hotel.price] || "";
    precio.innerText = priceSymbol;
    hotelNumbers.appendChild(precio);
    precio.className = "precio"

    const bookButton = document.createElement("button");
    bookButton.innerText = "Book it!";
    bookButton.className = "book-button";

    contentContainer.appendChild(bookButton);
};

const filterCountries = document.getElementById('filter-countries');
const filterStartDate = document.getElementById('fecha-inicio');
const filterEndDate = document.getElementById('fecha-final');
const filterPrices = document.getElementById('prices');
const filterSizes = document.getElementById('sizes');


filterCountries.addEventListener('change', applyFilters);
filterStartDate.addEventListener('change', applyFilters);
filterEndDate.addEventListener('change', applyFilters);
filterPrices.addEventListener('change', applyFilters);
filterSizes.addEventListener('change', applyFilters);
clearButton.addEventListener('click', clearFilters);

function applyFilters() {
  const selectedCountry = filterCountries.value;
  const startDate = filterStartDate.value;
  const endDate = filterEndDate.value;
  const selectedPrice = filterPrices.value;
  

  const filteredHotels = hotels.filter((hotel) => {
    const passesCountryFilter = selectedCountry === 'All' || hotel.country === selectedCountry;
    const passesStartDateFilter = !startDate || hotel.startDate >= startDate;
    const passesEndDateFilter = !endDate || hotel.endDate <= endDate;
    const passesPriceFilter = selectedPrice === 'all' || hotel.price === parseInt(selectedPrice);
    const passesSizeFilter = selectedSize === 'All' || hotel.size === selectedSize;

    return passesCountryFilter && passesStartDateFilter && passesEndDateFilter && passesPriceFilter && passesSizeFilter;
  });

  const hotelContainer = document.querySelector('.hotel-container');
  hotelContainer.innerHTML = '';

  filteredHotels.forEach((hotel) => {
    createHotelCard(hotel);
  });

  if (filteredHotels.length === 0) {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.innerText = 'No se encontraron hoteles que coincidan con los filtros seleccionados.';
    hotelContainer.appendChild(noResultsMessage);
  }
  
if (filteredHotels.length === 0) {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.innerText = 'No se encontraron hoteles que coincidan con los filtros seleccionados.';
    hotelContainer.appendChild(noResultsMessage);
  } else {
    
    const existingNoResultsMessage = document.querySelector('.no-results-message');
    if (existingNoResultsMessage) {
      existingNoResultsMessage.remove();
    }
  }
  
}


function clearFilters() {
  filterCountries.value = 'All';
  filterStartDate.value = '';
  filterEndDate.value = '';
  filterPrices.value = 'all';
  filterSizes.value = 'All';
  applyFilters(); 
}

const hotelsdata = async () => {
    const response = await consultarHoteles();
    const data = await response.json();
    console.log(data); 

    data.forEach((hotel) => {
        createHotelCard(hotel);
    });
};

hotelsdata();

