var firstIsClicked = false;
var secondIsClicked = false;
var thirdIsClicked = false;
var fourthIsClicked = false;

function showFirst() {
    $("#first-btn").attr("src", 'images/arrow-down.png'); // updates image
    $("#first-p").slideDown(450);                         // animates paragraph
    firstIsClicked = true;                                // sets flag bool to appropriate state
}

function hideFirst() {
    $("#first-btn").attr("src", 'images/arrow-right.png'); 
    $("#first-p").slideUp(450);                            
    firstIsClicked = false;                                
}

function showSecond() {
    $("#second-btn").attr("src", 'images/arrow-down.png');
    $("#second-p").slideDown(450);
    secondIsClicked = true;
}

function hideSecond() {
    $("#second-btn").attr("src", 'images/arrow-right.png');
    $("#second-p").slideUp(450);
    secondIsClicked = false;
}

function showThird() {
    $("#third-btn").attr("src", 'images/arrow-down.png');
    $("#third-p").slideDown(450);
    thirdIsClicked = true;
}

function hideThird() {
    $("#third-btn").attr("src", 'images/arrow-right.png');
    $("#third-p").slideUp(450);
    thirdIsClicked = false;
}

function showFourth() {
    $("#fourth-btn").attr("src", 'images/arrow-down.png');
    $("#fourth-p").slideDown(450);
    fourthIsClicked = true;
}

function hideFourth() {
    $("#fourth-btn").attr("src", 'images/arrow-right.png');
    $("#fourth-p").slideUp(450);1
    fourthIsClicked = false;
}



$(document).ready(function () {
    $("#first-btn").click(function() {

        if(firstIsClicked) { // If paragraph is showing, hide it
            hideFirst();

        } else {             // If paragraph is hiding, show it, and hide the adjacent paragraph
            hideSecond();
            showFirst();
        }
    });


    $("#second-btn").click(function() {

        if(secondIsClicked) {
            hideSecond();

        } else {
            hideFirst();
            showSecond();
        }
    });

    $("#third-btn").click(function() {

        if(thirdIsClicked) {
            hideThird();

        } else {
            hideFourth();
            showThird();
        }
    });

    $("#fourth-btn").click(function() {

        if(fourthIsClicked) {
            hideFourth();

        } else {
            hideThird();
            showFourth();
        }
    });

});