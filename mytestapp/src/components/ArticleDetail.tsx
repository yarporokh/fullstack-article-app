import {Link, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {editArticle, fetchArticleById} from "../services/ArticleService.tsx";
import {CircularProgress} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import {TArticle} from "../App.tsx";

export default function ArticleDetail() {
    const client = useQueryClient()
    const params = useParams<{ articleId: string }>()
    const {data, isSuccess, isLoading, isError} = useQuery({
        queryKey: ['article', params.articleId]
        , queryFn: () => fetchArticleById(params.articleId)
    })
    const [editForm, setEditForm] = useState<TArticle>({
        id: null,
        title: '',
        content: ''
    })

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditForm(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    useEffect(() => {
        if (isSuccess && data.data) {
            const {id, title, content} = data.data;
            setEditForm({id,title, content});
        }
    }, [data, isSuccess]);

    const editMutation = useMutation({
        mutationFn: editArticle,
        onSuccess: () => {
            client.invalidateQueries({queryKey: [{'article': params.articleId}, 'articles']})
        }
    })


    const onEdit = () => {
        if (editForm.content.trim() !== '' || editForm.title.trim() !== '') {
            editMutation.mutate(editForm)
        }
    }

    return (
        <div className='edit-main'>
            <div className='edit-form'>
                <Link to={'/'}>Back</Link>
                {isLoading && <CircularProgress/>}
                {isError && <div>Error fetching data</div>}
                {
                    data !== undefined &&
                    <div>
                        <div className='article-detail'>
                            <label> Title</label>
                            <br/>
                            <input type='text' name="title" onChange={onChange} value={editForm.title}/>
                            <br/>
                            <label> Content</label>
                            <br/>
                            <input type='text' name="content" onChange={onChange} value={editForm.content}/>
                            <div>
                                <button onClick={onEdit}>Edit</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}