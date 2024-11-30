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


document.addEventListener("DOMContentLoaded", function() {
  const H_values = [2.2, 3, 4.5, 6, 8, 10]; // Array of H values

  // Function to show content based on the clicked link
  function showContent(contentId) {
      const contents = document.querySelectorAll('.content');
      contents.forEach((content) => {
          content.style.display = 'none'; // Hide all sections
      });

      const selectedContent = document.getElementById(contentId);
      if (selectedContent) {
          selectedContent.style.display = 'block'; // Show the selected content
      }
  }

  // Function to show the selected content based on menu item clicked
  window.showValues = function(W_value) {
      const container = document.getElementById('values-container');
      container.innerHTML = ''; // Clear previous content

      // Loop through each H value and create content dynamically
      H_values.forEach(H => {
          const valueContainer = document.createElement('div');
          valueContainer.classList.add('value-container');

          const valueLabel = document.createElement('span');
          valueLabel.classList.add('value-label');

          // Use LaTeX for H and W
          valueLabel.innerHTML = `\\( \\mathcal{H}=${H} \\)`;  // For H
          valueContainer.appendChild(valueLabel);

          const imageContainer = document.createElement('div');
          imageContainer.classList.add('image-container');

          const img = document.createElement('img');
          img.classList.add('value-image');
          img.src = `./images/t50_H${H}_W${W_value}.png`; // File name format with "t50"
          img.alt = `H=${H}, W=${W_value}`;

          // Lazy load the image using Intersection Observer
          const observer = new IntersectionObserver((entries, observer) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      entry.target.src = entry.target.dataset.src; // Set the data-src to the src attribute
                      observer.unobserve(entry.target); // Stop observing the image once it's loaded
                  }
              });
          }, { threshold: 0.1 }); // Trigger when 10% of the image is in view

          img.dataset.src = img.src; // Store the src in data-src
          img.src = ''; // Initially set src to empty

          imageContainer.appendChild(img);
          valueContainer.appendChild(imageContainer);
          container.appendChild(valueContainer);

          // Start observing the image
          observer.observe(img);
      });

      // Re-render LaTeX with MathJax
      MathJax.typeset();  // Reprocess math expressions

      // Highlight the clicked menu item
      const menuItems = document.querySelectorAll('.menu-bar ul li');
      menuItems.forEach(item => {
          item.classList.remove('selected'); // Remove "selected" class from all items
      });

      // Add the "selected" class to the clicked W value item
      const selectedItem = document.querySelector(`.menu-bar ul li a[data-w-value="${W_value}"]`);
      if (selectedItem) {
          selectedItem.parentElement.classList.add('selected'); // Add class to the clicked item
      }
  };

  // Event listener for the menu items
  const menuItems = document.querySelectorAll('.menu-bar ul li a');
  menuItems.forEach(item => {
      item.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent default action of the link
          const W_value = this.getAttribute('data-w-value');
          showValues(W_value);
      });
  });

  // Initial content setup
  showContent('dashboard'); // Initially display the dashboard section
});


// Hide all content sections on page load (this logic is repeated, and can be simplified)
document.addEventListener('DOMContentLoaded', function () {
  const contents = document.querySelectorAll('.content');
  contents.forEach((content) => {
      content.style.display = 'none'; // Hide all sections when the page loads
  });
});
