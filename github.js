class GitHubAPI {
  constructor() {
    this.token = '[token]'
    this.repoCount = 5;
    this.repoOrder = 'created: asc';
  }
  async getUser(userName) {
    const profileResponse = await fetch(`https://api.github.com/users/${userName}`);
    
    const repoResponse = await fetch(`https://api.github.com/users/${userName}/repos?per_page=${this.repoCount}&sort=${this.repoOrder}`);
    
    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    return {
      profile: profile,
      repos: repos
    }
  }
}