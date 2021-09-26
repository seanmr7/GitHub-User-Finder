class UIManagement {
  constructor() {
    this.profileDiv = document.getElementById('profile');
  }

  displayProfile(profile) {
    // Create card container for profile information
    const container = document.createElement('div');
    container.classList.add('container', 'card', 'card-body');

    // Create row and columns
    const row = document.createElement('div')
    row.classList.add('row', 'align-items-center');

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('col-md-4', 'text-center');
    const rightDiv = document.createElement('div');
    rightDiv.classList.add('col-md-8', 'text-left', 'align-self-start');

    // Create elements for left side of profile
    const profilePic = document.createElement('img');
    profilePic.classList.add('mb-2');
    profilePic.height = '329';
    profilePic.width = '329';
     
    profilePic.src = (profile.avatar_url === 'undefined') ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' : profile.avatar_url;

    const profileLink = document.createElement('a')
    profileLink.href = `https://github.com/${profile.login}`;
    profileLink.innerText = 'Visit Profile'
    profileLink.classList.add('btn', 'btn-primary', 'w-100');

    // Append profile picture and link tp left div
    leftDiv.appendChild(profilePic);
    leftDiv.appendChild(profileLink);

    // Create elements for right side of profile
    // Create a horizontal list for repos, gists, followers, and following
    const horizontalList = document.createElement('ul')
    horizontalList.classList.add('list-group-horizontal', 'ps-0')
    
    const publicRepo = document.createElement('li')
    publicRepo.classList.add('btn', 'btn-primary', 'me-2');
    publicRepo.innerText = `Public Repos: ${profile.public_repos}`;

    const publicGist = document.createElement('li')
    publicGist.classList.add('btn', 'btn-secondary', 'me-2');
    publicGist.innerText = `Public Gists: ${profile.public_gists}`;

    const followers = document.createElement('li')
    followers.classList.add('btn', 'btn-info', 'me-2');
    followers.innerText = `Followers: ${profile.followers}`;

    const following = document.createElement('li')
    following.classList.add('btn', 'btn-success', 'me-2');
    following.innerText = `Following: ${profile.following}`;

    horizontalList.appendChild(publicRepo);
    horizontalList.appendChild(publicGist);
    horizontalList.appendChild(followers);
    horizontalList.appendChild(following);

    // Create vertical list for company, personal website, location, and sign up date
    const verticalList = document.createElement('ul');
    verticalList.classList.add('list-group');

    const company = document.createElement('li');
    company.classList.add('list-group-item');
    company.innerText = `Company: ${profile.company}`;
    
    const website = document.createElement('li');
    website.classList.add('list-group-item');
    website.innerText = `Website: ${profile.website}`;

    const location = document.createElement('li');
    location.classList.add('list-group-item');
    location.innerText = `Location: ${profile.location}`;

    const createdDate = document.createElement('li');
    createdDate.classList.add('list-group-item');
    createdDate.innerText = `Member Since: ${new Date(profile.created_at)}`;

    verticalList.appendChild(company);
    verticalList.appendChild(website);
    verticalList.appendChild(location);
    verticalList.appendChild(createdDate);

    // Append right side of profile with elements
    rightDiv.appendChild(horizontalList);
    rightDiv.appendChild(verticalList);

    // Append left and right sides to row then row to container and profile.
    row.appendChild(leftDiv);
    row.appendChild(rightDiv);
    container.appendChild(row);

    this.profileDiv.appendChild(container);  
  }

  displayRepos(repos) {
    const container = document.createElement('div');
    container.classList.add('container', 'mt-4');
    const header = document.createElement('h3');
    header.innerText = 'Latest Repos';
    const repoList = document.createElement('ul');
    repoList.classList.add('list-group', 'list-group-flush')

    repos.forEach(repo => {
      const repoListItem = document.createElement('li');
      repoListItem.classList.add('list-group-item', 'mt-3');

      const row = document.createElement('row');
      row.classList.add('row');

      const repoName = document.createElement('h4');
      repoName.classList.add('col-md-6');
      repoName.innerText = repo.name;

      const ul = document.createElement('ul');
      ul.classList.add('list-group-horizontal', 'col-md-6')

      const repoStar = document.createElement('div');
      repoStar.classList.add('bg-primary', 'badge', 'p-2', 'me-1');
      repoStar.innerText = `Stars: ${repo.stargazers_count}`;

      const repoWatch = document.createElement('div');
      repoWatch.classList.add('bg-success', 'badge', 'p-2', 'me-1');
      repoWatch.innerText = `Watchers: ${repo.watchers_count}`;

      const repoFork = document.createElement('div');
      repoFork.classList.add('bg-warning', 'badge', 'p-2', 'me-1');
      repoFork.innerText = `Forks: ${repo.forks}`;

      ul.appendChild(repoStar);
      ul.appendChild(repoWatch);
      ul.appendChild(repoFork);

      row.appendChild(repoName);
      row.appendChild(ul);

      repoListItem.appendChild(row);

      repoList.appendChild(repoListItem);
    });
    container.appendChild(header);
    container.appendChild(repoList);
    this.profileDiv.appendChild(container);
  }

  emptyProfile() {
    while(this.profileDiv.firstChild) {
      this.profileDiv.removeChild(this.profileDiv.firstChild) 
    }
  }

  noUserFound(userName) {
    const messageDiv = document.createElement('h4');
    messageDiv.classList.add('bg-danger', 'text-center', 'text-light');
    messageDiv.innerText = `User: ${userName} was not found`;
    this.profileDiv.prepend(messageDiv);

    // Clear alert
    setTimeout(() => {
      this.profileDiv.removeChild(messageDiv);
    }, 3000);
  }
}