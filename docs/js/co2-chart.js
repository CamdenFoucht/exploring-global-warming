async function energyViz() {
    const START_YEAR = 1995;

    const countryColors = {
        'China': '#a00041',
        'United States': "#d73c4c",
        'India': "#3086be",
        'Russia': "#88e584",
        'Japan': "#f66d3a",
        'South Korea': "#4fdbd7",
        'Germany': "#0c7a57",
        'Canada': "#ffaf59",
    };

    const energyFetch = await fetch('./data/energy.json');
    const energyJson = await energyFetch.json();
    const data = cleanEnergyData();

    // set the dimensions and margins of the graph
    var margin = {
            top: 20,
            right: 30,
            bottom: 60,
            left: 120
        },
        width = 1000 - margin.left - margin.right,
        height = 650 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("viewBox", `0 0 ${1000} ${650}`)
        .attr('class', 'co2-svg')
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")
        .attr('class', 'co2-g-container');


    // List of groups = header of the csv files
    var keys = Object.keys(data[0]).slice(1).sort((c1, c2) => {
        const c1Emission = data[data.length - 1][c1];
        const c2Emission = data[data.length - 1][c2];
        return c2Emission - c1Emission;
    });
    console.log(keys);

    // Add X axis
    var parseTime = d3.timeParse("%Y");
    var x = d3.scaleTime()
        .domain(d3.extent(data, function (d) {
            return parseTime(d.year);
        }))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr('class', 'co2-x-axis')
        .call(d3.axisBottom(x).ticks(10));


    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 30000])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Viz Title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr('class', 'energy-title')
        .text("CO2 Emissions by Country");

    // X Axis Title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", y(0) + 45)
        .style("text-anchor", "middle")
        .style('color', '#000')
        .attr('class', 'energy-x-title')
        .text("Year");

    // Y-Axis Title
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", x(parseTime(1990)) - 100)
        .attr("x", -250)
        .attr("dy", "200")
        .style("text-anchor", "middle")
        .style('color', '#000')
        .attr('class', 'energy-y-title')
        .text("Amount of CO2 Emitted (Million Metric Tons)");


    // Stack the data
    var stackedData = d3.stack()
        .keys(keys)
        (data)


    // Creates the legend
    const ul = document.querySelector('.energy-legend-ul');
    keys.reverse().forEach(key => {
        const li = document.createElement('li');
        const circle = document.createElement('div');
        const span = document.createElement('span');
        li.classList.add('energy-legend-li')
        circle.classList.add('energy-legend-circle')
        circle.style.background = countryColors[key];
        span.classList.add('energy-legend-country');
        span.textContent = key;
        li.appendChild(circle);
        li.appendChild(span);
        ul.appendChild(li);
    })

    // Tooltip
    var tooltip = d3.select('#my_dataviz').append("div")
        .attr("class", "energy-tooltip")
        .style("opacity", 0).style("border", "solid");

    // Area
    const area = d3.area()
        .curve(d3.curveBasis)
        .x((d, i) => x(parseTime(d.data.year)))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]))


    // Show the areas
    svg
        .selectAll("mylayers")
        .data(stackedData)
        .enter()
        .append("path")
        .on("mousemove", function (e) {
            const srcData = e.target.__data__;
            const key = srcData.key;

            // TODO: Make this dynamic, as it doesn't work with browser resizing
            const svgWidth = 750;
            const offsetWidth = e.offsetX;
            const widthCalc = svgWidth - offsetWidth;

            const numYears = widthCalc / 27;

            const year = Math.min(2019, Math.round(2019 - numYears) + 1);
            const arr = srcData[year - START_YEAR];
            const c02 = arr[1] - arr[0];

            tooltip
                .transition()
                .duration(200)
                .style("opacity", 0.92);
            tooltip.html(`Country: ${key} <br/> Year: ${year}<br/> C02 Emissions: ${Math.round(c02).toLocaleString()}`)
                .style("left", (e.offsetX + 10) + "px")
                .style("top", (e.offsetY) + "px")
        })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(100)
                .style("opacity", 0);
        })

        .transition()
        .duration(300)
        .attr("d", area)
        .style("fill", d => countryColors[d.key])


    function cleanEnergyData() {
        const filterCountries = Object.keys(countryColors);
        console.log(filterCountries);
        const result = [];
        for (let i = START_YEAR; i <= 2019; i++) {
            const obj = result[i - START_YEAR] ?? {
                year: i
            };

            energyJson.forEach((el) => {
                if (!filterCountries.includes(el.Country)) return;
                if (el.Year > i) return;

                const country = el.Country;

                if (el.Year === i) {
                    obj[country] = el.CO2_emission
                }
            });
            result[i - START_YEAR] = obj;
        }

        console.log('Energy Clean Data', result);
        return result;
    }
}

energyViz();