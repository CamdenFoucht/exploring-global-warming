const remainingPercentage = [90.0, //1990
    89.8,
    89.4,
    89.1,
    88.7,
    88.0,
    87.6,
    87.2,
    86.8,
    86.4,
    86.0,
    85.5,
    85.0,
    84.4,
    83.7,
    83.2,
    82.9,
    82.6,
    82.3,
    82.1,
    81.9,
    81.8,
    81.7,
    81.5,
    81.4,
    81.2,
    81.0,
    80.9,
    80.7,
    80.5,
    80.3,
    80.1 //
]

const startAmount = 4100001;

async function drawForestCover() {
    let index = 0;
    const slider = document.querySelector('.forest-cover-slider');
    const remainingCoverDiv = document.querySelector('.tree-remaining-cover');
    const remainingAmount = document.querySelector('.remaining-forest-cover-amount');
    const remainingTreeYear = document.querySelector('.remaining-tree-cover-year');
    const forestSliderYear = document.querySelector('.forest-cover-slider-year');

    slider.oninput = function () {
        const value = slider.value;
        index = value;
        updateTree();
        const new_data = {
            remaining: remainingPercentage[value],
            lost: 100 - remainingPercentage[value]
        };
        console.log('new_data', new_data);
        update(new_data);
    }

    function updateTree() {
        const amount = remainingPercentage[index] / 100;
        remainingCoverDiv.style.transform = `scale(${amount})`
        remainingAmount.innerHTML = `${Math.round(startAmount * amount).toLocaleString()} km<sup>2</sup>`;
        remainingTreeYear.textContent = `Forest Area in ${parseInt(index) + 1990}`;
        forestSliderYear.textContent = parseInt(index) + 1990;
    }

    updateTree();



    // set the dimensions and margins of the graph
    const width = 325,
        height = 325,
        margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the div called 'my_dataviz'
    const svg = d3.select(".tree-cover-pie-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width/2}, ${height/2})`);

    var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)

    // set the color scale
    const color = d3.scaleOrdinal()
        .domain(["remaining", "lost"])
        .range(["#27ae60", "#c79c6f", ]);

    // A function that create / update the plot for a given variable:
    function update(data) {

        // Compute the position of each group on the pie:
        const pie = d3.pie()
            .value(function (d) {
                return d[1];
            })
            .sort(function (a, b) {
                return d3.ascending(a.key, b.key);
            }) // This make sure that group order remains the same in the pie chart
        const data_ready = pie(Object.entries(data))

        // map to data
        const u = svg.selectAll("path")
            .data(data_ready)

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        u
            .join('path')
            .transition()
            .duration(400)
            .attr('d', d3.arc()
                .innerRadius(0)
                .outerRadius(radius)
            )
            .attr('fill', function (d) {
                return (color(d.data[0]))
            })
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 1);


        svg.selectAll('text')
            .data(data_ready)
            .join('text')
            .text(function (d) {
                return Math.round(d.data[1]) + "%"
            })
            .attr("transform", function (d) {
                return "translate(" + arcGenerator.centroid(d) + ")";
            })
            .style("text-anchor", "middle")
            .style("font-size", 17)


    }

    // Initialize the plot with the first dataset
    update({
        remaining: 90,
        lost: 10
    });


}

drawForestCover();