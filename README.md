
<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="https://brandlogos.net/wp-content/uploads/2021/04/play-store-logo-512x512.png" alt="Logo" width="80" height="80">

<h3 align="center">My Google Play</h3>

  <p align="center">
   Website was built inspired by the Google Play store UI/UX in term of product selling simulation, put every aspects of WebDev from basic to advanced into practices, responsiveness is not the strong suit of this website at the moment, mostly dive deep into massive State Managing using Redux, handle side effects with Redux Saga, basic level of user security using Firebase and customized middleware.
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://google-play1.vercel.app/entertainment)

For the Front-End, <a href="https://beta.reactjs.org/">ReactJS</a> is the best best Framwork for building front-end back in 2020 for its powers including flexibility, speed, reusable components, easy to approach, etc. For the back-end, we host all of our data in Firestore, Fireabase Storage, and Firebase Authentication for monitoring users google account, this website doesn't have server-side instead, we using APIs for Firebase document query for fetching and updating from database. Finally host our website on <a href="https://vercel.com/dashboard">Vercel</a>.


### Built With

* [![React][React.js]][React-url]
* [![MaterialUI][MaterialUI.com]][Material-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![Firebase][Firebase.com]][Firebase-url]
* [![Redux][ReduxToolkit.com]][ReduxToolkit-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
 
Follow these steps below to get and run a copy local version of FullStack Asos 

### Prerequisites

Go to <a href="https://rapidapi.com/apidojo/api/asos2">Asos Rapid API</a> and subscribe their API

### Installation

1. Get RapidAPI Keys and urls at <a href="https://rapidapi.com/apidojo/api/asos2">Asos Rapid API</a>
2. Clone the repo
   ```sh
   git clone https://github.com/NateRiver4612/FullStack-Asos.git
   ```
3. Install NPM packages
   ```sh
   npm install // yarn install 
   ```
4. Enter your API and copy this code to `.env`
   ```js
   X_RAPIDAPI_KEY= "ENTER_YOUR_X_RAPIDAPI_KEY"
   X_RAPIDAPI_HOST= "asos2.p.rapidapi.com"
   PRODUCT_LIST= "https://asos2.p.rapidapi.com/products/v2/list"
   PRODUCT_DETAIL= "https://asos2.p.rapidapi.com/products/v3/detail"
   ```


<!-- USAGE EXAMPLES -->
## Usage
This website is uncompleted due to missing data supply, however there won't be no harm for clicking around. This website is responsive so you can use multiple devices, there's few things you can do right now is just view the list and detail of products, and google // email password sign in,sign up.   



<!-- ROADMAP -->
## Roadmap

- [ ] Home page
- [ ] Products page
- [ ] Product detail page
- [ ] Registe page

<!-- CONTACT -->
## Contact

Email: 
- nguyenchinhan502@gmail.com 
- nguyenchinhan.dev@gmail.com

Mobile:
- 0909209967

Project Link: [https://github.com/NateRiver4612/FullStack-Asos.git](https://github.com/NateRiver4612/FullStack-Asos.git)

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: public/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[MaterialUI.com]: https://img.shields.io/badge/Material_UI-grey?style=for-the-badge&logo=MUI
[Material-url]: https://mui.com/
[Tailwind.com]: https://img.shields.io/badge/Tailwind_Css-grey?style=for-the-badge&logo=Tailwind%20CSS
[TailwindCss-url]: https://tailwindcss.com/
[AppoloGraphQl.com]: https://img.shields.io/badge/Appolo_GraphQl-black?style=for-the-badge&logo=Apollo%20GraphQL
[AppoloGraphQl-url]: https://www.apollographql.com/
[Firebase.com]: https://img.shields.io/badge/firebase-blue?style=for-the-badge&logo=Firebase
[Firebase-url]: https://console.firebase.google.com/
[ReduxToolkit.com]: https://img.shields.io/badge/redux_toolkit-purple?style=for-the-badge&logo=Redux
[ReduxToolkit-url]: https://redux-toolkit.js.org/

