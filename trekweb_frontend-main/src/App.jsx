import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Lazy Imports
const Home = lazy(() => import("./components/public/Home"));
const Login = lazy(() => import("./components/public/Login"));
const Register = lazy(() => import("./components/public/Register"));
const Layout = lazy(() => import("./components/private/Layout"));
const Checkout = lazy(() => import("./components/public/Checkout"));
const Faq = lazy(() => import("./components/public/Faq"));
const Terms = lazy(() => import("./components/public/Terms"));
const Privacy = lazy(() => import("./components/public/Privacy"));
const Aboutus = lazy(() => import("./components/public/Aboutus"));
const Contact = lazy(() => import("./components/public/Contact"));
const Review = lazy(() => import("./components/public/Review"));
const Favorite = lazy(() => import("./components/public/Favorite"));
const Myprofile = lazy(() => import("./components/public/Myprofile"));
const MyCart = lazy(() => import("./components/public/Mybooking"));
const EditProfile = lazy(() => import("./components/public/Editprofile"));
const PackageDetail = lazy(() => import("./components/public/PackageDetail"));
const Packages = lazy(() => import("./components/public/Packages"));

const Dashboard = lazy(() => import("./components/private/dashboard/Dashboard"));
const AddBikes = lazy(() => import("./components/private/packages/AddPackages"));
const ManageBikes = lazy(() => import("./components/private/packages/ManagePackages"));
const Pending = lazy(() => import("./components/private/bookings/Pending"));
const Confirmed = lazy(() => import("./components/private/bookings/Confirmed"));
const Payments = lazy(() => import("./components/private/payments/Payments"));
const Users = lazy(() => import("./components/private/users/Users"));
const Reviews = lazy(() => import("./components/private/reviews/Reviews"));
const Profile = lazy(() => import("./components/private/profile/profile"));
const Settings = lazy(() => import("./components/private/setting/settings"));

// Loading component
const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div>Loading...</div>
  </div>
);

function App() {
  const routes = [
    {
      path: "/",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Home />
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/register",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Register />
        </Suspense>
      ),
    },
    {
      path: "/checkout/:id",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Checkout />
        </Suspense>
      ),
    },
    {
      path: "/checkout",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Checkout />
        </Suspense>
      ),
    },
    {
      path: "/faq",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Faq />
        </Suspense>
      ),
    },
    {
      path: "/terms",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Terms />
        </Suspense>
      ),
    },
    {
      path: "/privacy",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Privacy />
        </Suspense>
      ),
    },
    {
      path: "/aboutus",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Aboutus />
        </Suspense>
      ),
    },
    {
      path: "/contact",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
      ),
    },
    {
      path: "/review",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Review />
        </Suspense>
      ),
    },
    {
      path: "/favorite",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Favorite />
        </Suspense>
      ),
    },
    {
      path: "/myprofile",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Myprofile />
        </Suspense>
      ),
    },
    {
      path: "/mybooking",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <MyCart />
        </Suspense>
      ),
    },
    {
      path: "/editprofile",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <EditProfile />
        </Suspense>
      ),
    },
    {
      path: "/packages",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Packages />
        </Suspense>
      ),
    },
    {
      path: "/packages/:id",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <PackageDetail />
        </Suspense>
      ),
    },
    {
      path: "/admin",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Layout />
        </Suspense>
      ),
      children: [
        { path: "dashboard", element: <Suspense fallback={<LoadingSpinner />}><Dashboard /></Suspense> },
        { path: "addpackages", element: <Suspense fallback={<LoadingSpinner />}><AddBikes /></Suspense> },
        { path: "managepackages", element: <Suspense fallback={<LoadingSpinner />}><ManageBikes /></Suspense> },
        { path: "pending", element: <Suspense fallback={<LoadingSpinner />}><Pending /></Suspense> },
        { path: "confirmed", element: <Suspense fallback={<LoadingSpinner />}><Confirmed /></Suspense> },
        { path: "payments", element: <Suspense fallback={<LoadingSpinner />}><Payments /></Suspense> },
        { path: "users", element: <Suspense fallback={<LoadingSpinner />}><Users /></Suspense> },
        { path: "reviews", element: <Suspense fallback={<LoadingSpinner />}><Reviews /></Suspense> },
        { path: "profile", element: <Suspense fallback={<LoadingSpinner />}><Profile /></Suspense> },
        { path: "settings", element: <Suspense fallback={<LoadingSpinner />}><Settings /></Suspense> },
      ],
    },
    { 
      path: "*", 
      element: <div style={{ padding: '20px', textAlign: 'center' }}>404: Page not found</div> 
    },
  ];

  return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App;
