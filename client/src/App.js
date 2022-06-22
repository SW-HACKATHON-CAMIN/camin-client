import { Routes, Route, BrowserRouter} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Reset } from "styled-reset";

/* UserPage Import */
import MainLayout from "./UserPages/MainLayout/MainLayout";
import Main from "./UserPages/Main/Main";
import Map from "./UserPages/Map/Map";
import FavoriteCafe from "./UserPages/FavoriteCafe/FavoriteCafe";
import ReservationInfo from "./UserPages/ReservationInfo/ReservationInfo";
import ReserveSeat from "./UserPages/ReserveSeat/ReserveSeat";
import ReserveMenu from "./UserPages/ReserveMenu/ReserveMenu";
import Review from "./UserPages/Review/Review";

/* AdminPage Import */
import CafeInfo from "./AdminPages/CafeInfo/CafeInfo";
import CafeMenu from "./AdminPages/CafeMenu/CafeMenu";
import UpdateSeat from "./AdminPages/UpdateSeat/UpdateSeat";

/* CommomPage Import */
import Login from "./Common/Login/Login";
import SignUp from "./Common/SignUp/SignUp";
import MyInfo from "./Common/MyInfo/MyInfo";
import PageNotFound from "./Common/PageNotFound/PageNotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Reset />
      <BrowserRouter>
        <Routes>
          {/* userPages */}
          <Route path="/" element={<Main />} />
          <Route path="/map" element={<MainLayout View={Map} Menu={"Map"} />} />
          <Route
            path="/favoritecafe"
            element={<MainLayout View={FavoriteCafe} Menu={"FavoriteCafe"} />}
          />
          <Route
            path="/reservationinfo"
            element={
              <MainLayout View={ReservationInfo} Menu={"ReservationInfo"} />
            }
          />
          <Route
            path="/myinfo"
            element={<MainLayout View={MyInfo} Menu={"MyInfo"} />}
          />
          <Route path="/reserveseat" element={<ReserveSeat />} />
          <Route path="/reservemenu" element={<ReserveMenu />} />
          <Route path="/review" element={<Review />} />
          {/* AdminPages */}
          <Route path="/admin/cafeinfo" element={<CafeInfo />} />
          <Route path="/admin/cafemenu" element={<CafeMenu />} />
          <Route path="/admin/updateseat" element={<UpdateSeat />} />
          {/* Common */}
          <Route path="/login" element={<Login  View={MyInfo} Menu={""}/>} >
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      
    </QueryClientProvider>


  );
}

export default App;
