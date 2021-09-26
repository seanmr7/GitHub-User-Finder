// Define variables from UI
const searchBarUI = document.getElementById('searchUser');

// Add event listeners
searchBarUI.addEventListener('keyup', searchUser);

function searchUser(e) {
  const searchText = e.target.value;
  const gitHub = new GitHubAPI();
  const ui = new UIManagement();

  if(searchText === '') {
    // Empty profile when no name is search
    ui.emptyProfile();
  } else {
    
    gitHub.getUser(searchText)
          .then(data => {
            if(data.profile.message === 'Not Found') {
              // Show message profile was not found
              ui.noUserFound(searchText);
            } else {
              ui.emptyProfile();
              ui.displayProfile(data.profile);
              ui.displayRepos(data.repos);
            }
          })
          .catch(err => console.log(err.message)); 
  }
}