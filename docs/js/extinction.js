function drawExtinctionWaffleViz() {
    const waffleDiv = document.querySelector('.extinction-waffle-viz');
    const legend = document.querySelector('.extinction-waffle-viz-legend');

    const data = [{
            type: 'Critically Endangered',
            value: 203,
            color: '#2980b9'
        },
        {
            type: 'Endangered',
            value: 505,
            color: '#3498db'
        },
        {
            type: 'Vulnerable',
            value: 536,
            color: '#1abc9c'
        },
        {
            type: 'Near Threatened',
            value: 345,
            color: '#2ecc71'
        },
        {
            type: 'Least concern',
            value: 3306,
            color: '#bdc3c7'
        },
        {
            type: 'Data Deficient',
            value: 872,
            color: ' #ecf0f1'
        }
    ];

    console.log('Extinction Data', data);

    const totalSpecies = data.reduce((acc, el) => acc + el.value, 0);

    const cleanData = data.map(el => ({
        type: el.type,
        color: el.color,
        count: Math.round(el.value / totalSpecies * 100)
    }));


    const fragment = document.createDocumentFragment();

    cleanData.forEach((el) => {
        const count = el.count;

        for (let i = 0; i < count; i++) {
            const element = document.createElement('div');
            element.classList.add('extinction-waffle-square');
            element.style.background = el.color;
            fragment.appendChild(element);
        }

        const legendItem = document.createElement('div');
        const colorSquare = document.createElement('div');
        const text = document.createElement('span');

        legendItem.classList.add('extinction-waffle-legend-item')
        colorSquare.classList.add('extinction-waffle-square');

        colorSquare.style.background = el.color;
        text.textContent = el.type;

        legendItem.appendChild(colorSquare);
        legendItem.appendChild(text);
        legend.appendChild(legendItem);
    });

    waffleDiv.appendChild(fragment);
}


drawExtinctionWaffleViz();