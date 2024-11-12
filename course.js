// const URL="https://qrattendance-ucs0.onrender.com/api/v1/professors/getMyInstructedCourses?email=alka@iiitr.ac.in";
// // const detailPara=document.querySelector("#detailPara");
// const search=document.querySelector(".search-input");
// const btn=document.querySelector("#submit");

// const dropdowns=document.querySelectorAll(".search-select");

// for(let select of dropdowns)
// {
// for(sub in subject){
//    let newOption=document.createElement("option");
//    newOption.innerText=sub;
//    newOption.value=sub;
//    if(sub==="All")
//    {
//     newOption.selected=true;
//    }
//    select.append(newOption);
// }
// if (select.selectedIndex >= 0) {
//     searchInput.placeholder = select.options[select.selectedIndex].text;
// }
// select.addEventListener("change", evt=>{
//     updateSub(evt.target);
//     // search.innerText=newOption;
// });
// }

// searchInput.placeholder = "All";

// select.addEventListener("change", function(evt) {
//     const selectedValue = this.value;
//     searchInput.placeholder = selectedValue;
// });

// const updateSub=(element)=>{
//     let selectedText = element.options[element.selectedIndex].text;
//     searchInput.placeholder = selectedText;
//     searchInput.value = selectedText;
// };
// search.setAttribute("placeholder", search.options[search.selectedIndex].text);

// btn.addEventListener("click",( evt)=>{
//     evt.preventDefault();
//     // let choice = document.querySelector("form input")
// });

// // const get_details = async () => {
// //     console.log("getting data.....");
// //     let response = await fetch(URL);
// //     console.log(response);    
// //     let data = await response.json();
// //     detailPara.innerText=data[0].courses;

// //     // try {
// //     //     console.log("Fetching data...");
        
// //     //     // Make the fetch request
// //     //     let response = await fetch(URL);
        
// //     //     // Check if the response status is OK (status code 200–299)
// //     //     if (!response.ok) {
// //     //         throw new Error(`HTTP error! Status: ${response.status}`);
// //     //     }
        
// //     //     // Parse the JSON data from the response
// //     //     let data = await response.json();
        
// //     //     // Log the data to see its structure
// //     //     console.log("Data received:", data);
        
// //     //     // Check if data is an array and if it has a 'text' field in the first element
// //     //     if (Array.isArray(data) && data.length > 0 && data[0].text) {
// //     //         detailPara.innerText = data[0].text;
// //     //     } else {
// //     //         detailPara.innerText = "No details available.";
// //     //     }
// //     // } catch (error) {
// //     //     // Log the error and display a user-friendly message
// //     //     console.error("Error fetching data:", error);
// //     //     detailPara.innerText = "Error fetching details.";
// //     // }
// // };
// // // }

// // btn.addEventListener("click", get_details);






const URL = "https://qrattendance-ucs0.onrender.com/api/v1/professors/getMyInstructedCourses?email=alka@iiitr.ac.in";
const searchInput = document.querySelector(".search-input");
const btn = document.querySelector("#submit");
const select = document.querySelector(".search-select");

const userEmail =  "alka@iiitr.ac.in";

const userId = "testuser";
const password = "12345";

async function initializePage() {
    try {
        // Fetch course data first
        const response = await fetch(URL);
        const data = await response.json();
        console.log(data);
        
        // Clear existing options
        select.innerHTML = '<option>All</option>';

        // Create an object to store subjects
        const teacherSubjects = {};
        
        // Populate subjects from API response
        data.courses.forEach(course => {
            teacherSubjects[course.subject] = course.subject;
        });

        // Add options to dropdown
        for(let sub in teacherSubjects) {
            let newOption = document.createElement("option");
            newOption.textContent = teacherSubjects[sub];
            newOption.value = teacherSubjects[sub];
            select.appendChild(newOption);
        }

        // Update course boxes
        data.courses.forEach(course => {
            // Find the corresponding course box
            const courseBox = document.querySelector(`.${course.subject}.box`);
            
            if (courseBox) {
                // Make the course box visible
                courseBox.style.display = 'block';
                
                // Update course code
                const codeDiv = courseBox.querySelector('.course-code.option');
                if (codeDiv) {
                    codeDiv.innerHTML = `
                        <ul>
                            <li id="title"><p>Code</p></li>
                            <li id="data"><p>${course.courseCode}</p></li>
                        </ul>
                    `;
                }

                // Update batch
                const batchDiv = courseBox.querySelector('.batch.option');
                if (batchDiv) {
                    batchDiv.innerHTML = `
                        <ul>
                            <li id="title"><p>Batch</p></li>
                            <li id="data"><p>${course.batch}</p></li>
                        </ul>
                    `;
                }

                // Update credits
                const creditsDiv = courseBox.querySelector('.credits.option');
                if (creditsDiv) {
                    creditsDiv.innerHTML = `
                        <ul>
                            <li id="title"><p>Credit</p></li>
                            <li id="data"><p>${course.credits}</p></li>
                        </ul>
                    `;
                }
            }
        });

        // Hide course boxes that aren't in the API response
        const allCourseBoxes = document.querySelectorAll('.box');
        allCourseBoxes.forEach(box => {
            const subject = box.querySelector('h2').textContent.trim();
            if (!teacherSubjects[subject]) {
                box.style.display = 'none';
            }
        });

    } catch (error) {
        console.error("Error fetching course data:", error);
        // Display error message
        const container = document.querySelector('.options');
        container.innerHTML = '<p>Error loading course data. Please try again later.</p>';
    }
}

// Set initial placeholder
searchInput.placeholder = "All";

// Update input placeholder when dropdown changes
select.addEventListener("change", function() {
    searchInput.placeholder = this.value;
});

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    // Add your search functionality here
});

// Check if user is logged in
if (!userEmail) {
    // if (!userId || !password) {
    window.location.href = 'sign_in.html';
} else {
    console.log("hello");
    initializePage();
}

// Clear existing options in dropdown except 'All'
// select.innerHTML = '<option>All</option>';

// // Add options from subject object
// for(let sub in subject) {
//     let newOption = document.createElement("option");
//     newOption.textContent = subject[sub];
//     newOption.value = subject[sub];
//     select.appendChild(newOption);
// }

// // Set initial placeholder to "All"
// searchInput.placeholder = "All";

// // Update input placeholder when dropdown changes
// select.addEventListener("change", function() {
//     const selectedValue = this.value;
//     searchInput.placeholder = selectedValue;
// });

// async function fetchCourseData() {
//     try {
//         const response = await fetch(URL);
//         const data = await response.json();
        
//         // Loop through each course in the response
//         data.courses.forEach(course => {
//             // Find the corresponding course box
//             const courseBox = document.querySelector(`.${course.subject.toLowerCase()}.box`);
            
//             if (courseBox) {
//                 // Update course code
//                 const codeDiv = courseBox.querySelector('.course-code.option');
//                 if (codeDiv) {
//                     codeDiv.innerHTML = `
//                         <ul>
//                             <li id="title"><p>Code</p></li>
//                             <li id="data"><p>${course.courseCode}</p></li>
//                         </ul>
//                     `;
//                 }

//                 // Update batch
//                 const batchDiv = courseBox.querySelector('.batch.option');
//                 if (batchDiv) {
//                     batchDiv.innerHTML = `
//                         <ul>
//                             <li id="title"><p>Batch</p></li>
//                             <li id="data"><p>${course.batch}</p></li>
//                         </ul>
//                     `;
//                 }

//                 // Update credits
//                 const creditsDiv = courseBox.querySelector('.credits.option');
//                 if (creditsDiv) {
//                     creditsDiv.innerHTML = `
//                         <ul>
//                             <li id="title"><p>Credit</p></li>
//                             <li id="data"><p>${course.credits}</p></li>
//                         </ul>
//                     `;
//                 }
//             }
//         });
//     } catch (error) {
//         console.error("Error fetching course data:", error);
//     }
// }

// // Call the function when page loads
// fetchCourseData();

// btn.addEventListener("click", (evt) => {
//     evt.preventDefault();
// });