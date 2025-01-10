import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import Index from "./pages/Index";
import Orders from "./pages/dashboard/Orders";
import Users from "./pages/dashboard/Users";
import Stores from "./pages/dashboard/Stores";
import Campaigns from "./pages/dashboard/Campaigns";
import Categories from "./pages/dashboard/Categories";
import PlatformCategories from "./pages/dashboard/PlatformCategories";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />}>
              <Route path="/orders" element={<Orders />} />
              <Route path="/users" element={<Users />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/platform-categories" element={<PlatformCategories />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;