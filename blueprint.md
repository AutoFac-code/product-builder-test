# Lotto Number Generator Blueprint

## Overview
A modern, web-based Lotto Number Generator that provides a visually engaging experience for generating random lottery numbers and sending them via email.

## Features
- **Random Generation**: Generates 6 unique numbers between 1 and 45.
- **Modern UI**: Clean, responsive design with a focus on aesthetics (gradients, shadows, and animations).
- **Theme Switching**: Support for both Dark and Light modes with persistent storage.
- **Email Sharing**: Send generated numbers to an email address using Formspree integration.
- **Comments Section**: Integrated Disqus for user feedback and discussion.
- **AdSense Integration**: Google AdSense for site monetization and account verification.
- **Interactive Feedback**: Visual animations when numbers are generated to simulate a "rolling" effect.
- **Responsive Design**: Works perfectly on both desktop and mobile devices.

## Project Outline
### Version 1.4 (Current)
- **AdSense Integration**: Added Google AdSense script, account verification meta tag, and `ads.txt` file.
- **Comments Integration**: Added Disqus thread for community engagement.
- **Email Integration**: Integrated Formspree (`mqedjpkn`) to receive generated numbers via AJAX.
- **Dynamic UI**: Email form appears only after numbers are generated.
- **Theme Engine**: Implemented a CSS variable-based theme system for Dark/Light modes.
- **Persistence**: Remembers user theme preference using `localStorage`.

## Completed Steps
1.  **Structure (index.html)**: Added Formspree form, hidden fields, and Google AdSense tags. Added Disqus thread section outside the main container for persistent visibility.
2.  **Verification (ads.txt)**: Created `ads.txt` file for AdSense verification.
3.  **Aesthetics (style.css)**: Styled form elements and comment section with glassmorphism cards. Updated body layout to column-flex for scrolling.
4.  **Logic (main.js)**: Implemented AJAX form submission and dynamic visibility.
5.  **Deployment**: Pushed updated version to GitHub.
