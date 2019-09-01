// Accept: application/vnd.github.v3+json

const usersDiv = document.getElementById("user-list")
const reposDiv = document.getElementById("repos-list")


const config = {
  headers: {
    "Accept": "application/vnd.github.v3+json"
  }
}

// USER SEARCH ENDPOINT //
const form = document.getElementById("github-form")

form.addEventListener("submit", (e) => {
  e.preventDefault()
  formInput = e.target.children[0].value
  console.log("form input: ", formInput)

  fetch(`https://api.github.com/search/users?q=${formInput}`, config)
  .then(response => response.json())
  .then(getUserSearchResults)
})

function getUserSearchResults(userList) {
  usersDiv.innerText = ""

  userList.items.forEach((user) => {
    //console.dir(user)

    // GIVE DIV ID AND DISPLAY USERNAME
    const userDiv = document.createElement("div")
    userDiv.id = `id-${user.id}`
    userDiv.innerText = `User: ${user.login}`
    userDiv.style = "font-size: 20px;"

    // ADD A LINE BREAK
    const br = document.createElement("br")
    userDiv.appendChild(br)

    // DISPLAY AVATAR
    const userAvatarImg = document.createElement("img")
    userAvatarImg.src = user.avatar_url
    userAvatarImg.length = 250; userAvatarImg.width = 250;
    userDiv.appendChild(userAvatarImg)

    // ADD PROFILE LINK TO USER DIV
    userDiv.innerHTML += `<p><a href="${user.html_url}" />PROFILE</p>`

    // ADD 'REPO' P TAG
    const repoP = document.createElement("p")
    repoP.class = "js-user-repo"
    //console.dir(repoP)
    repoP.innerText = "REPO"
    userDiv.appendChild(repoP)

    // ADD USER TO DIV
    usersDiv.appendChild(userDiv)
    const outerBr = document.createElement("br")
    usersDiv.appendChild(outerBr)
  })
}

// DELEGATE EVENT LISTENER TO 'repoP'
usersDiv.addEventListener("click", (e) => {
  const repoP = usersDiv.querySelector(".js-user-repo")
  if (e.target.class === "js-user-repo") {
    makeRepoFetch()
  }

})

function makeRepoFetch() {
  // User Repos Endpoint
  fetch("https://api.github.com/users/octocat/repos", config)
  .then(response => response.json())
  .then(getRepoSearchResults)
}

function getRepoSearchResults(data) {
  console.log("repo endpoint: ", data)
  const repoDiv = document.createElement("div")
  repoDiv.innerText = "repo data will go here"
  reposDiv.appendChild(repoDiv)

}
