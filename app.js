document.addEventListener("DOMContentLoaded", () => {

    fetch("jobs.json")
    .then(response => response.json())
    .then(jobs => {

        displayJobs(jobs);
        updateDashboard(jobs);

    })
    .catch(error => {

        console.error("Error loading jobs:", error);

        document.getElementById("jobsContainer").innerHTML =
        "<p>Unable to load jobs.</p>";

    });

});

function displayJobs(jobs){

    const jobsContainer =
    document.getElementById("jobsContainer");

    jobsContainer.innerHTML = "";

    const qualifications =
    JSON.parse(
        localStorage.getItem("qualifications")
    ) || [];

    const filteredJobs =
    jobs.filter(job => {

        return qualifications.some(q =>
            job.qualification.includes(q)
        );

    });

    filteredJobs.forEach(job => {

        const card =
        document.createElement("div");

        card.className = "job-card";

        card.innerHTML = `
            <div class="job-title">
                ${job.title}
            </div>

            <div class="badge">
                🎯 Matches Your Profile
            </div>

            <div class="job-meta">
                ${job.category}
            </div>

            <div class="job-meta">
                Qualification:
                ${job.qualification.join(", ")}
            </div>

            <div class="job-meta">
                ⏳ ${job.daysLeft} Days Left
            </div>

            <button
                class="view-btn"
                onclick="viewDetails(${job.id})">

                View Details

            </button>
        `;

        jobsContainer.appendChild(card);

    });

    document.getElementById("matchCount").textContent =
    filteredJobs.length;

}

function updateDashboard(jobs){

    document.getElementById("importantCount").textContent =
    jobs.filter(job => job.important).length;

    document.getElementById("closingCount").textContent =
    jobs.filter(job => job.daysLeft <= 7).length;

    document.getElementById("examCount").textContent =
    jobs.filter(job => job.exam).length;

}

function viewDetails(id){

    localStorage.setItem(
        "selectedJob",
        id
    );

    window.location.href =
    "job.html";

}