Kingdom Kids Bible Quiz

A fun and interactive online Bible quiz for children aged 3-12.

Table of Contents

Overview

Features

Getting Started

Project Structure

Technologies Used

Usage

Future Improvements

License

Overview

Kingdom Kids Bible Quiz is an engaging, educational web application designed to help children learn Bible stories, facts, and principles in a fun and interactive way.

Supports age-based questions for 3-6 years and 7-12 years.

Provides instant feedback with correct/wrong indicators and explanations.

Features

Age-based question selection (3-6 & 7-12 years)

Multiple-choice and True/False questions

Countdown timer with per-question time limit

Previous/Next navigation for questions

Final score display with personalized shoutout

Detailed question breakdown with explanations for incorrect answers

PDF download of results for printing or saving

Responsive and mobile-friendly design

Getting Started
Prerequisites

Modern browser (Chrome, Edge, Firefox, Safari)

Optional: Node.js
 for local server deployment

Installation

Clone the repository:

git clone https://github.com/yourusername/kingdom-kids-quiz.git


Navigate to the project folder:

cd kingdom-kids-quiz


Open index.html in your browser to start the quiz

Deployment

Deploy on Vercel or Netlify for live access

Ensure all assets (images, CSS, JS) are properly linked

Project Structure
kingdom-kids-quiz/
│
├─ index.html          # Welcome page
├─ rules.html          # Quiz rules
├─ quiz.html           # Main quiz page
├─ result.html         # Quiz result page
│
├─ App-CSS/
│   └─ style.css       # Styles for all pages
│
├─ App-js/
│   ├─ quiz.js         # Main quiz logic
│   ├─ result.js       # Result page logic
│   ├─ utils.js        # Utility functions
│   ├─ data-3-6.js     # Questions for ages 3-6
│   └─ data-7-12.js    # Questions for ages 7-12
│
└─ images/             # Backgrounds and asset images

Technologies Used

HTML5

CSS3 (Flexbox, Grid, Animations)

JavaScript (ES6 modules)

html2canvas and jsPDF for PDF downloads

Usage

Enter name, age, and church on the welcome page

Read the rules and continue to the quiz

Answer each question before the timer runs out

Navigate using Previous and Next buttons

View results and explanations on the result page

Download a PDF of the results for printing

Future Improvements

Add more age groups with additional questions

Include animations and sound effects for correct/wrong answers

Add user login to save scores

Allow timer customization per question

License

This project is open-source and free to use for educational purposes

✅ Live Demo: [Insert Vercel/Netlify link here]