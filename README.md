# Flight App

## Project Description

Welcome to the Flight App. 

Want to see the assessment without having to download and install? [Click Here 👈](https://flight-app.jackashton.dev/)

The Flight App is a project I created for a coding test which revolves around creating an API to provide access to a dataset containing two weeks of real flight information. The app aims to perform basic analysis on the retrieved data and answer the following questions:

*	How many of the flights depart in the morning (before 12 PM)? 
*	What percentage of the total set of flights fly into Sweden? 
*	What are the 10 most popular destination airports? 
*	What’s the average journey time between London Heathrow (LHR) and Dubai (DXB)?
*	What are the 10 cheapest flights (converted to £)?

The initial set of four questions constituted the core tasks assigned, while the fifth question was introduced as a captivating metric. It was selected due to the importance of price assessment in the evaluation of any commodity.
Finally, the web application presents the data in an easy to follow way. 


## Table of Contents

* [Project Description](#project-description)
* [Table of Contents](#table-of-contents)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Code Organisation](#code-organisation)
* [Main Components and Architecturial Decisions](#main-components-and-architecturial-decisions)
* [Screenshots](#screenshots)
* [Testing](#testing)
* [Future Improvements](#future-improvements)
* [Key Learnings](#key-learnings)
* [Project Status](#project-status)

## Tech Stack

The project utilises the following technologies:

- React (18.2.0)
- Vite (4.4.5)
- JavaScript (ES6)
- HTML / CSS
- Node.js (16.15.1)

## Installation 

To get started with the project, follow these installation instructions:

1. Clone the repository:

   ```
   git clone https://github.com/Jackdashton/flight-app.git
   ```

2. Install the dependencies:

   ```
   cd flight-app
   npm install
   ```
   ### Dependencies
   * fontawesome (6.4.2)
   * cors (2.8.5)
   * express (4.18.2)
   * xml2js (0.6.2)
   * nodemon (3.0.1)
   * React (18.2.0)
   * React-DOM (18.2.0)
   * eslint (8.45.0)
   * vite (4.4.5)

3. Run the project locally:

   ```
   vite

   The app should now be running on http://localhost:5173/.
   ```


## Code Organisation

The code was organised into several directories and files, each with a specific purpose:

- `Server`: Contains all files relating to the server-side. 
  
   - `server`: A script which sets up a web server using Express.js
   - `flightdata`: The original flight data XML file.
     
- `Client`: Contains all files relating to the client-side. 
  
   - `public`: Contains images to be used throughout the application. 
   - `src`: Home to the main source code of the application, organized into several subdirectories and files for better organization and separation of concerns
       - `components`: Contains the main React components and their respective modular CSS files.
       - `utils`: Contains the helper functions and Hooks to be used in conjunction with the main components. 
   - `data`: Holds any large datasets to be used throughout the application. 




## Main Components and Architecturial Decisions
Some of the main components and important architectural decisions in the project include:

1. **React useState Hook**: The useState hook is used throughout the components to store and update the state variables and use them throughout the components. 
   
2. **React useEffect Hook**: The useEffect hook wraps the majority of the functions within the components in order to trigger the data fetching process when the components mount, ensuring that the data is fetched and rendered in the component.

The useState and useEffect Hooks are critical for maintaining the modularity of React appilications, which in turn add to the future flexibility of the project; features and components can be added easily. 

## Screenshots
![Menu](https://github.com/Jackdashton/flight-app/assets/122602433/1a023533-867f-4535-a016-1108936ed769 )
<br />
<br />
![ScreenShot 2](https://github.com/Jackdashton/flight-app/assets/122602433/f31ce8f5-1293-44e2-99c3-6a78a290d326)
<br />
<br />
![ScreenShot 3](https://github.com/Jackdashton/flight-app/assets/122602433/4b537ca7-816e-4810-8f5a-5fcd338430c8)
<br />
<br />
![ScreenShot 4](https://github.com/Jackdashton/flight-app/assets/122602433/b4f6f8cf-2f7a-4a6c-afc1-59f5cf71859a)

## Testing
Given the time constraints, testing is currently TBC. 

## Future Improvements

* I would refactor my ConvertToDateTime and ConvertToTime utility functions to allow them to work as one function.
  
* Initially, the implementation of the MorningFlights component was designed to serve a dual purpose: counting the morning flights and rendering a comprehensive list of all flights in the morning. However, due to time constraints, the full implementation, including conditional rendering, could not be completed. As a result, a design decision was made to exclude the rendering of the complete list, and only the count of morning flights is displayed as a result.
  
* In the future, I would like to add testing.
  
* I would like to build out the backend and do a lot of the logic and filtering on the backend then create multiple endpoints, allowing the components in React to be purely for rendering the JSX. This would allow the code to be cleaner, and potentially facilitate conditional rendering.
  
* I would pass the flightsArray as a prop to the components and negate the need to declare a new variable in each component. 

## Key Learnings 

While I have prior experience with React, the majority of my previous projects have involved relatively straightforward frontend applications. This project represented my first attempt at creating a server and making API calls to it, offering a valuable opportunity to explore file architecture and the managing of HTTP requests and responses.

Given that my code will be reviewed and assessed by others, this presented a valuable occasion for me to consider the comments and documentation I provided, as well as the clarity of my code. This experience led to learning opportunities regarding refactoring and general code organization.

## Project Status
Status: Complete
