import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import { SearchByName } from './components/NameSearch';
import {Event} from './components/Event';

console.log("ENV",process.env)

const router = createBrowserRouter([
  {
    path: "/scca-national-events/",
    element: <SearchByName />,
  },
  {
    path: "/scca-national-events/event",
    element: <Event />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
