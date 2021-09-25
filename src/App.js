import React,{useEffect,lazy,Suspense} from 'react';
import Header from './component/header/header.component'
import { Switch, Route} from 'react-router-dom'
import styled from 'styled-components'
import NavBar from './component/navbar/navbar.component'
import {fetchCollectionsStart} from './redux/store/store.action'
import {connect} from 'react-redux'
import Spinner from './component/spinner/spinner.component';
import ErrorBoundary from './component/error-boundary/Error-Boundary.component';
import {checkUserSession} from './redux/user/user.action'
import { firestore } from './firebase/firebase.utils';
import firebase from 'firebase/compat/app';

const Application = lazy(()=>import('./page/Application/Application.page'))
const EntertainmentPage = lazy(()=>import('./page/Entertainment/Entertainment.page'))
const Movie = lazy(()=>import('./page/Movie/Movie.page'))
const Book = lazy(()=>import('./page/Book/Book.page'))
const CheckoutPage = lazy(()=>import('./page/Checkout/CheckoutPage.page'))



const App = ({fetchCollectionsStart,checkUserSession})=>{

    useEffect(() => {
      fetchCollectionsStart()
      checkUserSession()
    }, [fetchCollectionsStart])
    const date = new Date()
    const obj =[
      {
            'description':"Do you know why Avengers: Endgame has no after-credits? Because right after that story is the launch of Spider-Man: Far From Home. Back after the departure of his uncle Tony - Iron Man, it seems that the boy Peter no longer has enough motivation and faith to continue pursuing his dream of being a superhero. But life is not always the way we want it to be! Especially when out there, there are still countless other bad guys to destroy. During a trip to Europe, Peter Parker and his friends find themselves in new trouble. Not only that, he also got to meet Nick Fury. How difficult will Spider-Man's new challenge be? Despite the 'brave' to hang up Nick Fury's phone, Peter still has to work with him to continue his journey to protect the world of Uncle Tony. Besides Nick Fury, Spider-Man: Far From Home also has the appearance of a new face, Mysterio. Will this be the villain or the protagonist?",
            'director':'Jon Watts',
            'duration':129,
            'imgUrl':'https://play-lh.googleusercontent.com/BcZJW8vzI_1s56mjmlhnBi9SmvX4M7IGV4B9xRpGGuN315dxQTKSON50jyEkuaQdlhRAG6e2_43ae6Z4mxSz=w200-h300-rw',
            'performer':'Tom Holland , Samuel Jackson , Zendaya Coleman , Cobie Smulders , Jon Favreau , JB Smoove , Jacob Batalon , Martin Starr , Tony Revolori , Marisa Tomei , Jake Gyllenhaal , Angourie Rice , Numan Acar , Remy Hii',
            'price':230,
            'producer':'Kevin Feige , Amy Pascal',
            'rate':5,
            'title':'Spider Man: Spider-Man Far From Home',
            'type':'Action and adventure, Family',
            'update':date,
            'videoImg':'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/10af0b39-a57e-4f10-aeb1-fd388299ed5b/dd30sej-ba00f8a2-fdcf-48ad-8681-e507010cba43.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEwYWYwYjM5LWE1N2UtNGYxMC1hZWIxLWZkMzg4Mjk5ZWQ1YlwvZGQzMHNlai1iYTAwZjhhMi1mZGNmLTQ4YWQtODY4MS1lNTA3MDEwY2JhNDMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pWIARDMHQJbaWljid6OPz2QhIqDTW5DPZW3cXG-iUEA',
            'videoUrl':'https://youtu.be/Nt9L1jCKGnE',
            'warning':'',
            'writer':'Chris McKenna , Erik Somers',
            'year':'2019'
          },
      {
            'description':"Set to the sonic backdrop of Awesome Mixtape #2, Marvel Studios' Guardians of the Galaxy Vol. 2 continues the team's adventures as they traverse the outer reaches of the cosmos. The Guardians must fight to keep their newfound family together as they unravel the mystery of Peter Quill's true parentage. Old foes become new allies and characters from the classic comics come to their aid as the Marvel Cinematic Universe continues to expand.",
            'director':'James Gunn',
            'duration':135,
            'imgUrl':'https://play-lh.googleusercontent.com/7t7A1JpuLFj3WElDDcP_BiCVMOqZUsyR7kbIjMDwkJbgxFydQms5OQuOPR1n_vE8cyI=w200-h300-rw',
            'performer':'Chris Pratt , Zoe Saldana , Dave Bautista , Vin Diesel , Bradley Cooper , Michael Rooker , Karen Gillan , Pom Klementieff , Sylvester Stallone , Kurt Russell , Elizabeth Debicki , Chris Sullivan , Sean Gunn , Tommy Flanagan , Laura Haddock , Aaron Schwartz , Hannah Gottesman , Hilty Bowen , Ben Browder , Alex Klein , Luke Cook ,Evan Jones , Joe Fria , Terence Rosemore , Jimmy Urine , Stephen Blackehart , Steve Agee , Blondy Baruti , Richard Christy , Rob Zombie , Sierra Love , Kendra Staub , Milynn Sarley , Seth Green , Molly Quinn , Michael Rosenbaum , Rhoda Griffis , Stan Lee , David Hasselhoff , Mac Wells , James Gunn Sr. , Leota Gunn ,Elizabeth Ludlow , Wyatt Oleff , Gregg Henry , Damita Jane Howard , Ving Rhames , Michelle Yeoh',
            'price':200,
            'producer':'Kevin Feige',
            'rate':5,
            'title':'Guardians of the Galaxy Vol. 2',
            'type':'Action and adventure, Family',
            'update':date,
            'videoImg':'https://lh3.googleusercontent.com/proxy/OlG_O0PxlSUECoS00I0IncGL6563X1vcpwZ9jZ9ouTlgR3LZWzPgY7Z2FlpxOaSlS8fqslIKO8tWLWwjjP1MsYzk4LOGm92cZyYOd9wCkVEqTleBaIHdthztWcE1DRpbdS6OwldCty3N1n_f9va8QzDWwgJPQ2kxs6TzeNqATyntw9qXFV-glUS1Fw',
            'videoUrl':'https://youtu.be/dW1BIid8Osg',
            'warning':'No audio or subtitles in your language. Subtitles are available in English, Portuguese, Estonian, Greek, Dutch, Icelandic, Latvian, Lithuanian, Norwegian, French, Finnish, Turkish, Swiss Dictionary and Danish.',
            'writer':'James Gunn',
            'year':'2017'
          },
      {
            'description':"Robert Downey Jr. returns as billionaire Tony Stark in this thrilling sequel to the worldwide blockbuster. Now that his superhero secret has been revealed, Tony's life is more intense than ever. Everyone wants in on the Iron Man technology, whether for power or profit...but for Ivan Vanko ('Whiplash'), it's revenge! ",
            'director':'Jon Favreau',
            'duration':124,
            'imgUrl':'https://play-lh.googleusercontent.com/Y19Z2gHT3plZCrsbZPY9zr7Ru6nBOfLygm1jNr0NkHA93tGQz8yHB2jj4Y_Oc0W9lULBTQ=w200-h300-rw',
            'performer':'Robert Downey Jr. , Gwyneth Paltrow , Don Cheadle , Scarlett Johansson , Sam Rockwell , Mickey Rourke',
            'price':200,
            'producer':"David Feige , Louis D'Esposito , Susan Downey , Alan Fine , Stan Lee , David Maisel , Denis L. Stewart",
            'rate':5,
            'title':'Iron Man 2',
            'type':'Action and adventure, Family',
            'update':date,
            'videoImg':'https://www.talkbeauty.vn/public/assets/article_dir/2019/05/nhung-bo-giap-cua-iron-man-5.jpg',
            'videoUrl':'https://youtu.be/wKtcmiifycU',
            'warning':'No audio or subtitles in your language. Subtitles are available in English, Dutch, Indonesian, Latvian, Malay, Finnish, Thai, Turkish, Chinese (Simplified) and Chinese (Traditional).',
            'writer':'Justin Theroux',
            'year':2010
          },
      {
            'description':"Marvel Studios' Captain Marvel takes you on a spectacular adventure from the 1990s, tracing the path of Carol Danvers (Brie Larson) as she becomes one of the most powerful heroes in the universe. When a galactic war reaches Earth, she meets young agent Nick Fury (Samuel L. Jackson) at the center of a maelstrom, leading to her ultimate destiny as an Avenger!",
            'director':'Anna Boden , Ryan Fleck',
            'duration':123,
            'imgUrl':'https://play-lh.googleusercontent.com/lXB2OeVf8H6wYPPfQRgCDfg6aWlEsGBvQq0FRL8L_IHYrj2OmQpFT8_ViQuUIw-4wCgj=w200-h300-rw',
            'performer':'Brie Larson , Samuel L. Jackson , Ben Mendelsohn , Djimon Hounsou , Lee Pace , Annette Bening , Clark Gregg , Jude Law , Akira Akbar , Matthew Maher , Chuku Modu , Vik Sahay ,',
            'price':200,
            'producer':'Anna Boden , Ryan Fleck , Geneva Robertson-Dworet',
            'rate':4,
            'title':"Marvel Studios' Captain Marvel",
            'type':'Action and adventure, Family',
            'update':date,
            'videoImg':'https://www.indulge.com.mt/wp-content/uploads/2019/03/captain-marvel-brie-larson-supersuit.jpg',
            'videoUrl':'https://youtu.be/0LHxvxdRnYc',
            'warning':'No audio or subtitles in your language. Subtitles are available in English and Chinese (Traditional).',
            'writer':'Anna Boden , Ryan Fleck , Geneva Robertson-Dworet',
            'year':2019
          },
      {
            'description':"During a rescue mission in space, one of the X-Men's most beloved characters, Jean Grey, is struck by a cosmic force that transforms her into one of the most powerful mutants of all: Dark Phoenix. Wrestling with this increasingly unstable power and her own personal demons, Jean spirals out of control, tearing the X-Men family apart as they face most devastating enemy yet — one of their own.",
            'director':'Simon Kinberg',
            'duration':113,
            'imgUrl':'https://play-lh.googleusercontent.com/FVxjH_4dUj895i4Dggqmuyjb8e8nKsc3zJxvHE88N9UDseGMGQv4gqdAnKKq2ZsKD1ERefDY6ElhZATxQJ8=w200-h300-rw',
            'performer':'James McAvoy , Michael Fassbender , Jennifer Lawrence , Nicholas Hoult , Sophie Turner , Jessica Chastain',
            'price':110,
            'producer':'Marry',
            'rate':3,
            'title':'X-Men: Dark Phoenix',
            'type':'Action and adventure',
            'update':date,
            'videoImg':'https://www.hollywoodreporter.com/wp-content/uploads/2018/09/x-men-_dark_phoenix_still_1.jpg',
            'videoUrl':'https://youtu.be/1-q8C_c-nlM',
            'warning':'',
            'writer':'Jason Bourn',
            'year':2019
          }
    ]

    useEffect(()=>{
      let Ref = firestore.collection('store').doc('movie');
      // obj.map(item=>{
      //   // Ref.update({
      //   //   categories: firebase.firestore.FieldValue.arrayUnion(item)
      //   // })
      // })
      // Ref.update({
      //   categories: firebase.firestore.FieldValue.arrayUnion(obj)
      // });

    },[])

    return(
      <Container>
         <Header/>
         <AppWrapper>
          <NavWrapper>
              <NavBar/>
          </NavWrapper>
          <SwitchWrapper>
          <ErrorBoundary>
            <Switch>
              <Suspense fallback={<Spinner/>}>
                <Route  path='/entertainment' component={EntertainmentPage} />
                <Route path='/movies' component={Movie} />
                <Route path='/checkout' component={CheckoutPage}/>
                <Route  path='/books' component={Book} />
              </Suspense>
            </Switch>
            </ErrorBoundary>
          </SwitchWrapper> 
         </AppWrapper> 
      </Container>
    )
}

const NavWrapper = styled.div`
  z-index:1;

  @media screen and (max-width:800px){
    display: block;
    width:100%;
  }
`

const SwitchWrapper = styled.div`
  height: calc(100vh - 60px);
  width: calc(100vw - 14vw);
  overflow-y: auto;
   
  &::-webkit-scrollbar{
    display: none;
  } 

  
  @media screen and (max-width:800px){
    display: block;
    width:100%;
  }
`

const AppWrapper = styled.div`
  display: flex;

  @media screen and (max-width:800px){
    display:block;
  }
`

const Container = styled.div`
   background-color: #f3f3f4!important;
   bottom:0px;
`

const mapDispatchToProps = dispatch=>({
    checkUserSession:()=>dispatch(checkUserSession()),
    fetchCollectionsStart:()=>dispatch(fetchCollectionsStart())
})

export default connect(null,mapDispatchToProps)(App);
