var reserveForm = document.getElementById('reserveForm');
var checkForm = document.getElementById('checkTableForm');
var thanks = document.getElementById('thanks');
var heading = document.getElementById('bookingHeading');
var noTables = document.getElementById('noTables');
var reserveButton = document.getElementById('reserveButton');
var checkButton = document.getElementById('checkButton');
checkButton.addEventListener('click', checkTables);


//Creating a Class named Table
class Table {
    tableNumber;
    maxNumberPers;
    extras;
constructor(tableNumber, maxNumberPers, extras){
    this.tableNumber = tableNumber;
    this.maxNumberPers = maxNumberPers;
    this.extras = extras;
    this.reservedDates = {}
}

// checks if table is available for given time
isAvailable(date, startHour, endHour) {
    if(!(date in this.reservedDates)) {
        return true;
    }
    for(var hour = startHour; hour < endHour; hour++) {
        if(this.reservedDates[date].includes(hour)) {
            return false;
        }
    }
    return true;
}

//checks if all criteria are met
meetsCriteria(extras, numberPers) {
    var tableExtras = this.extras;
    if (numberPers > this.maxNumberPers) {
        return false;
    }
     console.log(this);
    console.log(extras);
    var requirementsNotMet = false;
    extras.forEach(function (extra) {
        if (extra && !(tableExtras.includes(extra))) {
            requirementsNotMet = true
        }
    });
    return !requirementsNotMet;

}

//reserves the Table
reserve(date, startHour, endHour) {
    if(!(date in this.reservedDates)) {
        this.reservedDates[date] = []
    }

    for(var hour = startHour; hour < endHour; hour++) {
        this.reservedDates[date].push(hour);
        console.log(`reserved table ${this.tableNumber} for the ${date} from ${startHour} until ${endHour} `)
    }

}

}

// object with table information
var tableDetails = {
    1: {maxNumberPers: 8, extras: ['window', 'stroller']},
    2: {maxNumberPers: 8, extras: ['window']},
    3: {maxNumberPers: 8, extras: ['stroller']},
    4: {maxNumberPers: 8, extras: []},
    5: {maxNumberPers: 8, extras: []},
    6: {maxNumberPers: 4, extras: ['window', 'stroller']},
    7: {maxNumberPers: 4, extras: ['window']},
    8: {maxNumberPers: 4, extras: ['stroller']},
    9: {maxNumberPers: 4, extras: []},
    10: {maxNumberPers: 4, extras: []},
    11: {maxNumberPers: 8, extras: ['stroller', 'outside']},
    12: {maxNumberPers: 8, extras: ['stroller', 'outside']},
    13: {maxNumberPers: 4, extras: ['stroller', 'outside']},
    14: {maxNumberPers: 4, extras: ['outside']},
    15: {maxNumberPers: 4, extras: ['outside']},
};

var tables = {};

//creating objects from class Table using the Object tableDetails
Object.keys(tableDetails).forEach(function (tableNumber) {
    var table = tableDetails[tableNumber];
    tables[tableNumber] = new Table(tableNumber, table.maxNumberPers, table.extras)

});

// getting all attributes needed for the reserve method and displaying a thanks message
function reserveTable() {
    var requestedDate = document.getElementById('date').value;
    var requestedStartHour = document.getElementById('fromTime').value;
    var requestedEndHour =  document.getElementById('untilTime').value;
    requestedStartHour = requestedStartHour.split(':')[0];
    requestedEndHour = requestedEndHour.split(':')[0];
    var tableNumber = reserveButton.getAttribute('tableNumber');
    var t = tables[tableNumber];
    t.reserve(requestedDate, requestedStartHour, requestedEndHour);
    heading.style.display = 'none';
    reserveForm.style.display = 'none';
    checkForm.style.display = 'none';
    thanks.style.display = 'flex';

}


reserveButton.addEventListener('click', reserveTable);


//function to display rhe reservation form
function displayReservationField() {
    tableNumber = this.id;
    table = tables[tableNumber];
    noTables.style.display = 'none';
    checkForm.style.display ='none';
    reserveForm.style.display = 'flex';
    reserveButton.setAttribute('tableNumber', table.tableNumber);
}

// gets all the values for isAvailable and meetsCriteria method and evoking them
function checkTables() {
    var requestedPlaces = Number(document.getElementById('numPeople').value);
    var requestedDate = document.getElementById('date').value;
    var requestedStartHour = document.getElementById('fromTime').value;
    var requestedEndHour =  document.getElementById('untilTime').value;
    requestedStartHour = requestedStartHour.split(':')[0];
    requestedEndHour = requestedEndHour.split(':')[0];
    var requestedOutside = document.querySelector('#outside:checked');
    var requestedStroller = document.querySelector('#space_for_stroller:checked');
    var requestedWindow = document.querySelector('#window:checked');
    if(requestedOutside) {
        requestedOutside = requestedOutside.value
    }
    if(requestedStroller) {
        requestedStroller = requestedStroller.value
    }
    if(requestedWindow) {
        requestedWindow = requestedWindow.value
    }
    var requestedExtras = [requestedOutside, requestedStroller, requestedWindow];

    var potentialMatches = [];
    var matchingTableFound = false;

    Object.keys(tables).forEach(function (tableNumber) {
        if(!matchingTableFound) {
            table = tables[tableNumber];
            if (table.isAvailable(requestedDate, requestedStartHour, requestedEndHour)){
                if(table.meetsCriteria(requestedExtras, requestedPlaces )) {
                    console.log("Found fitting table " + tableNumber);
                    reserveButton.setAttribute('tableNumber', table.tableNumber);
                    console.log(table);
                    checkForm.style.display ='none';
                    reserveForm.style.display = 'flex';
                    matchingTableFound = true;
                    return
                }
                potentialMatches.push(table);
            }
        }

    });

    var shownPotentialMatches = 0;

    if(!matchingTableFound) {
        if(!potentialMatches) {
           var sorryMessage = document.createElement('p').innerHTML='Sorry there is no table available for this time-slot';
           noTables.appendChild(sorryMessage);
            noTables.style.display ='flex';
        } else {
            checkForm.style.display='none';
            potentialMatches.forEach(function (match) {
                if(shownPotentialMatches < 4){

                    console.log(shownPotentialMatches);

                    var matchContainer = document.createElement('div');
                    matchContainer.setAttribute('class', 'potentialMatch');

                    var headingMatch = document.createElement('h3');
                    headingMatch.innerHTML = `Table &#8470 ${match.tableNumber}`;

                    var extraMatch = document.createElement('ul');


                    match.extras.forEach(function (extra) {
                        var listElement = document.createElement('li');
                        listElement.innerHTML = extra;
                        extraMatch.appendChild(listElement);
                    });

                    matchContainer.appendChild(headingMatch);
                    matchContainer.appendChild(extraMatch);
                    noTables.appendChild(matchContainer);
                    noTables.style.display = 'flex';


                    var chosePotentialMatch = document.createElement('button');
                    chosePotentialMatch.setAttribute('type', 'button');
                    chosePotentialMatch.setAttribute('class', 'potentialMatchButton');
                    chosePotentialMatch.setAttribute('id', `${match.tableNumber}`);
                    chosePotentialMatch.addEventListener('click', displayReservationField);

                    shownPotentialMatches++;

                }


            })
        }
    }
}