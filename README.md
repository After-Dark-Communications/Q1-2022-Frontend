# Q1-2022-Frontend

GIT: Make sure you work on feature branch.

- git checkout develop
- git pull origin develop
- git checkout -b feature/feat-name
- git add
- git commit 
- git checkout develop
- git pull origin develop
- git checkout feature/feat-name
- git rebase develop
- git push origin -f feature/feat-name
- Create pull request

## What this steps mean:
We should not work on the master branch as it is connected to the CI/CD, so any updates on master branch will trigger updates on the actual application.
So the work should be done on the develop branch. Only one person should merge the develop into master after making sure everything works and is good to go. 

Example: Task is to update the header title
So first thing will be branching of the develop branch to a intuitive named branch : git checkout -b feature/update-header
Make the udpates, add and commit them to the feature branch.
Next step would be rebasing the develop branch. But to avoid further conflicts, checkout back to develop and pull origin, to make sure we are on the latest updates on the develop branch. 
Now it's time to rebase, so checkout back to the feature branch, and rebase develop. 
Fix any conflicts if are present, and then push the feature branch. 
Make sure to use the -f tag, as we are forcing the push after rebase.
Go to github repository and create a pull request.
