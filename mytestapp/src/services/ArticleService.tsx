import axios from "axios";
import {ArticleForm} from "../components/ModalArticle.tsx";
import {TArticle} from "../App.tsx";

const apiURL: string = "http://localhost:8080/api/v1/articles"

export async function fetchAllArticles() {
    return await axios.get(apiURL)
}

export async function createArticle(article: ArticleForm) {
    return await axios.post(apiURL, article)
}

export async function fetchArticleById(id: string) {
    return await axios.get(`${apiURL}/${id}`)
}

export async function editArticle(article: TArticle) {
    return await axios.put(apiURL, article)
}

export async function deleteArticle(article: TArticle) {
    return await axios.delete(apiURL, {data: article})
}