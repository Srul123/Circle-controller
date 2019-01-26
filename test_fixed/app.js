//********UI selectors section**********

const circle = document.getElementById('circle');//Circle selector

//up, left, right, down buttons selectors
document.getElementById('up').addEventListener('click', up_circle);
document.getElementById('left').addEventListener('click', left_circle);
document.getElementById('right').addEventListener('click', right_circle);
document.getElementById('down').addEventListener('click', down_circle);


//Reset button selector
document.getElementById('reset_btn').addEventListener('click', defualt_location);

//Diagonals movements by call separately to each movement circle function
document.getElementById('up_left').addEventListener('click', () => { up_circle(); left_circle(); });
document.getElementById('up_right').addEventListener('click', () => { up_circle(); right_circle(); });
document.getElementById('down_left').addEventListener('click', () => { down_circle(); left_circle(); });
document.getElementById('down_right').addEventListener('click', () => { down_circle(); right_circle(); });



//*******Events App*******

let up_down = 50; //Default location for vartical position circle
let left_right = 50; //Default location for horizontal position circle


function up_circle() {
    let factor_up_down = parseFloat(((up_down) / 100)).toFixed(1); // The factor is  the percentage of the current range size position of the circle, the permanent "40" is to make steps slower or faster
    up_down = up_down - (factor_up_down * 40) - 1;
    if (up_down > 10 + max_movments) {
        circle.style.top = `${up_down}%`;
        circle.style.background = 'blue';
    } else {
        up_down = 10 + max_movments;
        circle.style.background = 'red';
        circle.style.top = `${up_down}%`;
    }

}
function left_circle() {
    let factor_left_right = parseFloat(((left_right) / 100)).toFixed(1); // The factor is  the percentage of the current range size position of the circle, the permanent "40" is to make steps slower or faster
    left_right -= (factor_left_right * 40) + 1;
    if (left_right > 10 + max_movments) {
        circle.style.left = `${left_right}%`;
        circle.style.background = 'blue';
    } else {
        left_right = 10 + max_movments;
        circle.style.background = 'red';
        circle.style.left = `${left_right}%`;
    }

}
function right_circle() {
    let factor_left_right = parseFloat(((100 - left_right) / 100)).toFixed(1); // The factor is  the percentage of the current range size position of the circle, the permanent "40" is to make steps slower or faster
    left_right += (factor_left_right * 40) + 1;
    if (left_right < 90 - max_movments) {
        circle.style.left = `${left_right}%`;
        circle.style.background = 'blue';
    } else {
        left_right = 90 - max_movments;
        circle.style.background = 'red';
        circle.style.left = `${left_right}%`;
    }

}
function down_circle() {
    let factor_up_down = parseFloat(((100 - up_down) / 100)).toFixed(1); // The factor is  the percentage of the current range size position of the circle, the permanent "40" is to make steps slower or faster
    up_down += (factor_up_down * 40) + 1;
    if (up_down < 90 - max_movments) {
        circle.style.top = `${up_down}%`;
        circle.style.background = 'blue';
    } else {
        up_down = 90 - max_movments;
        circle.style.background = 'red';
        circle.style.top = `${up_down}%`;
    }

}


function defualt_location() { //Bringing back the circle to center by set to defualt position 
    up_down = 50;
    left_right = 50;
    circle.style.top = `${up_down}%`;
    circle.style.left = `${left_right}%`;
    circle.style.background = 'blue';
}



//*****This section is for the new diameter set feature****

let curr_size_radius = 10; //The default size of the radius circle

let max_movments = 0; //Set the new movements limitations for vertical and horozintal move in case of radius changed


document.getElementById('set_diameter').addEventListener('click', set_new_diameter);//Selector for UI event to set a new Diameter

function set_new_diameter(e) {
    e.preventDefault();
    let new_diameter_element = document.getElementById('input_diameter'); //Get the new size input
    let new_diameter = parseInt(new_diameter_element.value);
    if (new_diameter <= 0 || new_diameter > 100) {//Check for valid range input
        ui_alert();
        new_diameter_element.value = `${curr_size_radius * 2}`;
        return false;
    }
    max_movments += (new_diameter / 2).toFixed(1) - curr_size_radius;//Update the new limit 
    curr_size_radius = (new_diameter / 2).toFixed(1);//Update the new radius

    circle.style.height = `${new_diameter}%`;//Set the new Diameter to circle
    circle.style.width = `${new_diameter}%`;
    defualt_location();//Set location circle to default position for prevent overflow
}


function ui_alert() {// Show alert as part of the UI in case of invalid diameter input
    let div_alert = document.createElement('div');
    div_alert.appendChild(document.createTextNode('Only values between 1 - 100 are allowed'));
    div_alert.className = 'alert';
    let insert_before = document.getElementById('set_diameter');
    insert_before.insertAdjacentElement('beforebegin', div_alert);
    if (div_alert) {
        setTimeout(() => { div_alert.remove(); }, 4000);
    }
}




