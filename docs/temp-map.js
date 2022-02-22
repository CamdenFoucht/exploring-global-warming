// Country names object using 3-letter country codes to reference country name
// ISO 3166 Alpha-3 Format: [3 letter Country Code]: [Country Name]
// Sorted alphabetical by country name (special characters on bottom)
const countryListAlpha3 = {
    "AFG": "Afghanistan",
    "ALB": "Albania",
    "DZA": "Algeria",
    "ASM": "American Samoa",
    "AND": "Andorra",
    "AGO": "Angola",
    "AIA": "Anguilla",
    "ATA": "Antarctica",
    "ATG": "Antigua and Barbuda",
    "ARG": "Argentina",
    "ARM": "Armenia",
    "ABW": "Aruba",
    "AUS": "Australia",
    "AUT": "Austria",
    "AZE": "Azerbaijan",
    "BHS": "Bahamas",
    "BHR": "Bahrain",
    "BGD": "Bangladesh",
    "BRB": "Barbados",
    "BLR": "Belarus",
    "BEL": "Belgium",
    "BLZ": "Belize",
    "BEN": "Benin",
    "BMU": "Bermuda",
    "BTN": "Bhutan",
    "BOL": "Bolivia",
    "BES": "Bonaire, Sint Eustatius and Saba",
    "BIH": "Bosnia and Herzegovina",
    "BWA": "Botswana",
    "BVT": "Bouvet Island",
    "BRA": "Brazil",
    "IOT": "British Indian Ocean Territory",
    "BRN": "Brunei Darussalam",
    "BGR": "Bulgaria",
    "BFA": "Burkina Faso",
    "BDI": "Burundi",
    "CPV": "Cabo Verde",
    "KHM": "Cambodia",
    "CMR": "Cameroon",
    "CAN": "Canada",
    "CYM": "Cayman Islands",
    "CAF": "Central African Republic",
    "TCD": "Chad",
    "CHL": "Chile",
    "CHN": "China",
    "CXR": "Christmas Island",
    "CCK": "Cocos (Keeling) Islands",
    "COL": "Colombia",
    "COM": "Comoros",
    "COD": "Congo (the Democratic Republic of the)",
    "COG": "Congo",
    "COK": "Cook Islands",
    "CRI": "Costa Rica",
    "HRV": "Croatia",
    "CUB": "Cuba",
    "CUW": "Curaçao",
    "CYP": "Cyprus",
    "CZE": "Czechia",
    "CIV": "Côte d'Ivoire",
    "DNK": "Denmark",
    "DJI": "Djibouti",
    "DMA": "Dominica",
    "DOM": "Dominican Republic",
    "ECU": "Ecuador",
    "EGY": "Egypt",
    "SLV": "El Salvador",
    "GNQ": "Equatorial Guinea",
    "ERI": "Eritrea",
    "EST": "Estonia",
    "SWZ": "Eswatini",
    "ETH": "Ethiopia",
    "FLK": "Falkland Islands [Malvinas]",
    "FRO": "Faroe Islands",
    "FJI": "Fiji",
    "FIN": "Finland",
    "FRA": "France",
    "GUF": "French Guiana",
    "PYF": "French Polynesia",
    "ATF": "French Southern Territories",
    "GAB": "Gabon",
    "GMB": "Gambia",
    "GEO": "Georgia",
    "DEU": "Germany",
    "GHA": "Ghana",
    "GIB": "Gibraltar",
    "GRC": "Greece",
    "GRL": "Greenland",
    "GRD": "Grenada",
    "GLP": "Guadeloupe",
    "GUM": "Guam",
    "GTM": "Guatemala",
    "GGY": "Guernsey",
    "GIN": "Guinea",
    "GNB": "Guinea-Bissau",
    "GUY": "Guyana",
    "HTI": "Haiti",
    "HMD": "Heard Island and McDonald Islands",
    "VAT": "Holy See",
    "HND": "Honduras",
    "HKG": "Hong Kong",
    "HUN": "Hungary",
    "ISL": "Iceland",
    "IND": "India",
    "IDN": "Indonesia",
    "IRN": "Iran (Islamic Republic of)",
    "IRQ": "Iraq",
    "IRL": "Ireland",
    "IMN": "Isle of Man",
    "ISR": "Israel",
    "ITA": "Italy",
    "JAM": "Jamaica",
    "JPN": "Japan",
    "JEY": "Jersey",
    "JOR": "Jordan",
    "KAZ": "Kazakhstan",
    "KEN": "Kenya",
    "KIR": "Kiribati",
    "PRK": "Korea (the Democratic People's Republic of)",
    "KOR": "Korea (the Republic of)",
    "KWT": "Kuwait",
    "KGZ": "Kyrgyzstan",
    "LAO": "Lao People's Democratic Republic",
    "LVA": "Latvia",
    "LBN": "Lebanon",
    "LSO": "Lesotho",
    "LBR": "Liberia",
    "LBY": "Libya",
    "LIE": "Liechtenstein",
    "LTU": "Lithuania",
    "LUX": "Luxembourg",
    "MAC": "Macao",
    "MDG": "Madagascar",
    "MWI": "Malawi",
    "MYS": "Malaysia",
    "MDV": "Maldives",
    "MLI": "Mali",
    "MLT": "Malta",
    "MHL": "Marshall Islands",
    "MTQ": "Martinique",
    "MRT": "Mauritania",
    "MUS": "Mauritius",
    "MYT": "Mayotte",
    "MEX": "Mexico",
    "FSM": "Micronesia (Federated States of)",
    "MDA": "Moldova (the Republic of)",
    "MCO": "Monaco",
    "MNG": "Mongolia",
    "MNE": "Montenegro",
    "MSR": "Montserrat",
    "MAR": "Morocco",
    "MOZ": "Mozambique",
    "MMR": "Myanmar",
    "NAM": "Namibia",
    "NRU": "Nauru",
    "NPL": "Nepal",
    "NLD": "Netherlands",
    "NCL": "New Caledonia",
    "NZL": "New Zealand",
    "NIC": "Nicaragua",
    "NER": "Niger",
    "NGA": "Nigeria",
    "NIU": "Niue",
    "NFK": "Norfolk Island",
    "MNP": "Northern Mariana Islands",
    "NOR": "Norway",
    "OMN": "Oman",
    "PAK": "Pakistan",
    "PLW": "Palau",
    "PSE": "Palestine, State of",
    "PAN": "Panama",
    "PNG": "Papua New Guinea",
    "PRY": "Paraguay",
    "PER": "Peru",
    "PHL": "Philippines",
    "PCN": "Pitcairn",
    "POL": "Poland",
    "PRT": "Portugal",
    "PRI": "Puerto Rico",
    "QAT": "Qatar",
    "MKD": "Republic of North Macedonia",
    "ROU": "Romania",
    "RUS": "Russian Federation",
    "RWA": "Rwanda",
    "REU": "Réunion",
    "BLM": "Saint Barthélemy",
    "SHN": "Saint Helena, Ascension and Tristan da Cunha",
    "KNA": "Saint Kitts and Nevis",
    "LCA": "Saint Lucia",
    "MAF": "Saint Martin (French part)",
    "SPM": "Saint Pierre and Miquelon",
    "VCT": "Saint Vincent and the Grenadines",
    "WSM": "Samoa",
    "SMR": "San Marino",
    "STP": "Sao Tome and Principe",
    "SAU": "Saudi Arabia",
    "SEN": "Senegal",
    "SRB": "Serbia",
    "SYC": "Seychelles",
    "SLE": "Sierra Leone",
    "SGP": "Singapore",
    "SXM": "Sint Maarten (Dutch part)",
    "SVK": "Slovakia",
    "SVN": "Slovenia",
    "SLB": "Solomon Islands",
    "SOM": "Somalia",
    "ZAF": "South Africa",
    "SGS": "South Georgia and the South Sandwich Islands",
    "SSD": "South Sudan",
    "ESP": "Spain",
    "LKA": "Sri Lanka",
    "SDN": "Sudan",
    "SUR": "Suriname",
    "SJM": "Svalbard and Jan Mayen",
    "SWE": "Sweden",
    "CHE": "Switzerland",
    "SYR": "Syrian Arab Republic",
    "TWN": "Taiwan",
    "TJK": "Tajikistan",
    "TZA": "Tanzania, United Republic of",
    "THA": "Thailand",
    "TLS": "Timor-Leste",
    "TGO": "Togo",
    "TKL": "Tokelau",
    "TON": "Tonga",
    "TTO": "Trinidad and Tobago",
    "TUN": "Tunisia",
    "TUR": "Turkey",
    "TKM": "Turkmenistan",
    "TCA": "Turks and Caicos Islands",
    "TUV": "Tuvalu",
    "UGA": "Uganda",
    "UKR": "Ukraine",
    "ARE": "United Arab Emirates",
    "GBR": "United Kingdom of Great Britain and Northern Ireland",
    "UMI": "United States Minor Outlying Islands",
    "USA": "United States of America",
    "URY": "Uruguay",
    "UZB": "Uzbekistan",
    "VUT": "Vanuatu",
    "VEN": "Venezuela",
    "VNM": "Vietnam",
    "VGB": "Virgin Islands (British)",
    "VIR": "Virgin Islands (U.S.)",
    "WLF": "Wallis and Futuna",
    "ESH": "Western Sahara",
    "YEM": "Yemen",
    "ZMB": "Zambia",
    "ZWE": "Zimbabwe",
    "ALA": "Åland Islands"
};

const countryToCodeMap = swap(countryListAlpha3);



function swap(json){
    var ret = {};
    for(var key in json){
      ret[json[key]] = key;
    }
    return ret;
}

async function drawGlobalMap() {
// The svg
    const year = 2015;
    let index = year - 1995;

    const tempFetch = await fetch('../temp-change.json');
    const tempJson = await tempFetch.json();
    const data2 = cleanTempData();


    const svg = d3.select("#global-map-viz-svg");

    const width = +svg.attr("width");
    const height = +svg.attr("height");

    // Map and projection
    const path = d3.geoPath();
    const projection = d3.geoMercator()
    .scale(100)
    .center([0,20])
    .translate([width / 2, height / 2]);

   
    // Data and color scale
    let data = new Map();

    const colors = [ "#08519c","#2c76b5","#4292c6","#6baed6", "#7ebfe5", "#f1b6a9", "#fb6a4a","#ef3b2c","#cb181d", "#a50f15", "#67000d"]
    const domain = [-2, -1.5, -1, -0.5, -0.1, 0, 0.5, 1, 2, 3, 4]

    const colorScale = d3.scaleThreshold()
    .domain(domain)
    .range(colors);


    // Legend stuff
    const ul = document.querySelector('.temp-map-legend-ul');
    colors.forEach((color, index) => {  
        const li = document.createElement('li');
        const circle = document.createElement('div');
        const span = document.createElement('span');
        li.classList.add('temp-map-legend-li')
        circle.classList.add('temp-map-legend-square')
        circle.style.background = color;
        span.classList.add('temp-map-legend-country');
        span.textContent = domain[index];
        li.appendChild(circle);
        li.appendChild(span);
        ul.appendChild(li);
    })


    // Load external data and boot
    const geoJson = await (await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')).json();

    let topo = geoJson;

    const slider = document.querySelector('.slider');
    const sliderDate = document.querySelector('.sliderDate');
    index = parseInt(slider.value);
    updateSliderDate(index + 1995);

    slider.oninput = function() {
        const value = slider.value;
        const year = (1995 + parseInt(value));
        index = value;
        updateSliderDate(year);
        setDataCodes();
        updateGraph();
       }

    // Draw the map
    setDataCodes();
    updateGraph();


    // Tooltip
    var tooltip = d3.select('.global-map-viz').append("div")	
    .attr("class", "energy-tooltip")	
    .style("opacity", 0).style("border", "solid");

    function setDataCodes() {
        geoJson.features.forEach(el => {
            data.set(el.id, data2[index][el.id] || 0);
        });
    }

    function updateGraph(){ 
        svg.append("g")
            .selectAll("path")
            .data(topo.features)
            .join("path")
            .on("mousemove", function(e) {	
                const srcData = e.target.__data__;
                
                const country = srcData.properties.name;
                const tempChange = srcData.total;
                
                tooltip
                .transition()		
                    .duration(200)		
                    .style("opacity", 0.92);		
                    tooltip.html(`Country: ${country} <br/> Year: ${(parseInt(index) + 1995)}<br/> Temperature Change: ${(Math.round(tempChange * 100) / 100).toLocaleString()}`)	
                            .style("left", (e.offsetX + 10) + "px")		
                            .style("top", (e.offsetY + 10) + "px")
                    })	
             .on("mouseout", function(d) {	
                tooltip.transition()		
                    .duration(100)		
                    .style("opacity", 0);	
                })
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
        }


        function updateSliderDate(year) {
            sliderDate.textContent = `January ${year}`
        }

    // });







    function cleanTempData() {
        const result = [];
        const month = 'July';
        const START_YEAR = 1995;


        tempJson.forEach(el => {
            const year = el.Year;
            const changeInTemp = el.Value;
            const areaName = el.Area;
            if (countryToCodeMap[areaName] === undefined) {
                return;
            }
            const code = countryToCodeMap[areaName];

            const obj = result[year - START_YEAR] || {};

            obj[code] = el.Value;
            if (el.Months === month && el[year] !== undefined) {
                obj[el.Area] = cToF(el[year]);
            }
            result[year - START_YEAR] = obj;
        })

       console.log('Clean Temp Change Data', result);

       return result;

    }


    function cToF(celsius) {
      var cTemp = celsius;
      var cToFahr = cTemp * 9 / 5 + 32;
      return cToFahr;
    }

}


drawGlobalMap();
// global-map-viz