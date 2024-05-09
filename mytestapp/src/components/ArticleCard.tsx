import {Link} from "react-router-dom";
import {TArticle} from "../App.tsx";

export default function ArticleCard({article, onDelete}: { article: TArticle, onDelete: (article: TArticle) => void }) {
    return (
        <div className='article-card'>
            <h3>{article.title}</h3>
            <span>{article.content}</span>
            <br/>
            <button onClick={() => onDelete(article)}>Delete</button>
            <Link key={article.id} to={`${article.id}`}>Open</Link>
        </div>
    )
}