import {fetchComments} from "./api";
import "./PostDetail.css";
import {useQuery} from "@tanstack/react-query";

export function PostDetail({post, queryMutation, updatePostMutation}) {
    // replace with useQuery
    const {data, isLoading, isError} = useQuery({
        queryKey: ["comments", post.id],
        queryFn: () => fetchComments(post.id),
        staleTime: 2000,
    });

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error fetching comments</div>
    }


    return (
        <>
            <h3 style={{color: "blue"}}>{post.title}</h3>
            <div>

                <button onClick={() => queryMutation.mutate(post.id)}>Delete</button>
                {queryMutation.isPending && <div className={'loading'}>Deleting...</div>}
                {queryMutation.isError && <div className={'error'}>Error deleting post</div>}
                {queryMutation.isSuccess && <div className={'success'}>Post deleted</div>}
            </div>
            <div>
                <button onClick={() => updatePostMutation.mutate()}>Update title</button>
                {updatePostMutation.isPending && <div className={'loading'}>Updating...</div>}
                {updatePostMutation.isError && <div className={'error'}>Error Updating post</div>}
                {updatePostMutation.isSuccess && <div className={'success'}>Post Updated</div>}
            </div>
            <p>{post.body}</p>
            <h4>Comments</h4>
            {data.map((comment) => (
                <li key={comment.id}>
                    {comment.email}: {comment.body}
                </li>
            ))}
        </>
    );
}
