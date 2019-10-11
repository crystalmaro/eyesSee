<img src="https://cdn1.imggmi.com/uploads/2019/9/22/43de1ee28be08d0a66a4bbb059000e17-full.png" width="150" />

---
A modern UI photo hunt game, that educates and heightens design sensibility and literacy on user interface. Concept inspired by [Can't Unsee](http://cantunsee.space).

<img style="border: 1px solid black; border-radius: 20px" src="https://i.imgur.com/Pue32lU.png" width="400x" />

## Table of Content
* [Technologies](#Technologies)
* [Features & Demo](#Features-&-Demo)
    * [Step-by-Step Tutorial](#Step-by-Step-Tutorial)
    * [Color Theme Toggle](#Color-Theme-Toggle)
    * [Data Loading Handling](#Data-Loading-Handling)
    * [Correction Judgement](#Correction-Judgement)
    * [Result Feedback Page](#Result-Feedback-Page)
    * [Facebook Sharing](#Facebook-Sharing)
* [React Component Structure](#React-Component-Structure)
    * [Intro.js](#Intro.js)
    * [Game.js](#Game.js)
    * [Result.js](#Result.js)
---
## Technologies
* React
* React Context API
* Base64 Image Encoding
* Firebase Firestore NoSQL Database
* Firebase Hosting
* Mobile First Approach with RWD
* Facebook Sharing
* Intro.js
---
## Features & Demo

### Step-by-Step Tutorial

Tutorial toggle button for step-by-step guide and feature introduction on landing page

<img style="border: 1px solid black; border-radius: 20px" src="https://i.imgur.com/CSc3tPp.jpg" width="220x" /> <img style="border: 1px solid black; border-radius: 20px" src="https://i.imgur.com/mIb6oU5.png" width="220x" /> <img style="border: 1px solid black; border-radius: 20px" src="https://i.imgur.com/O0ImCeV.png" width="220x" />



### Color Theme Toggle
Background color options based on user's preference and selection
<img style="margin-left:30px" src="https://i.imgur.com/OZl8UkU.png" width="40px"/> - for light theme <img style="margin-left:50px" src="https://i.imgur.com/uhCSMK4.png" width="40px"/> - for dark theme
<img style="border: 1px solid black; border-radius: 20px" src="https://i.imgur.com/DyauZvU.png" width="220x" /> <img style="border: 1px solid black; border-radius: 20px" src="https://i.imgur.com/fGKAQUH.png" width="220x" />

### Data Loading Handling
Loading animation written by pure CSS, when fetching data from Firebase Firestore

<img style="border: 1px solid black; border-radius: 20px" src="https://i.imgur.com/yIxhkLF.gif" width="220x" />

### Correction Judgement
Two cards are displayed on the screen, with very minor difference among them.
When one of the card is clicked, the logic detects the click event, and checks whether the selection is the more correct design or not.

Click Event Response:

* <img src="https://i.imgur.com/WhCGJCc.png" width="20px" /> or <img src="https://i.imgur.com/hAuQNny.png" width="20px" /> based on the logic calculation
* Corresponding message for each set of cards


<img style="border: 1px solid black; border-radius: 20px" src="https://i.imgur.com/t9d5osx.jpg" width="220x" /> <img style="border: 1px solid black; border-radius: 20px" src="https://i.imgur.com/rgGOGyq.png" width="220x" /> <img style="border: 1px solid black; border-radius: 20px" src="https://i.imgur.com/qYR5yCi.png" width="220x" />


### Result Feedback Page
After the last round of card selection, the **NEXT** button will be replaced with **RESULT**
**Result** button leads to the final page of the website flow - Result.js

Result page shows the player's score and ranking, and provides Facebook Sharing functionality


<img style="border: 1px solid black; border-radius: 20px" src="https://i.imgur.com/VPYeEXp.png" width="250x" /> <img style="border: 1px solid black; border-radius: 20px" src="https://i.imgur.com/vBZu9kV.png" width="250x" />

### Facebook Sharing
Facebook sharing functionality acts as media to reach broader user audience 

<img style="border: 1px solid black; border-radius: 20px" src="https://i.imgur.com/j1fZhH1.png" width="250x" /> <img style="border: 1px solid black; border-radius: 20px" src="https://i.imgur.com/vIXZdLL.png" width="250x" />

---
## React Component Structure
<img src="https://i.imgur.com/MwJhVu8.png" width="800x" />

### Intro.js
<img style="border:3px solid rgb(198,133,128); border-radius:20px" src="https://i.imgur.com/pXmPLgH.png" width="500x" />

### Game.js
<img style="border: 3px solid rgb(255,198,106); border-radius:20px" src="https://i.imgur.com/7l0Amv1.png" width="500x" />

### Result.js
<img style="border: 3px solid rgb(252,237,174); border-radius:20px" src="https://i.imgur.com/st1rDFi.png" width="500x" />




