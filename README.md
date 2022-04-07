# Star Wars

Star Wars is a React App that's consumes an external Star Wars' API.

## Installation

First, download the zip or clone this repository into your personal computer.

Use the package manager [yarn or npm] to install the dependencies.

```bash
yarn
```

After that, you can launch the application using the following command:

```
yarn dev
```

## How to use the app

On each page you can search for a specific character, movie, vehicle or spaceship. You can also save as a favorite to view in a different section.


## Pages

The app basically:

- "/": Home page (Characters);
- "/characters/:id": Specific character's page;
- "/films": Films' page;
- "/films/:id": Specific film's page;
- "/starships": Starships' page;
- "/starship/:id": Specific starship's page;
- "/vehicles": Vehicles' page;
- "/vehicles/:id": Specific vehicle page;


## What technologies does this project use?

The whole app was made with ReactJs. To style, it's uses styled-components.

Others importants libs was used also:

- React Redux (to save all favourites states)
- Axios (to make requests to API);
- Lottie (to make the animations with lottiefiles in JSON);
- Lodash (to make debounce);
- React Router DOM v6;
- Polished;
- React Icons.

## About the author
The entire app was made by me.

All Data Provided By [SWAPI](https://swapi.dev/)

[LinkedIn](https://www.linkedin.com/in/kameikay/)

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Demo
[Star Wars](https://kameikay-starwars.netlify.app/)
