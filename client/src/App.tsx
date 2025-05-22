import { Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "./components/ui/tooltip";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Appointment from "./pages/Appointment";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Layout>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/rendez-vous" component={Appointment} />
      <Route path="/temoignages" component={Testimonials} />
      <Route path="/contact" component={Contact} />
      <Route> <NotFound /> </Route>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
