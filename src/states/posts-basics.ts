import { useQuery, useQueryCache } from "react-query";
import { POST } from "services/api";

const POSTS_BASIC_STATE = "posts-basic";
const POST_BASIC_STATE = "post-basic";



export const usePostsBasicQuery = () => {
    return useQuery(POSTS_BASIC_STATE, async () => {
        return await POST.getAll();
    });
}

export const usePostBasicQuery = (postID: number) => {
    return useQuery([POST_BASIC_STATE, postID], async () => {
        return await POST.getById(postID)
    }, {
        enabled: postID,
    });
}

export const usePostBasicQueryCache = (postID: number) => {
    const cache = useQueryCache();
    return cache.getQueryData([POST_BASIC_STATE, postID]);
}