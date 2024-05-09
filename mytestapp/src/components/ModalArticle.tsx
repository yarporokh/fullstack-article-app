import {ChangeEvent, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createArticle} from "../services/ArticleService.tsx";

export type ArticleForm = {
    title: string,
    content: string
}

interface ModalProps {
    articleModalRef: () => void,
    onCloseModal: () => void
}
export default function ModalArticle({articleModalRef, onCloseModal}: ModalProps) {
    const client = useQueryClient()

    const [articleForm, setArticleForm] = useState<ArticleForm>({
        title: '',
        content: ''
    })

    const mutation = useMutation({
        mutationFn: createArticle,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['articles'] })
        },
    })

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setArticleForm(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleArticle = () => {
        if (articleForm.content.trim() !== '' || articleForm.title.trim() !== '') {
            mutation.mutate(articleForm)
            setArticleForm({
                title: '',
                content: ''
            })
            onCloseModal()
        }
    }

    return (
        <dialog
            className='article-modal'
            ref={articleModalRef}>
            <h1>Article</h1>
            <label> Title</label>
            <br/>
            <input type='text' name="title" onChange={onChange} value={articleForm.title}/>
            <br/>
            <label> Content</label>
            <br/>
            <input type='text' name="content" onChange={onChange} value={articleForm.content}/>
            <div className='modal-footer'>
                <button onClick={handleArticle} className='submit-button'>Add</button>
                <button onClick={onCloseModal}>Close</button>
            </div>
        </dialog>
    )
}