# GitHub Repository Setup Guide

This guide will help you set up your GitHub repository and push the Islamic Education Portal project to it.

## 1. Creating a GitHub Repository

1. Go to [GitHub](https://github.com/) and sign in to your account
2. Click on the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., "islamic-education-portal")
4. Add a description (optional)
5. Choose whether to make the repository public or private
6. Do NOT initialize the repository with a README, .gitignore, or license (we'll push these from your local project)
7. Click "Create repository"

## 2. Initializing Git in Your Local Project

1. Open your terminal/command prompt
2. Navigate to your project directory
3. Initialize a Git repository:
   ```
   git init
   ```
4. Add the GitHub repository as a remote:
   ```
   git remote add origin https://github.com/username/repository-name.git
   ```
   Replace "username" with your GitHub username and "repository-name" with the name of your GitHub repository

## 3. Adding and Committing Your Files

1. Add all the files to your Git repository:
   ```
   git add .
   ```
2. Commit the changes:
   ```
   git commit -m "Initial commit"
   ```

## 4. Pushing to GitHub

1. Push the code to GitHub:
   ```
   git push -u origin main
   ```
   Note: If your default branch is named "master" instead of "main", use:
   ```
   git push -u origin master
   ```

## 5. Verifying the Upload

1. Go to your GitHub repository in your web browser
2. Refresh the page to see your newly uploaded files
3. Make sure all files have been uploaded correctly

## 6. Setting Up GitHub Pages (Optional)

If you want to deploy your application on GitHub Pages:

1. Go to your repository's "Settings" tab
2. Scroll down to the "GitHub Pages" section
3. Select the "main" branch as the source
4. Click "Save"
5. Your site will be published at `https://username.github.io/repository-name/`

## 7. Ongoing Development

For ongoing development:

1. Always pull the latest changes before starting work:
   ```
   git pull origin main
   ```
2. Create a new branch for each feature or bugfix:
   ```
   git checkout -b feature/new-feature-name
   ```
3. Make your changes, then add and commit them:
   ```
   git add .
   git commit -m "Description of changes"
   ```
4. Push your branch to GitHub:
   ```
   git push origin feature/new-feature-name
   ```
5. Create a pull request on GitHub to merge your changes into the main branch

## Additional Notes

- **README.md**: The README.md file provides an overview of your project, installation instructions, and usage guidelines.
- **.gitignore**: The .gitignore file specifies files and directories that Git should ignore (e.g., node_modules, environment files).
- **LICENSE**: The LICENSE file specifies the terms under which others can use, modify, and distribute your code.
- **CONTRIBUTING.md**: The CONTRIBUTING.md file provides guidelines for contributing to your project.

Congratulations! Your Islamic Education Portal project is now on GitHub.