import {useEffect, useState} from "react";

import {deletePost, fetchPosts, updatePost} from "./api";
import {PostDetail} from "./PostDetail";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const maxPostPage = 10;

export function Posts() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPost, setSelectedPost] = useState(null);
    const queryClient = useQueryClient();
    // replace with useQuery
    const {data, isLoading, isError} = useQuery({
        queryKey: ["posts", currentPage],
        queryFn: () => fetchPosts(currentPage),
        staleTime: 2000,
    });
    const queryMutation = useMutation({
        mutationFn: (postID) => deletePost(postID),
    });

    const updatePostMutation = useMutation({
        mutationFn: (postID) => updatePost(postID),
    });
    useEffect(() => {
        if (currentPage < maxPostPage) {
            const nextPage = currentPage + 1;
            void queryClient.prefetchQuery({
                queryKey: ["posts", nextPage],
                queryFn: () => fetchPosts(nextPage),
            });

        }
    }, [currentPage, queryClient]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error fetching posts</div>
    }

    return (
        <>
            <ul>
                {data.map((post) => (
                    <li
                        key={post.id}
                        className="post-title"
                        onClick={() => {
                            queryMutation.reset();
                            updatePostMutation.reset();
                            setSelectedPost(post)
                        }
                        }
                    >
                        {post.title}
                    </li>
                ))}
            </ul>
            <div className="pages">
                <button disabled={currentPage <= 1} onClick={() => {
                    setCurrentPage(prevPage => prevPage - 1)
                }}>
                    Previous page
                </button>
                <span>Page {currentPage}</span>
                <button disabled={currentPage === maxPostPage} onClick={() => {
                    setCurrentPage(prevPage => prevPage + 1)
                }}>
                    Next page
                </button>
            </div>
            <hr/>
            {selectedPost &&
                <PostDetail post={selectedPost} queryMutation={queryMutation} updatePostMutation={updatePostMutation}/>}
        </>
    );
}
