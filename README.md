Marvel Studio Character Application

Project Description

About the Application:

The Marvel Studio Character App is an interactive web platform designed for Marvel enthusiasts and creators. Users can create, edit, search, and explore character profiles while managing their custom superhero or villain collections.

The app provides:
	•	Character Creation Tools – Build unique character profiles with names, aliases, alignments, and powers.
	•	Search & Display Features – View iconic Marvel characters and search for custom creations.
	•	Carousel Showcase – Explore collections in an auto-sliding visual carousel.
	•	Collection Management – Organize characters into collections and edit them dynamically.
	•	Local Storage Support – Saves data so that users are allowed to edit and delete their creations within the database not existing ones. Protects original characters stored from being deleted or edited.

Technologies Used:
	•	ReactJS – Frontend framework for building reusable components.
	•	React Router DOM – Enables seamless navigation across the application.
	•	Bootstrap & React-Bootstrap – Provides responsive and styled UI elements.
	•	JavaScript (ES6) – Core functionality for dynamic features.
	•	Axios – Handles HTTP requests for interacting with backend APIs.

Features:

Homepage
	•	Marvel Universe Access – Explore legendary profiles and user-created characters.
	•	Interactive Navigation – Direct links to character creation, exploration, and profile search.

Character Creation & Editing
	•	Create Characters – Fill in forms to create heroes or villains with customizable details.
	•	Edit Profiles – Modify existing characters in local storage or collections.
	•	Search Functionality – Search by name with case-insensitive and whitespace-tolerant matching.

Marvel Character Explorer
	•	Carousel Showcase – Browse through character collections visually with auto-sliding features.
	•	Detailed Profiles – View character images, attributes, and powers.

Collection Manager
	•	Collection Groups – Organize characters into collections by name for easier management.
	•	Persistent Storage – Automatically save data in local storage for quick access.
	•	Delete & Update Options – Remove or modify characters directly from collections.

Challenges Faced:
	•	Ensuring data synchronization between local storage and real-time editing features with backend integration.
	•	Creating a flexible search algorithm that handles partial matches, case-insensitivity, and whitespace tolerance.
	•	Designing an intuitive carousel experience for displaying characters while maintaining responsiveness.


How to Install and Run the Project
	1.	Clone the Repository:

git clone https://github.com/justliya/Marvel-Full-Stack-Application.git



	2.	Install Dependencies:

Frontend Folder:

npm install

npm install react-router-dom
npm install axios
npm install bootstrap
npm install react-bootstrap

npm run dev


Backend Folder (see required.txt file):

Set up MySQL- Add marvel characters to the database

Environment set-up:

python3 -m venv venv

source venv/bin/activate

pip install flask flask-cors mysql-connector-python flask-marshmallow



How to Use the Project
	1.	Homepage Navigation:
	•	Choose from options: Explore Marvel Universe, Create/Edit Hero, or View Profiles.
	2.	Create Characters:
	•	Go to Create Character to add a new superhero or villain.
	•	Fill in attributes like Name, Alias, Powers, and Image URL.
	•	Save the character to your collection.
	3.	Search Characters:
	•	Use the Search Bar to look for existing characters by name.
	•	Edits can be made directly to stored characters.
	4.	View Collections:
	•	Open collections through the View Collection button.
	•	Browse or update character details directly from the list.
	5.	Explore Marvel Characters:
	•	Access pre-created profiles through the Marvel Explorer Carousel.
	•	Use navigation controls to view different character cards.

Link to Figma Prototype for design layout - https://www.figma.com/design/qgkHesFvxq0F06Z9D7iOT3/Marvel?node-id=0-1&t=qIXtxdaKgL86QI9F-1


Acknowledgments:
	•	Marvel API Documentation – Inspiration for character profiles.
	•	React and Bootstrap Documentation – For designing the application layout and functionality.
	•	Open-Source Developers – For contributing helpful packages and resources.

This project was built with a passion for marvel and coding. 