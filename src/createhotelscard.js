export const createHotelCard = (hotel) => {
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
    paisNombre.className = "paisnombre"

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
