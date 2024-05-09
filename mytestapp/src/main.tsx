import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ArticleDetail from "./components/ArticleDetail.tsx";

const client = new QueryClient()
const router = createBrowserRouter([{
    path: '/',
    element: <App/>
},
    {
        path: "/:articleId",
        element: <ArticleDetail/>,
    }]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={client}>
        <RouterProvider router={router}/>
    </QueryClientProvider>
)
