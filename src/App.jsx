import { MainLayout } from "./components/MainLayouts";
import { HeaderWidget } from "./components/widgets";

function App() {
  return (
    <MainLayout.NavAndFooter>
      <HeaderWidget />
    </MainLayout.NavAndFooter>
  );
}

export default App;
