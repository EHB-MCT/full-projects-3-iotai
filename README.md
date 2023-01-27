# <p align='center'>**EvoMission**

EvoMission is an educational and amusing game created for the Musuem of Natural Sciences located in Brussels, Belgium.

<hr>

## **Concept**

We launched this project to attract more Zoomers to the museum. We believe that majority of the Zoomers think of museums solely as a rather boring but educational interaction. Therefore we have created a game (takes place inside the museum) that is not only educational but also fun to play.

<hr>

## **How to play?**

### **Amount of people**

The game will start with a group of people (anywhere between 5 and 20 people)

### **Assigning roles**

At the start of the game, players will get assigned a role. You are either a Scientist or a Dinosaur, a Scientist their objective is to complete tasks, which are spread out across the museum, and to not get eliminated by the Dinosaurs. On the other hand, a dinosaur their task is to eliminate Scientists and to not get detected doing so.

### **Completing a task**

Your tasks will be shown to you on the map on the main screen of the game. You can read more about a specific task by clicking on the respective number on the map. Clicking on this number will pop up further instructions on what to do to complete this task. You can locate where this task takes places by navigating yourself through the museum by using the map shown to you on your app.

### **Eliminating a Scientist**

WIP

### **Reporting a murder**

Whenever you spotted a Scientist who has been eliminated, you can report this by using your the provided button on the main screen. Reporting a murder will also automatically call a meeting

### **Calling a meeting**

Calling a meeting also happens by pressing the button shown on your app. During a meeting the players will discus what they have done and what they saw. At the end of the meeting, they get the option to vote out a suspicious player or to skip vote. The player with the most votes will get ejected and in turn also 'dies'. This player can no longer communicate with others but can still complete their tasks to help their team win.

### **How to win?**

Scientists win when they have completed all their tasks or have successfully voted off the Dinosaurs during a meeting.

Dinosaurs win by eliminating scientists until the remaining amount of scientists are the same as the amount of Dinosaurs, making it impossible to vote out a dinosaur if they work together. Dinosaurs can also win if the tasks were not completely within the given time range.

## **Run code on your device**

<hr>

You can alter/view this project code by following the guide down below.

### **Before cloning this repo**

This project is compatible with the following versions:

-   Node: v16.13.0+
-   Windows: Windows 10 Build 19044.2130
-   MySQL Workbench: Version 8.0.28 Source distribution
-   Postman: v10
-   Git: Version 2.28.0.windows.1
-   VSCode: Version 1.74.3+

### **Cloning the repository using the command line**

Paste the following command in to your terminal of choice, to clone the repository on to your device

```
gh repo clone EHB-MCT/full-projects-3-iotai
```

Or use the GitHub Desktop client to clone the repository that way using the following link

```
https://github.com/EHB-MCT/full-projects-3-iotai.git
```

### **Before running the code**

Make sure you have installed all the packages needed based on the package.json.
To do this, you need to open a terminal and navigate to the folder's directory, or open an integrated terminal (possible in VSCode). In that terminal type the following command to download the packages needed.

```
npm install
```

You can head over to package.json to find out about what packages we use, listed under 'dependencies'

To install additional packages use the following command:

```
npm i <package_name>
```

or multiple at once

```
npm i <package_name1> <package_name2> <package_name3> ...
```

Recommend heading to [NPM](https://www.npmjs.com/) which is a package manager for Node, to find packages you would like to add to the project, or to read what the implemented ones are about.

### Run the code

In the same terminal, simply use the command

```
npm run dev
```

to run the project. 'dev' is a script that uses nodemon to have the application automatically refresh upon any changes towards the application.

### **Backend Repository**

We are also using our own REST API for this project. [Click here](https://github.com/StephanVanHemelrijck/iotai-backend) to be directed to the GitHub repo of our backend.

<p align='center'>
<br>
&copy; IOTAI - 2023
<br>
<small>Van Hemelrijck STEPHAN - Vannerum CEDRIC - Van Uden Rachelle - Asselman YORAN - Adahchour NAWFAL - Vankriekinge RYAN<small>
