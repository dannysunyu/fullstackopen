My choice of language is Java.

# Linting

One of the popular option is [Checkstyle](https://checkstyle.sourceforge.io/).

# Testing

JUnit 5 is the most popular option.

# Buidling

We can use either Maven or Gradle. IDE likes IntelliJ IDEA supports both of these build tools.

> What alternatives are there to set up the CI besides Jenkins and GitHub Actions?

TeamCity and Gitlab CI.

> Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?

Definitely in a cloud-based environment like GitHub Actions.
First of all, given we are running a small/medium project and a small group of developers, we don't have enough manpower to start up our own server and host the project on it. We might not have the knowledge and experience of managing our own server and the self-host CI environment.On the other side, having the cloud-based environment takes care of the server provisioning and managment of software helps the team focus on the real work, which is development.
