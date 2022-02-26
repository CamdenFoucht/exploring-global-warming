async function drawWarmestYears() {
  let data = await (await fetch('./data/warmest-years.json')).json();
  console.log("Warmest years clean data", data);
  data = data.sort((el1, el2) => el1.Value - el2.Value);
  // set the dimensions and margins of the graph
  // set the dimensions and margins of the graph
  const margin = {
      top: 50,
      right: 30,
      bottom: 70,
      left: 60
    },
    width = 800 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3.select(".warmest-years-viz")
    .append("svg")
    .attr("viewBox", `0 0 ${800} ${450}`)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


  // X axis
  const x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(d => d.Year))
    .padding(0.2);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .attr('font-size', '12px')
    .style("text-anchor", "end");

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, 1.8])
    .range([height, 0]);


  // Viz Title
  svg.append("text")
    .attr("x", width / 2.25)
    .attr("y", -30)
    .style("text-anchor", "middle")
    .attr('class', 'energy-title')
    .text("Ten Hottest Years Globally Since 1880");

  // X Axis Title
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", y(0) + 60)
    .style("text-anchor", "middle")
    .attr('class', 'energy-x-title')
    .text("Year");

  // Y-Axis Title
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -250)
    .attr("x", -150)
    .attr("dy", "200")
    .style("text-anchor", "middle")
    .style('color', '#000')
    .attr('class', 'energy-y-title')
    .text("Temperature Anomaly (℉)");

  svg.append("g")
    .call(d3.axisLeft(y));

  const years = data.map(el => el.Year);

  var tooltip = d3.select('.warmest-years-viz').append("div")
    .attr("class", "energy-tooltip")
    .style("opacity", 0).style("border", "solid");

  let colors = ["#000", "#111", "#222", "#333", "#f1b6a9", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"]
  colors = ["#FB6A4A", "#EB5E43", "#DA523C", "#CA4736", "#B93B2F", "#A92F28", "#982321", "#88181B", "#770C14", "#67000D"]

  /* Array */
  colors = ["#FF3C10", "#EE3510", "#DD2F0F", "#CC280F", "#BB210F", "#AB1B0E", "#9A140E", "#890D0E", "#78070D", "#67000D"]
  // colors = [ '#890D0E', "orange"];

  const color = d3.scaleOrdinal()
    .domain(years)
    .range(colors);

  var grad = svg.append('defs')
    .append('linearGradient')
    .attr('id', 'grad')
    .attr('x1', '0%')
    .attr('x2', '0%')
    .attr('y1', '50%')
    .attr('y2', '100%');

  grad.selectAll('stop')
    .data(colors)
    .enter()
    .append('stop')
    .style('stop-color', function (d) {
      return d;
    })
    .attr('offset', function (d, i) {
      return (100) * (i / (colors.length - 1)) + '%';
    })




  // Bars
  svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")

    .on("mousemove", function (e) {
      const srcData = e.target.__data__;
      const year = srcData.Year;
      const value = srcData.Value;

      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0.92);
      tooltip.html(`Year: ${year}<br/> Anomaly: ${value}℉`)
        .style("left", (e.offsetX + 10) + "px")
        .style("top", e.offsetY - 20 + "px")
    })

    .on("mouseout", function (d) {
      tooltip.transition()
        .duration(100)
        .style("opacity", 0);
    })
    .transition().duration(300)
    .attr("x", d => x(d.Year))
    .attr("y", d => y(d.Value))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.Value))
    .attr("fill", d => color(d.Value))
  // .style('fill', 'url(#grad)');


}

drawWarmestYears();