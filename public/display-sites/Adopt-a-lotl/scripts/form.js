const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"})

$(document).ready(function() {

    // Disables submitting the form with the Enter key
    $(".my-form").keydown(function(event) { 
        return event.key != "Enter";
    });
    

    /**
     * Calculates price of the axolotl, and updates the paragraph in real time
     * 
     * @param defaultPrice default price of axolotl in format <code>xx.xx</code>
     * @param axolotl number index of the axolotl from 0-4 (ended up only needing for debuging)
     * @param formID HTML ID of form
     * @param checkboxID HTML ID of the checkbox
     * @param elementID HTML ID of the p that holds the price
     * @returns the price of the element, applied taxes and handling, and formatted using Intl.NumberFormat object.
     */
    function calcPrice(defaultPrice, axolotl, formID, checkboxID, elementID) {
        let form = $(formID).serializeArray(); // grabs stuff from the form
        let price = defaultPrice;              // set starting price to defined default price

        console.log(`${axolotl}, ${form}`);
        console.table(form);
        
        if(form[0]["value"] > 0 && form[0]["value"] <= 3) { // Pos and non-zero
            price *= form[0]["value"];                      // Multiply the price for each axolotl in the numbers form
        }

        if($(checkboxID).prop("checked")) { // if the checkbox is checked, add 5 dollars to the price
            price += 5;
        }

        price += 8.95 // shipping fee
        price *= 1.13 // sales tax

        // Change the HTML of the p element to reflect the projected price
        $(elementID).html("Total cost: <b>" + CURRENCY_FORMATTER.format(price) + "</b>");
    }




    // Updating the total cost
    $("#extra-food-one").change(function() { // When checkbox is clicked
        calcPrice(29.99, 0, "#form-one", "#extra-food-one", "p.buynow-price-one")});

    $("#form-one").keyup(function() { // When you're typing (on key lift)
        calcPrice(29.99, 0, "#form-one", "#extra-food-one", "p.buynow-price-one");});


    $("#extra-food-two").change(function() {
        calcPrice(45.99, 1, "#form-two", "#extra-food-two", "p.buynow-price-two");});

    $("#form-two").keyup(function() {
        calcPrice(45.99, 1, "#form-two", "#extra-food-two", "p.buynow-price-two");});


    $("#extra-food-three").change(function() {
        calcPrice(39.99, 2, "#form-three", "#extra-food-three", "p.buynow-price-three");});

    $("#form-three").keyup(function() {
        calcPrice(39.99, 2, "#form-three", "#extra-food-three", "p.buynow-price-three");});


    $("#extra-food-four").change(function() {
        calcPrice(39.99, 3, "#form-four", "#extra-food-four", "p.buynow-price-four");});

    $("#form-four").keyup(function() {
        calcPrice(39.99, 3, "#form-four", "#extra-food-four", "p.buynow-price-four");});

    
    $("#extra-food-five").change(function() {
        calcPrice(59.99, 4, "#form-five", "#extra-food-five", "p.buynow-price-five");});

    $("#form-five").keyup(function() {
        calcPrice(59.99, 4, "#form-five", "#extra-food-five", "p.buynow-price-five");});

});

