import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './App.css';
import { SearchByName } from './components/NameSearch';
import {Event} from './components/Event';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchByName />,
  },
  {
    path: "/event",
    element: <Event />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
