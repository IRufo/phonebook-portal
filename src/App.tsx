// App.tsx
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/authContext";
import { Provider } from "./components/ui/provider"

const App = () => {
  return (
    <BrowserRouter>  
      <Provider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
