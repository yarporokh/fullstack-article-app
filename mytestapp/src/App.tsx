import './App.css'
import {useRef} from "react";
import ArticleCard from "./components/ArticleCard.tsx";
import ModalArticle from "./components/ModalArticle.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteArticle, editArticle, fetchAllArticles} from "./services/ArticleService.tsx";
import {CircularProgress} from "@mui/material";

export type TArticle = {
    id: bigint,
    title: string,
    content: string

}

export default function App() {
    const client = useQueryClient()
    const modalRef = useRef<HTMLDialogElement>(null)
    const {data, isLoading, isError} = useQuery({queryKey: ['articles'], queryFn: fetchAllArticles})
    const onOpenModal = () => {
        modalRef.current?.showModal()
    }

    const onCloseModal = () => {
        modalRef.current?.close()
    }

    const deleteMutation = useMutation({
        mutationFn: deleteArticle,
        onSuccess: () => {
            client.invalidateQueries({queryKey: ['articles']})
        }
    })

    const onDelete = (article: TArticle) => {
        console.log(article)
        deleteMutation.mutate(article)
    }

    return (
        <div>
            <div className='header'>
                <button onClick={onOpenModal}>Add Article</button>
                <ModalArticle onCloseModal={onCloseModal} articleModalRef={modalRef}/>
            </div>
            <div className='article-list'>
                {isLoading && <CircularProgress/>}
                {isError && <div>Error fetching data</div>}
                {data?.data.map((article: TArticle) =>
                    <ArticleCard onDelete={onDelete} article={article} key={article.id}/>
                )}
            </div>
        </div>
    )
}
