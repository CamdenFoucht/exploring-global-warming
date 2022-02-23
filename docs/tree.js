{/* <div class="tree-wrapper-tiny" align='center'>
<div class="leaf1-tiny"></div>
<div class="leaf2-tiny"></div>
<div class="leaf3-tiny"></div>
<div class="leaf4-tiny"></div>
<div class="leaf5-tiny"></div>
<div class="leaf6-tiny"></div>
<div class="bark-tiny"></div>
</div> */}
// 34.81 world
// 4.58 billion metric tons
// let 1 tree Imagine 
// 390 billion trees
// 10,097,171,608,000
// 390,000,000,000
// 25.8901836103 to absorb U.S CO2 gas 
// 0.64725459025 amazon rainforests to absorb 


// 390 billion trees in amazon rainforests
// 76742913466556 = world co2 polution
// 76742913466556 / 390,000,000,000 = 196.776701196 / 48 = 4.09951460825
// world has 3.04 trillion trees
//    76742913466556 / 390,000,000,000 =   1,918,572,800,000






// 2019 43.1 billion metric tonnes
// 95019235001682 / 390,000,000 / 48
console.log(((1.0097171608e+13) / 390,000,000,000));

const numTreesNeeded = 1.0097171608e+13 / 40 / 100000000;

const treeCount = document.querySelector('.tree-count');
const treeBox = document.querySelector('.tree-box');

for (let i=0; i<197; i++) {
    treeBox.appendChild(getTreeNode());
}

function getTreeNode() {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('align', 'center');
    const leaf1 = document.createElement('div');
    const leaf2 = document.createElement('div');
    const leaf3 = document.createElement('div');
    const leaf4 = document.createElement('div');
    const leaf5 = document.createElement('div');
    const leaf6 = document.createElement('div');
    const bark = document.createElement('div');
    wrapper.classList.add('tree-wrapper-small');
    leaf1.classList.add('leaf1-small');
    leaf2.classList.add('leaf2-small');
    leaf3.classList.add('leaf3-small');
    leaf4.classList.add('leaf4-small');
    leaf5.classList.add('leaf5-small');
    leaf6.classList.add('leaf6-small');
    bark.classList.add('bark-small');
    wrapper.appendChild(leaf1);
    wrapper.appendChild(leaf2);
    wrapper.appendChild(leaf3);
    wrapper.appendChild(leaf4);
    wrapper.appendChild(leaf5);
    wrapper.appendChild(leaf6);
    wrapper.appendChild(bark);
    return wrapper;
}
