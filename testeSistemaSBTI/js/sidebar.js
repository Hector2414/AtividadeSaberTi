// function toggleSidebar(){

//     document
//         .getElementById("sidebar")
//         .classList
//         .toggle("collapsed");

//     document
//         .getElementById("mainContent")
//         .classList
//         .toggle("expanded");
// }

function toggleSidebar() {

    document
        .getElementById("sidebar")
        .classList
        .toggle("collapsed");

    document
        .querySelector(".main-content")
        .classList
        .toggle("expanded");
}