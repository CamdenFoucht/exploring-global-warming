async function drawDeforesting() {
    const jsonData = await (await fetch('../deforest.json')).json();
    const data = jsonData.slice(6);
    console.log('Deforest Clean Data', data);

    // set the dimensions and margins of the graph
    const margin = {top: 50, right: 30, bottom: 75, left: 75},
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select(".deforesting-viz")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);


    // List of subgroups = header of the csv files = soil condition here
    const subgroups = [
        "Acre",
        "Amazonas",
        "Amapa",
        "Maranhao",
        "Mato",
        "Para",
        "Rondonia",
        "Roraima",
        "Tocantins",
    ]


  const groups = data.map(d => d.Year);

  // Add X axis
  const x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, 11000])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // color palette = one color per subgroup
  const colors = ["#ea5545","#3f51b5", "#f46a9b", "#009688", "#673ab7", "#87bc45", "#27aeef", "#ff5722"];
  const colors2 = ["#e27c7c", "#a86464", "#6d4b4b", "#503f3f", "#333333", "#3c4e4b", "#466964", "#599e94", "#6cd4c5"];
  const colors3 = ["#ffb400", "#d2980d", "#a57c1b", "#786028", "#363445", "#48446e", "#5e569b", "#776bcd", "#9080ff"];
  const colors4 = ["#1984c5", "#22a7f0", "#63bff0", "#a7d5ed", "#e2e2e2", "#e1a692", "#de6e56", "#e14b31", "#c23728"];

  const color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(colors4);

  //stack the data? --> stack per subgroup
  const stackedData = d3.stack()
    .keys(subgroups)
    (data)


    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width / 2)
    .attr("y", height + 50)
    .text("Year"); 

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -50)
    // .attr("dy", "0.85em")
    .attr("x", -100)
    .attr("transform", "rotate(-90)")
    .text("Deforestation Area (km²)");

    // Viz Title
    svg.append("text")
        .attr("x", width / 2 )
        .attr("y", -15)
        .style("text-anchor", "middle")
        .attr('class', 'energy-title')
        .text("Amazon Rainforest Deforestation By Brazil State");

  // Show the bars
  svg.append("g")
    .selectAll("g")
    .data(stackedData)
    .join("g")
      .attr("fill", d => color(d.key))
      .attr("class", d => "myRect " + d.key)
      .selectAll("rect")
      .data(d => d)
      .join("rect")
        .attr("x", d => x(d.data.Year))
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))
        .attr("width", x.bandwidth())
        .on("mouseover", function (event,d) { // What happens when user hover a bar
            const subGroupName = d3.select(this.parentNode).datum().key;
            setForestTooltip(subGroupName);

            d3.selectAll(".myRect").style("opacity", 0.2)  
            // Highlight all rects of this subgroup with opacity 1. It is possible to select them since they have a specific class = their name.
            d3.selectAll("." + subGroupName).style("opacity", 1) 
        })
        .on("mouseleave", function (event,d) { // When user do not hover anymore
            hideForestTooltip();
            d3.selectAll(".myRect").style("opacity", 1) ;
      });

      createDeforestLegend();

    function createDeforestLegend() {
        const ul = document.querySelector('.deforesting-viz-legend-ul');

        subgroups.reverse().forEach((group, index) => {  
            const circleColor = color(group);
            const li = document.createElement('li');
            const circle = document.createElement('div');
            const span = document.createElement('span');
            li.classList.add('temp-map-legend-li')
            circle.classList.add('temp-map-legend-square')
            circle.style.background = circleColor;
            span.classList.add('temp-map-legend-country');
            span.textContent = group;
            li.appendChild(circle);
            li.appendChild(span);
            ul.appendChild(li);
        });
    }
     

    function setForestTooltip(group) {
        const tooltip = document.querySelector('.deforesting-viz-tooltip');
        const ul = document.querySelector('.deforesting-viz-tooltip-ul');
        const title = document.querySelector('.deforesting-viz-tooltip-group');
        title.classList.add('deforesting-viz-tooltip-title')
        title.textContent = group + " State";
        tooltip.style.background = color(group);
        ul.innerHTML = '';
        data.forEach(el => {
            const li = document.createElement('li');
            li.classList.add('deforesting-viz-tooltip-li');
            const yearSpan = document.createElement('span');
            const areaSpan = document.createElement('span');

            yearSpan.classList.add('deforesting-span-year')
            areaSpan.classList.add('deforesting-span-area');

            yearSpan.textContent = `${el.Year}:`;
            areaSpan.textContent = `${el[group]} km²`;

            li.appendChild(yearSpan);
            li.appendChild(areaSpan);
            ul.appendChild(li);

        });
        tooltip.style.opacity = 1;
    }

    function hideForestTooltip() {
        const tooltip = document.querySelector('.deforesting-viz-tooltip');
        tooltip.style.opacity = 0;
    }


}


drawDeforesting();