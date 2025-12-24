import { useEffect } from "react";
import { useLocation } from "react-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./nprogress-custom.css"; // optional custom color

NProgress.configure({ showSpinner: false });

export default function TopLoadingBar() {
  const location = useLocation();

  useEffect(() => {
    // Start progress on page change
    NProgress.start();

    // Simulate a short delay for loading
    const timer = setTimeout(() => {
      NProgress.done();
    }, 300); // adjust as needed or remove if actual loading is handled elsewhere

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location.pathname]);

  return null; // This component renders nothing
}
