import CartActionTypes from './cart.types'

const INITIAL_STATE={
    cartCategories:{
        'movies':[
            'Action and adventure',
            'Family',
            'Horror',
            'Drama'
        ],
        'books':[
            'History',
            'Travel',
            'Education',
            'Fiction',
            'Religion',
            'Thriller',
            'Science and Math',
            'Computer and Technology',
            'Cooking, Food and Wine',
            'Arts and Entertainment',
            "Children's Books ",
            "Detective Mystery" 
        ],
        'apps':[
            'Entertain',
            'Personalized',
            'Maps and navigation',
            'Tools',
            'Dating',
            'Contact',
            'Beautify',
            'Shopping',
            'Art and Design',
            'Music and Sounds',
            'Health and Fitness',
            'Finance',
            'Weather',
            'Watch and edit videos',
            'Eating',
            'Clock app',
            {'Game':['Riddle,Tactic,Board forms,Racing,Education,Act,Adventure,Card,Sport,Role Playing']},
        ]
        
    },
    currentCart:'Category',
    hidden:true
}

const cartReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return{
                ...state,
                hidden:!state.hidden
            }
        case CartActionTypes.SELECT_CART:
            return{
                ...state,
                currentCart:action.payload
            }
        default:
            return state
    }
}

export default cartReducer