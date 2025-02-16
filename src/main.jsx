import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import History from './pages/History.jsx'
import LikedVideos from './pages/LikedVideos.jsx'
import Playlist from './pages/Playlist.jsx'
import Subscription from './pages/Subscription.jsx'
import AuthContextProvider from './components/contexts/Auth/AuthContextProvider.jsx'
import PublishVideo from './pages/PublishVideo.jsx'
import MenuContextProvider from './components/contexts/MenuButton/MenuContextProvider.jsx'
import { VideoBig } from './components/index.jsx'
import PlaylistPage from './components/PlayList/PlaylistPage.jsx'
import SearchResultPage from './pages/SearchResultPage.jsx'
import LoadingBarContextProvider from './components/contexts/LoadingBar/LoadingBarProvider.jsx'
import Dashboard from './pages/Dashboard.jsx'
import DashboardVideoPage from './components/Dashboard/DashboardVideoPage.jsx'
import DashboardPlaylistPage from './components/Dashboard/DashboardPlaylistPage.jsx'
import DashboardTweetPage from './components/Dashboard/DashboardTweetPage.jsx'
import Settings from './pages/Settings.jsx'
import ChangePassword from './components/Settings/ChangePassword.jsx'
import UpdateCoverImage from './components/Settings/UpdateCoverImage.jsx'
import UpdateAvatar from './components/Settings/UpdateAvatar.jsx'
import UpdateAccDetails from './components/Settings/UpdateAccDetails.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
          path: "/history",
          element: <History/>
        },
        {
          path: "/liked-videos",
          element: <LikedVideos/>
        },
        {
          path: "/playlists",
          element: <Playlist/>
        },
        {
          path: "/subscriptions",
          element: <Subscription/>
        },
        {
          path: "/publishvideo",
          element: <PublishVideo/>
        },
        {
          path : "/playvideo",
          element: <VideoBig/>
        },
        {
          path : "/showplaylist",
          element: <PlaylistPage/>
        },
        {
          path : "/searchresult",
          element: <SearchResultPage/>
        },
        {
          path : "/dashboard",
          element: <Dashboard/>,
          children : [
            {
              path: "/dashboard/videos",
              element : <DashboardVideoPage/>
            },
            {
              path : "/dashboard/playlists",
              element : <DashboardPlaylistPage/>
            },
            {
              path : "/dashboard/tweets",
              element : <DashboardTweetPage/>
            }
          ]
        },
        {
          path : "/settings",
          element: <Settings/>,
          children : [
            {
              path : "/settings/changepassword",
              element: <ChangePassword/>
            },
            {
              path : "/settings/updatecoverimage",
              element: <UpdateCoverImage/>
            },
            {
              path: "/settings/updateavatar",
              element: <UpdateAvatar/>
            },
            {
              path: "/settings/updateaccountdetails",
              element: <UpdateAccDetails/>
            }
          ]
        }
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <AuthContextProvider>
      <MenuContextProvider>
        <LoadingBarContextProvider>
          <RouterProvider router={router}/>
        </LoadingBarContextProvider>
      </MenuContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
// When using StrictMode, React intentionally mounts components twice (only in development mode) to detect potential side effects.
// This means useEffect runs twice, even though you provided an empty dependency array ([]).