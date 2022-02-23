async function drawPrecipMap() {
    const precipFetch = await fetch('./data/precip.json');
    const precipJson = await precipFetch.json();

    const START_YEAR = 1895;
    let index = 100;
    const data = cleanprecipData();

    var width = 960;
    var height = 500;

    var projection = d3.geoAlbersUsa()
        .translate([width / 2, height / 2]) // translate to center of screen
        .scale([1000]); // scale things down so see entire US

    // Define path generator
    var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
        .projection(projection); // tell path generator to use albersUsa projection


    // Define linear scale for output
    const colors = d3.schemeBlues[8];
    const domain = [0, 10, 20, 30, 40, 50, 60, 70]

    var color = d3.scaleLinear()
        .range(colors)
        .domain(domain);



    var tooltip = d3.select('.precip-data-viz').append("div")
        .attr("class", "energy-tooltip")
        .style("opacity", 0).style("border", "solid");

    //Create SVG element and append map to the SVG
    var svg = d3.select(".precip-data-viz")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


    // Geo JSON of U.S states
    const json = await (await fetch('./data/us-states.json')).json();


    const slider = document.querySelector('.precip-slider');
    const sliderDate = document.querySelector('.precip-sliderDate');
    index = parseInt(slider.value);
    updateSliderDate(index + 1895);

    // Legend stuff
    const ul = document.querySelector('.precip-map-legend-ul');
    colors.forEach((color, index) => {
        const li = document.createElement('li');
        const circle = document.createElement('div');
        const span = document.createElement('span');
        li.classList.add('temp-map-legend-li')
        circle.classList.add('temp-map-legend-square')
        circle.style.background = color;
        span.classList.add('temp-map-legend-country');
        span.textContent = domain[index] + " Inches";
        li.appendChild(circle);
        li.appendChild(span);
        ul.appendChild(li);
    });

    document.querySelectorAll('.precip-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log(e);
            const year = e.target.dataset.year;
            index = year - START_YEAR;
            slider.value = index;
            updateSliderDate(year);
            updateGraph();
        })
    })

    slider.oninput = function () {
        const value = slider.value;
        const year = (START_YEAR + parseInt(value));
        index = value;
        updateSliderDate(year);
        updateGraph();
    }


    updateGraph();


    function updateGraph() {
        Object.keys(data[index]).forEach((key) => {
            const state = key;
            const value = data[index][key];

            for (var j = 0; j < json.features.length; j++) {
                var jsonState = json.features[j].properties.name;
                if (state == jsonState) {
                    // Copy the data value into the JSON
                    json.features[j].properties.visited = value || 0;
                    // Stop looking through the JSON
                    break;
                }
            }
        });

        // Bind the data to the SVG and create one path per GeoJSON feature
        svg.selectAll("path")
            .data(json.features)
            .join("path")
            .on("mousemove", function (e) {
                const srcData = e.target.__data__;
                const country = srcData.properties.name;
                const precipitation = srcData.properties.visited;

                tooltip
                    .transition()
                    .duration(200)
                    .style("opacity", 0.92);
                tooltip.html(`Country: ${country} <br/> Year: ${(parseInt(index) + START_YEAR)}<br/> Precipitation: ${((Math.round(precipitation * 100) / 100) || 0).toLocaleString()}`)
                    .style("left", (e.offsetX + 10) + "px")
                    .style("top", (e.offsetY + 10) + "px")
            })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(100)
                    .style("opacity", 0);
            })
            .attr("d", path)
            .transition()
            .duration(75)
            .style("stroke", "#fff")
            .style("stroke-width", "1")
            .style("fill", function (d) {

                // Get data value
                var value = d.properties.visited;

                if (value) {
                    //If value exists…
                    return color(value);
                } else {
                    //If value is undefined…
                    return "rgb(213,222,217)";
                }
            });

    }

    function updateSliderDate(year) {
        sliderDate.textContent = `January ${year}`
    }



    // [{Washington: 4.3, USA: 4.2}]

    function cleanprecipData() {
        const dataObj = precipJson.data;
        const result = [];


        Object.keys(dataObj).forEach((key) => {
            const tempData = dataObj[key];
            const location = tempData.location;
            const values = tempData.value;

            Object.keys(values).forEach(valueKey => {
                const string = new String(valueKey);
                const valueYear = parseInt(string.substring(0, 4));
                const obj = result[valueYear - START_YEAR] || {};
                if (obj[location] !== undefined) {
                    obj[location] += parseFloat(values[valueKey]);
                } else {
                    obj[location] = parseFloat(values[valueKey]);
                }
                result[valueYear - START_YEAR] = obj;

            });
        });


        console.log('Precip Cleaned data', result);
        return result;

    }

}


drawPrecipMap();