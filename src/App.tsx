import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import Index from "./pages/Index";
import Orders from "./pages/dashboard/Orders";
import OrderDetails from "./pages/dashboard/OrderDetails";
import Users from "./pages/dashboard/Users";
import Stores from "./pages/dashboard/Stores";
import Campaigns from "./pages/dashboard/Campaigns";
import Categories from "./pages/dashboard/Categories";
import PlatformCategories from "./pages/dashboard/PlatformCategories";
import Settings from "./pages/dashboard/Settings";
import RadiusSettings from "./pages/dashboard/RadiusSettings";
import Promotions from "./pages/dashboard/Promotions";
import Reviews from "./pages/dashboard/Reviews";
import Inventory from "./pages/dashboard/Inventory";
import SupportTickets from "./pages/dashboard/SupportTickets";
import SupportChat from "./pages/dashboard/SupportChat";
import Reports from "./pages/dashboard/Reports";
import Payments from "./pages/dashboard/Payments";
import DeliveryPartners from "./pages/dashboard/DeliveryPartners";
import AddCity from "./pages/dashboard/AddCity";

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
              <Route path="/orders/:id" element={<OrderDetails />} />
              <Route path="/users" element={<Users />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/platform-categories" element={<PlatformCategories />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/radius-settings" element={<RadiusSettings />} />
              <Route path="/add-city" element={<AddCity />} />
              <Route path="/promotions" element={<Promotions />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/support-tickets" element={<SupportTickets />} />
              <Route path="/support-chat" element={<SupportChat />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/delivery-partners" element={<DeliveryPartners />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
