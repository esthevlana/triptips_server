const mongoose = require("mongoose");
const Continent = require("../models/Continent.model")

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/triptips_server";

const continent = [
    {
        continent: "America",
        countries: [
            "Canada", "Mexico", "United States of America", "Navassa Island", "Puerto Rico", "US Virgin Islands", "Dominican Republic",
            "Cuba", "Greenland", "Haiti", "Belize", "Costa Rica", "El Salvador", "Guatemala", "Honduras", "Guadeloupe", "Martinique", 
            "Nicaragua", "Panama", "Jamaica", "Bahamas", "Barbados", "Dominica", "Brazil", "Argentina", "Bolivia", "Chile", "Colombia",
            "Ecuador", "Falkland Islands", "French Guiana", "Guyana", "Paraguay", "Peru", "South Georgia", "Suriname", "Trinidad and Tobago", 
            "Uruguay", "Venezuela"
        ]
    },
    {
        continent: "Africa",
        countries: [
            "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cameroon", "Cape Verde", "Central African Republic",
            "Chad", "Comoros", "Republic of the Congo", "Democratic Republic of the Congo", "Ivory Coast", "Djibouti", "Equatorial Guinea",
            "Egypt", "Eritrea", "Ethiopia", "Gabon", "The Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Lesotho", "Liberia", 
            "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", 
            "Réunion", "Rwanda", "São Tomé and Príncipe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa", "South Sudan", 
            "Sudan", "Swaziland", "Tanzania", "Togo", "Tunisia", "Uganda", "Western Sahara", "Zambia", "Zimbabwe"
        ]
    },
    {
        continent: "Asia",
        countries: [
            "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhuta", "Brunei", "Cambodia", "China", "East Timor", "Georgia",
            "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", 
            "Malaysia", "The Maldives", "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", "Palestine", "The Philippines",
            "Qatar", "Russia", "Saudi Arabia", "Singapore", "South Korea", "Sri Lanka", "Syria", "Taiwan", "Tajikistan", "Thailand",
            "Turkey", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"
        ]
    },
    {
        continent: "Europe",
        countries: [
            "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", 
            "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland", 
            "Republic of Ireland", "Italy", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "North Macedonia", "Malta",
            "Moldova", "Monaco", "Montenegro", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "San Marino", "Serbia", "Slovakia",
            "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "Vatican City"
        ]
    },
    {
        continent: "Oceania",
        countries: [
            "Australia", "Fiji", "New Zealand", "Federated States of Micronesia", "Kiribati", "Marshall Islands", "Nauru", "Palau", 
            "Papua New Guinea", "Samoa", "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu"
        ]
    }
]

async function seeds(){
    try {
    
        //first connect
        const x = await mongoose.connect(MONGO_URI)
        console.log(`Connected to: ${x.connections[0].name}`);
    
        //second create a variable to receive the books of the array, using the create method
        const createdContinent = await Continent.create(continent);
        console.log(createdContinent)
        console.log(`Successfuly created users ${createdContinent.length}`)
    
        //third disconnect to the database
        x.disconnect();
    } catch(error) {
        console.log(error);
    }
    }
    
    seeds();
