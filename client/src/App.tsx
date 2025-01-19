import AppProvider from "./context/AppProvider";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <AppProvider>
      <AppRouter></AppRouter>
    </AppProvider>
  );
}

export default App;
