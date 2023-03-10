$(document).ready(function () {
    // Purchase Buttons
    function purchaseButton(section) {
        $("section.services").css("display", "none"); // Hide Section with all the cards
        $(section).css("display", "block");           // Show the appropriate section with the appropriate axolotl to buy
    }

    $("div.card-one h3.buy-button").click(function () {purchaseButton("section.section-one");});

    $("div.card-two h3.buy-button").click(function () {purchaseButton("section.section-two");});
    
    $("div.card-three h3.buy-button").click(function () {purchaseButton("section.section-three");});

    $("div.card-four h3.buy-button").click(function () {purchaseButton("section.section-four");});

    $("div.card-five h3.buy-button").click(function () {purchaseButton("section.section-five");});

    // Random Button
    $("div.card-six h3.buy-button").click(function () {
        let choice = Math.floor(Math.random() * 5) + 1;
        console.log(choice);

        switch(choice) { // Display a certain section depending on random number generated
            case 1:
                $("section.section-one").css("display", "block");
                break;
            case 2:
                $("section.section-two").css("display", "block");
                break;
            case 3:
                $("section.section-three").css("display", "block");
                break;
            case 4:
                $("section.section-four").css("display", "block");
                break;
            case 5:
                $("section.section-five").css("display", "block");
                break;
        }
        $("section.services").css("display", "none");
    });
    
    // Back Button
    $(".back-button").click(function () {
        $("section.services").css("display", "block");
    
        $("section.section-one").css("display", "none");
        $("section.section-two").css("display", "none");
        $("section.section-three").css("display", "none");
        $("section.section-four").css("display", "none");
        $("section.section-five").css("display", "none");
        $("section.section-six").css("display", "none");
    });

    function backButton(section, type) {
        alert("Successfully ordered " + type + "\nThank you for adopting from Adopt-a-lotl!")
        
        $("section.services").css("display", "block");
        $(section).css("display", "none");
    }

    // Buy Now Buttons
    $("h2.buy-now-button-one").click(function () {
        backButton("section.section-one", "Leucistic Axolotl");
    });
    
    $("h2.buy-now-button-two").click(function () {
        backButton("section.section-two", "Xanthic Axolotl");
    });
    
    $("h2.buy-now-button-three").click(function () {
        backButton("section.section-three", "Golden Albino Axolotl");
    });

    $("h2.buy-now-button-four").click(function () {
        backButton("section.section-four", "Albino Axolotl");
    });
    
    $("h2.buy-now-button-five").click(function () {
        backButton("section.section-five", "Wild Brown Axolotl");
    });    
});











