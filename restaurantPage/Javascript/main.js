
var header = document.getElementsByTagName('header');
var nav = document.getElementsByTagName('nav');

function moveNav() {
    var headerElement= header[0];
    var navElement= nav[0];
    var y = window.scrollY;
    var headerHeight = headerElement.offsetHeight;
    var navHeight = navElement.offsetHeight;


    if (y > headerHeight + navHeight) {
        console.log('down');
        navElement.classList.add('navBottom')

    } else {
        navElement.classList.remove('navBottom');
        console.log('up');
    }


}


window.onscroll= moveNav;


// TEAM Entry

var buttons = document.getElementsByClassName('button');
var memberDetail = document.getElementById('memberDetail');
var memberDetail2 = document.getElementById('memberDetail2');
var detail2Heading = document.getElementById('detail2Heading');

var employees = {
    'Cornelia':{
        'position':'Kitchen Fairy',
        'description':'Cooking and Baking are two of her passions. She loves experimenting in the kitchen.\n' +
            '                Other then this Cornelia also enjoys programming, learning languages as well as archery.',
        'music':'https://www.youtube.com/watch?v=xNTAeBnDVTg',
        'musictext':'<span>For some motivation:</span> Välkommen in',
        'recipe':'https://biancazapatka.com/en/chocolate-raspberry-cake/',
        'recipetext':'<span>Favorite Recipe: </span>Chocolate Raspberry Cake'


    },
    'Elke':{
        'position':'Kitchen Ghost',
        'description':'When she is not haunting the kitchen creating crêpes, Elke is a Frontend Developer in training.' +
            ' Before Corona Lockdown, she has worked as a management consultant, a cultural manager and a movie theatre popcorn maker, among other interesting positions.',
        'music':'https://youtu.be/3t5xR80_hoQ',
        'musictext':'<span>Kitchen Soundtrack:</span> Le temps est bon',
        'recipe':'http://www.surprisesurprise.at/crepe-sandrine/',
        'recipetext':'<span>Favorite Recipe:</span> Crêpe Sandrine'


    },
    'Manuel':{
        'position':'Cleaning Lady',
        'description':'Before his dream came true and he started to clean in our company, Manuel worked in many odd jobs like ' +
            'IT-Support, in an exotic pet shop or as an touring musician in a Heavy Metal band. He also studied Music with an focus on Classical Guitar and Audio-Engineering on the Landesmusikkonservatorium in Feldkirch. Now you see how far that takes you!',
        'music':'https://www.youtube.com/watch?v=FtXDfwO9aFs',
        'musictext':'<span>Kitchen Soundtrack:</span> Eclipse by Kirlian Camera',
        'recipe':'https://biancazapatka.com/en/chocolate-raspberry-cake/',
        'recipetext':'<span>Favorite Recipe:</span> I like noodles!!!'


    },
    'Zumrut':{
        'position':'Gourmet Traveller',
        'description':'She believes in creative solutions, life-long learning and equal opportunity. Program manager in Human Rights and Community Development, Data Enthusiast, Movie Buff, Traveller and (hopefully one day) a Coder.',
        'music':'https://www.youtube.com/watch?v=Ka9HS_4SIIw',
        'musictext':'<span>Kitchen Soundtrack:</span> Seven Days of Falling',
        'recipe':'https://en.wikipedia.org/wiki/Halawet_el_Jibn',
        'recipetext':'<span>Favorite Recipe:</span> Halawet el Jibn'


    }
};

function createDetailContent() {
    var memberId = this.id;
    console.log(this);
    console.log(memberId);
    memberDetail.innerHTML = "";
    memberDetail2.innerHTML = "";
    memberDetail.style.backgroundImage= `url('../Media/${memberId}.jpg')`;
    memberName =document.createElement('h1');
    memberName.setAttribute('id', 'memberName');
    memberName.innerHTML=memberId;

    memberPosition = document.createElement('p');
    memberPosition.setAttribute('id', 'memberPosition');
    memberPosition.innerHTML= employees[memberId].position;

    memberText = document.createElement('p');
    memberText.setAttribute('id', 'memberText');
    memberText.innerHTML= employees[memberId].description;

    memberDetail.appendChild(memberName);
    memberDetail.appendChild(memberPosition);
    memberDetail.appendChild(memberText);

    memberMusic = document.createElement('a');
    memberMusic.setAttribute('id', 'memberMusic');
    memberMusic.setAttribute('href', `${employees[memberId].music}`);
    memberMusic.innerHTML = `${employees[memberId].musictext}`;

     memberRecipe = document.createElement('a');
    memberRecipe.setAttribute('id', 'memberRecipe');
    memberRecipe.setAttribute('href', `${employees[memberId].recipe}`);
    memberRecipe.innerHTML = `${employees[memberId].recipetext}`;

    memberDetail2.appendChild(memberMusic);
    memberDetail2.appendChild(memberRecipe);

    memberDetail.style.display='block';
    memberDetail2.style.display='block';
    detail2Heading.style.display='block'

}
var button;
Object.keys(buttons).forEach(function (buttonIndex){
    button = buttons[buttonIndex];
    console.log(button);
    button.addEventListener('click', createDetailContent)
});