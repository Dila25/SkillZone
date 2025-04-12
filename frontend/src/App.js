import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";
import { useNavigate } from "react-router-dom";
import UserLogin from "./Pages/UserManagement/UserLogin";
import UserRegister from "./Pages/UserManagement/UserRegister";
import UpdateUserProfile from "./Pages/UserManagement/UpdateUserProfile";
import NotificationsPage from "./Pages/NotificationManagement/NotificationsPage";
import AddNewPost from "./Pages/PostManagement/AddNewPost";
import AllPost from "./Pages/PostManagement/AllPost";
import UpdatePost from "./Pages/PostManagement/UpdatePost";
import AddQuest from "./Pages/QuizManagement/AddQuest";
import AllQuest from "./Pages/QuizManagement/AllQuest";
import UpdateQuest from "./Pages/QuizManagement/UpdateQuest";
import AttemptQuest from "./Pages/QuizManagement/AttemptQuest";
import MyQuest from "./Pages/QuizManagement/MyQuest";
import AllCommunity from "./Pages/CommunityManagement/AllCommunity";
import AddNoties from "./Pages/CommunityManagement/AddNoties";
import AllNoties from "./Pages/CommunityManagement/AllNoties";
import CreateCommunity from "./Pages/CommunityManagement/CreateCommunity";
import CommunityDetails from "./Pages/CommunityManagement/CommunityDetails";
import AllUserForCommunity from "./Pages/CommunityManagement/AllUserForCommunity";
import UpdateNoties from "./Pages/CommunityManagement/UpdateNoties";
import MyCommunity from "./Pages/CommunityManagement/MyCommunity";

function ProtectedRoute({ children }) {
  const userID = localStorage.getItem("userID");
  if (!userID) {
    return <Navigate to="/" />;
  }
  return children;
}

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/oauth2/success") {
      const params = new URLSearchParams(window.location.search);
      const userID = params.get("userID");
      const name = params.get("name");

      if (userID && name) {
        localStorage.setItem("userID", userID);
        alert(`Login successful! Welcome, ${name}`);
        localStorage.setItem("userType", "googale");
        navigate("/learningSystem/allLearningPost");
      } else {
        alert("Login failed. Missing user information.");
      }
    }
  }, [navigate]);

  return (
    <div>
      <React.Fragment>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          {/* Protected Routes */}
          <Route
            path="/updateUserProfile/:id"
            element={
              <ProtectedRoute>
                <UpdateUserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addNewPost"
            element={
              <ProtectedRoute>
                <AddNewPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allPost"
            element={
              <ProtectedRoute>
                <AllPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updatePost/:id"
            element={
              <ProtectedRoute>
                <UpdatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addQuest"
            element={
              <ProtectedRoute>
                <AddQuest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allQuest"
            element={
              <ProtectedRoute>
                <AllQuest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateQuest/:id"
            element={
              <ProtectedRoute>
                <UpdateQuest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attemptQuest/:id"
            element={
              <ProtectedRoute>
                <AttemptQuest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myQuest"
            element={
              <ProtectedRoute>
                <MyQuest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allCommunity"
            element={
              <ProtectedRoute>
                <AllCommunity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addNoties/:id"
            element={
              <ProtectedRoute>
                <AddNoties />
              </ProtectedRoute>
            }
          />

          <Route
            path="/allNoties/:communityId"
            element={
              <ProtectedRoute>
                <AllNoties />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createCommunity"
            element={
              <ProtectedRoute>
                <CreateCommunity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/communityDetails/:communityId"
            element={
              <ProtectedRoute>
                <CommunityDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/communityUsers/:id"
            element={
              <ProtectedRoute>
                <AllUserForCommunity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateNoties/:id"
            element={
              <ProtectedRoute>
                <UpdateNoties />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myCommunity"
            element={
              <ProtectedRoute>
                <MyCommunity />
              </ProtectedRoute>
            }
          />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
