import { useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
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
import KakaoLogin from "./Common/Login/KakaoLogin";
import PageNotFound from "./Common/PageNotFound/PageNotFound";

const queryClient = new QueryClient();

function App() {
  const [isLogin, setIsLogin] = useState(false);

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
            element={
              isLogin === true ? (
                <MainLayout View={FavoriteCafe} Menu={"FavoriteCafe"} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/reservationinfo"
            element={
              isLogin === true ? (
                <MainLayout View={ReservationInfo} Menu={"ReservationInfo"} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/myinfo"
            element={
              isLogin === true ? (
                <MainLayout View={MyInfo} Menu={"MyInfo"} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route path="/reserveseat" element={<ReserveSeat />} />
          <Route path="/reservemenu" element={<ReserveMenu />} />
          <Route path="/review" element={<Review />} />
          {/* AdminPages */}
          <Route path="/admin/cafeinfo" element={<CafeInfo />} />
          <Route path="/admin/cafemenu" element={<CafeMenu />} />
          <Route path="/admin/updateseat" element={<UpdateSeat />} />

          {/* Common */}
          <Route
            path="/oauth/kakao/callback"
            element={<KakaoLogin setIsLogin={setIsLogin} />}
          />
          <Route path="/login" element={<MainLayout View={Login} />}></Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
