import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "es6-shim";
import App from "./App.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <CookiesProvider
      defaultSetOptions={{ path: "/", sameSite: "none", secure: true }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </QueryClientProvider>
);
