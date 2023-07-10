function toggleTab(tabIndex) {
    // Hide all tab contents
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    // Remove 'active' class from all tab buttons
    var tabButtons = document.getElementsByClassName("tab-button");
    for (var i = 0; i < tabButtons.length; i++) {
        // tabButtons[i].classList.remove("active");
    }

    // Show the selected tab content and add 'active' class to the tab button
    var selectedTab = document.getElementById("tab" + tabIndex);
    selectedTab.style.display = "block";
    // tabButtons[tabIndex - 1].classList.add("active");
}