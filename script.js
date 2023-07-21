let input = document.querySelector('#input');
var searchBtn = document.querySelector('#search');
let apiKey = 'ae3d99bc-16fe-41c9-8fa1-331614df564d'
var notFound = document.querySelector('.not_found');
let defBox = document.querySelector('.def');
let audioBox = document.querySelector('.audio');

searchBtn.addEventListener('click', function(e){

    notFound.innerText = '';
    defBox.innerText = '';
    

    e.preventDefault();

    let word = input.value;

    if(word === ''){

        alert('Word is required');
        return;

    }
    getdata(word);
})

async function getdata(word) {

    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();

    console.log(data);

    if(!data.length) {

        notFound.innerText = ' No Result Found';

        return;
    }

    if(typeof data[0] === 'string') {
        let heading = document.createElement('h3');
        heading.innerText = 'Did you mean?'
        notFound.appendChild(heading);

        data.forEach(element => {
            let suggetion = document.createElement('span');
            suggetion.classList.add('suggested');
            suggetion.innerText = element;
            notFound.appendChild(suggetion);
        });
        return;
    }

    let defination = data[0].shortdef[0];
    defBox.innerText = defination;

    const soundName = data[0].hwi.prs[0].sound.audio;
    if(soundName){
        renderSound(soundName);
    }
    console.log(data);
}

function renderSound(soundName) {
    // https://media.marriam-webster.com/soundc11
    let subFolder = soundName.charAt(0);
    let.soundSrc = `https://media.marriam-webster.com/soundc11/${subFolder}/${soundName}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = ture;
    audioBox.appendChild(aud);

}