const express = require("express");
const TwitterApi = require("twitter-api-v2").default;
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const client = new TwitterApi({
  appKey: process.env.CONSUMER_KEY,
  appSecret: process.env.CONSUMER_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

let countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "AntiguaAndBarbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "BosniaAndHerzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "BurkinaFaso",
  "Burundi",
  "CaboVerde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "CentralAfricanRepublic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "CostaRica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "CzechRepublic",
  "DemocraticRepublicOfTheCongo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "DominicanRepublic",
  "Ecuador",
  "Egypt",
  "ElSalvador",
  "EquatorialGuinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "HolySee",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "MarshallIslands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "NewZealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "NorthKorea",
  "NorthMacedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "PapuaNewGuinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "SaintKittsAndNevis",
  "SaintLucia",
  "SaintVincentAndTheGrenadines",
  "Samoa",
  "SanMarino",
  "SaoTomeAndPrincipe",
  "SaudiArabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "SierraLeone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "SolomonIslands",
  "Somalia",
  "SouthAfrica",
  "SouthKorea",
  "SouthSudan",
  "Spain",
  "SriLanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "TrinidadAndTobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "UnitedArabEmirates",
  "UnitedKingdom",
  "UnitedStates",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

let tweetedCountries = [];

function createTweet() {
  if (countries.length === 0) {
    countries = tweetedCountries;
    tweetedCountries = [];
  }

  const index = Math.floor(Math.random() * countries.length);
  const country = countries[index];
  countries.splice(index, 1);
  tweetedCountries.push(country);
  return `Fuck #${country}.`;
}

async function main() {
  await client.v2.tweet({
    text: createTweet(),
  });
}

async function scheduleTweets() {
  const now = new Date();
  const minutes = now.getMinutes();

  if (minutes === 0 || minutes === 30) {
    await main();
  }
}

app.get("/", (req, res) => {
  res.send("Ok");
});

app.listen(process.env.PORT, () => {
  setInterval(async () => {
    await scheduleTweets();
  }, 60000);
});
