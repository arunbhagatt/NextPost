document.addEventListener("DOMContentLoaded", () => {

fetch("jobs.json")
.then(response => response.json())
.then(data => {

    displayJobs(data);
    updateDashboard(data);

})
.catch(error => {

    console.error("Error loading data:", error);

    document.getElementById("jobsContainer").innerHTML =
    "<p>Unable to load data.</p>";

});

});

function displayJobs(data){

const jobsContainer =
document.getElementById("jobsContainer");

const admitCardsContainer =
document.getElementById("admitCardsContainer");

const resultsContainer =
document.getElementById("resultsContainer");

const answerKeysContainer =
document.getElementById("answerKeysContainer");

jobsContainer.innerHTML = "";
admitCardsContainer.innerHTML = "";
resultsContainer.innerHTML = "";
answerKeysContainer.innerHTML = "";

const qualifications =
JSON.parse(
    localStorage.getItem("qualifications")
) || [];

const jobs =
data.filter(item =>
    item.type === "job"
);

const filteredJobs =
jobs.filter(job =>
    qualifications.some(q =>
        job.qualifications.includes(q)
    )
);

filteredJobs.forEach(job => {

    jobsContainer.innerHTML += `
    <div class="job-card">

        <div class="job-title">
            ${job.title}
        </div>

        <div class="badge">
            🎯 Matches Your Profile
        </div>

        <div class="job-meta">
            ${job.organization}
        </div>

        <div class="job-meta">
            Qualification:
            ${job.qualifications.join(", ")}
        </div>

        <div class="job-meta">
            ⏳ ${job.daysLeft} Days Left
        </div>

        <button
        class="view-btn"
        onclick="viewDetails(${job.id})">

            View Details

        </button>

    </div>
    `;

});

data
.filter(item =>
    item.type === "admit-card"
)
.forEach(item => {

    admitCardsContainer.innerHTML += `
    <div class="job-card">

        <div class="job-title">
            ${item.title}
        </div>

        <div class="job-meta">
            ${item.organization}
        </div>

    </div>
    `;

});

data
.filter(item =>
    item.type === "result"
)
.forEach(item => {

    resultsContainer.innerHTML += `
    <div class="job-card">

        <div class="job-title">
            ${item.title}
        </div>

        <div class="job-meta">
            ${item.organization}
        </div>

    </div>
    `;

});

data
.filter(item =>
    item.type === "answer-key"
)
.forEach(item => {

    answerKeysContainer.innerHTML += `
    <div class="job-card">

        <div class="job-title">
            ${item.title}
        </div>

        <div class="job-meta">
            ${item.organization}
        </div>

    </div>
    `;

});

document.getElementById("matchCount").textContent =
filteredJobs.length;

}

function updateDashboard(data){

const jobs =
data.filter(item =>
    item.type === "job"
);

document.getElementById("importantCount").textContent =
jobs.filter(job =>
job.important).length;

document.getElementById("closingCount").textContent =
jobs.filter(job =>
job.daysLeft <= 7).length;

document.getElementById("examCount").textContent =
jobs.length;

}

function viewDetails(id){

localStorage.setItem(
    "selectedJob",
    id
);

window.location.href =
"job.html";

}
