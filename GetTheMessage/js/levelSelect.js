let numLevels = 7;

window.onload = () => {

    let levelsDiv = document.querySelector('#historical-levels');

    let list = document.createElement('ul');

    for (let index = 1; index <= numLevels; index++) {
        let link = document.createElement('a');
        link.href = 'gameplay.html?' + index;
        link.innerHTML = index; 

        let item = document.createElement('li');

        item.appendChild(link);

        list.appendChild(item);

        console.log(index);

    }
   
    levelsDiv.appendChild(list);
}