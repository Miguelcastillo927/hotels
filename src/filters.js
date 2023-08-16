const filterCountries = document.getElementById('filter-countries');
const filterStartDate = document.getElementById('fecha-inicio');
const filterEndDate = document.getElementById('fecha-final');
const filterPrices = document.getElementById('prices');
const filterSizes = document.getElementById('sizes');


function calcularDiasEntreFechas(startDate, endDate) {

    const inicio = new Date(startDate);
    const fin = new Date(endDate);

    return Math.abs(fin - inicio);
}

export const applyFilters = (hotels) => {
    const selectedCountry = filterCountries.value;
    const selectedPrice = filterPrices.value;

    const startDate = new Date(filterStartDate.value).getTime();
    const endDate = new Date(filterEndDate.value).getTime();
    const selectedSize = filterSizes.value;

    const diferenciaTiempo = calcularDiasEntreFechas(startDate, endDate);

    const filteredHotels = hotels.filter((hotel) => {
        const passesCountryFilter = selectedCountry === 'All' || hotel.country === selectedCountry;
        const passesDataFilter = (filterStartDate.value == "" || filterEndDate.value == "") || (diferenciaTiempo >= hotel.availabilityFrom && diferenciaTiempo <= hotel.availabilityTo);
        const passesPriceFilter = selectedPrice === 'All' || hotel.price === parseInt(selectedPrice);

        

        return passesCountryFilter && passesPriceFilter && passesDataFilter

    });

    const message = filteredHotels.length === 0 ? "No hay hoteles para mostrar" : "";
    console.log(message);
    return filteredHotels;

};
