// Function to show content based on the clicked link
function showContent(contentId) {
    // Hide all content sections
    const contents = document.querySelectorAll('.content');
    contents.forEach((content) => {
        content.style.display = 'none'; // Hide all sections
    });

    // Show the selected content section
    const selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = 'block'; // Show the selected content
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const H_values = [2.2, 3.0, 4.5, 6, 8, 10]; // Array of H values
    const W_values = [0.5, 0.6, 0.8, 1.0, 1.2, 1.5, 2.0, 2.5, 3.0, 4.0]; // Array of W values
    const times = [10, 50, 100]; // Array of time options
    let selectedTime = 50; // Default time
    let selectedVariable = "H"; // Track whether we are comparing by H or W
    // Function to clear the figures
    function clearFigures() {
        const container = document.getElementById("values-container");
        container.innerHTML = ""; // Clear all content in the container
    }

    // Function to show figures for a selected W value
    window.showValuesForW = function (W_value) {
        clearFigures();
        const container = document.getElementById("values-container");

        // Highlight the selected W value
        document.querySelectorAll(".w-value").forEach((item) => {
            item.classList.remove("selected");
        });
        document.querySelector(`.w-value[data-w-value="${W_value}"]`).classList.add("selected");

        H_values.forEach((H) => {
            const valueContainer = document.createElement("div");
            valueContainer.classList.add("value-container");

            const valueLabel = document.createElement("span");
            valueLabel.classList.add("value-label");
            valueLabel.innerHTML = `\\( \\mathcal{H} = ${H} \\)`;
            valueContainer.appendChild(valueLabel);

            const imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");

            const img = document.createElement("img");
            img.classList.add("value-image");
            img.src = `./images/t${selectedTime}_H${H}_W${W_value}.png`;
            img.alt = `H=${H}, W=${W_value}`;
            imageContainer.appendChild(img);

            valueContainer.appendChild(imageContainer);
            container.appendChild(valueContainer);
        });

        MathJax.typeset(); // Re-render LaTeX
    };

    // Function to show figures for a selected H value
    window.showValuesForH = function (H_value) {
        clearFigures();
        const container = document.getElementById("values-container");

        // Highlight the selected H value
        document.querySelectorAll(".h-value").forEach((item) => {
            item.classList.remove("selected");
        });
        document.querySelector(`.h-value[data-height-value="${H_value}"]`).classList.add("selected");

        W_values.forEach((W) => {
            const valueContainer = document.createElement("div");
            valueContainer.classList.add("value-container");

            const valueLabel = document.createElement("span");
            valueLabel.classList.add("value-label");
            valueLabel.innerHTML = `\\( \\mathcal{W} = ${parseFloat(W).toFixed(1)} \\)`;
            valueContainer.appendChild(valueLabel);

            const imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");

            const img = document.createElement("img");
            img.classList.add("value-image");
            img.src = `./images/t${selectedTime}_H${H_value}_W${parseFloat(W).toFixed(1)}.png`;
            img.alt = `H=${H_value}, W=${W}`;
            imageContainer.appendChild(img);

            valueContainer.appendChild(imageContainer);
            container.appendChild(valueContainer);
        });

        MathJax.typeset(); // Re-render LaTeX
    };

    // Function to update the selected time
    window.updateTime = function (time) {
        selectedTime = time;
        clearFigures(); // Clear figures when switching times
    };

    // Add event listeners for time selection
    document.querySelectorAll(".time-option").forEach((button) => {
        button.addEventListener("click", function () {
            const time = parseInt(this.getAttribute("data-time"), 10); // Fixed base to 10
            updateTime(time);

            // Highlight the selected time button
            document.querySelectorAll(".time-option").forEach((btn) => btn.classList.remove("selected"));
            this.classList.add("selected");

            // Re-render based on the selected time and the selected variable (H or W)
            if (selectedVariable === "W") {
                const currentWValue = document.querySelector(".w-value.selected")?.getAttribute("data-w-value");
                if (currentWValue) {
                    showValuesForW(currentWValue); // Show figures based on W
                }
            } else if (selectedVariable === "H") {
                const currentHValue = document.querySelector(".h-value.selected")?.getAttribute("data-height-value");
                if (currentHValue) {
                    showValuesForH(currentHValue); // Show figures based on H
                }
            }

        });
    });

    // Toggle menu visibility for W
    const toggleMenuButton = document.getElementById("toggle-menu");
    toggleMenuButton.addEventListener("click", function () {
        const menu = document.getElementById("menu-bar");
        const menuH = document.getElementById("menu-bar-H");

        clearFigures(); // Clear current figures
        menuH.style.display = "none"; // Hide the H menu
        menu.style.display = menu.style.display === "none" ? "block" : "none"; // Toggle W menu
        selectedVariable = "W";
    });

    // Toggle menu visibility for H
    const toggleMenuHButton = document.getElementById("toggle-menu-H");
    toggleMenuHButton.addEventListener("click", function () {
        const menu = document.getElementById("menu-bar");
        const menuH = document.getElementById("menu-bar-H");

        clearFigures(); // Clear current figures
        menu.style.display = "none"; // Hide the W menu
        menuH.style.display = menuH.style.display === "none" ? "block" : "none"; // Toggle H menu
        selectedVariable = "H";
    });

    // Add event listeners for W selection
    document.querySelectorAll(".w-value").forEach((item) => {
        item.addEventListener("click", function () {
            const W_value = this.getAttribute("data-w-value");
            showValuesForW(W_value);
        });
    });

    // Add event listeners for H selection
    document.querySelectorAll(".h-value").forEach((item) => {
        item.addEventListener("click", function () {
            const H_value = this.getAttribute("data-height-value");
            showValuesForH(H_value);
        });
    });
});





