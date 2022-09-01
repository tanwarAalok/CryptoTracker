const form = document.querySelector("#searchForm");
const result = document.querySelector("#tableResult");
const priceData = document.querySelector("#price");

var update, priceColor;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  if(update){
      clearTimeout(update);
  }
    
  const ctype = form.elements.coinType.value;

  fetchPrice(ctype);
});

const fetchPrice = async (ctype) => {
  const wordSplit = ctype.split("-");
  const type1 = wordSplit[0],
    type2 = wordSplit[1];

  const response = await axios.get(
    `https://api.coinstats.app/public/v1/coins/${type1}?currency=${type2}`
  );


  const {
    price,
    volume,
    marketCap,
    priceChange1d,
    priceChange1h,
    priceChange1w,
    availableSupply,
    totalSupply,
    symbol,
  } = response.data.coin;
  

  if (priceChange1d > 0) {
    priceColor = "green";
  }
  else priceColor = "red";


  result.innerHTML = `
        <tr class="bg-primary">
            <td>Property</td>
            <td>Value</td>
        </tr>
        <tr>
            <td>${symbol}</td>
            <td style="color: ${priceColor} ;border-bottom: white">${price} ${type2}</td>
        </tr>
        <tr>
            <td>Volume</td>
            <td>${volume}</td>
        </tr>
        <tr>
            <td>Market Cap</td>
            <td>${marketCap}</td>
        </tr>
        <tr>
            <td>Hour-Change</td>
            <td>${priceChange1h}</td>
        </tr>
        <tr>
            <td>Day-Change</td>
            <td>${priceChange1d}</td>
        </tr>
        <tr>
            <td>Week-Change</td>
            <td>${priceChange1w}</td>
        </tr>
    `;

    update = setTimeout(() => fetchPrice(ctype), 1000 * 60 * 60);
};
