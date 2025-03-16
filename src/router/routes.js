import Main from "../pages/Main"
import Search from "../pages/Search"
import Registration from "../pages/Registration"
import MoviePage from "../pages/Movie"
import Account from "../pages/Account"
import Appendix from "../pages/Appendix"
import Rights from "../pages/Rights"
import Contacts from "../pages/Contacts"
import Questions from "../pages/Questions"

export const allRoutes = [
  { path: '/', component: Main },
  { path: '/search', component: Search },
  { path: '/register', component: Registration },
  { path: '/movie', component: MoviePage },
  { path: '/appendix', component: Appendix },
  { path: '/rights', component: Rights },
  { path: '/contacts', component: Contacts },
  { path: '/questions', component: Questions },
  { path: '/account', component: Account },
]
