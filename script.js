const usernameInput = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchBtn");

const profileCard = document.getElementById("profileCard");
const avatar = document.getElementById("avatar");
const name = document.getElementById("name");
const username = document.getElementById("username");
const bio = document.getElementById("bio");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const profileLink = document.getElementById("profileLink");

async function getGitHubUser(user) {
    try {
        const response = await fetch(`https://api.github.com/users/${user}`);

        if (!response.ok) {
            throw new Error("User not found!");
        }

        const data = await response.json();
        avatar.src = data.avatar_url;
        name.innerText = data.name || data.login;
        username.innerText = `@${data.login}`;
        bio.innerText = data.bio || "No bio available.";
        repos.innerText = data.public_repos;
        followers.innerText = data.followers;
        following.innerText = data.following;
        profileLink.href = data.html_url;
        profileCard.style.display = "block";

    } catch (error) {
        alert("GitHub user nahi mila!");
        profileCard.style.display = "none";
        console.log(error);
    }
}
searchBtn.addEventListener("click", function () {
    const user = usernameInput.value.trim();
    if (user !== "") {
        getGitHubUser(user);
    } else {
        alert("Please give your username!");
    }
});