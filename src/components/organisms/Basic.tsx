import Post from 'components/molecules/Post';
import Posts from 'components/molecules/Posts';
import React from 'react';

export const basicTextParagraph1 = "As you visit the posts below, you will notice them in a loading state the first time you load them. However, after you return to this list and click on any posts you have already visited again, you will see them load instantly and background refresh right before your eyes!"
export const basicTextParagraphStrong1 = "(You may need to throttle your network speed to simulate longer loading sequences)"
export const basicTextLoading = "...Loading";
export const basicTextError = "Error has been detected"

export interface IPostProps {
    setPostId: Function,
    postId: number
}

const Basic = () => {
    const [postId, setPostId] = React.useState(-1);
    return (
        <>
            <p>
                {basicTextParagraph1}
                <strong>
                    {basicTextParagraphStrong1}
                </strong>
            </p>
            {postId > -1 ? (
                <Post postId={postId} setPostId={setPostId} />
            ) : (
                    <Posts postId={-1} setPostId={setPostId} />
                )}
        </>
    )
}

export default Basic



