import requestor from 'services/http/Requestor';

const url = "https://jsonplaceholder.typicode.com/posts";

const getAll = async () => {
    

    const requestorLibrary = requestor.getLibrary();

    const result = await requestorLibrary.execute({
        url,
        method: "GET"
    });
    
    if (result.error) {
        return undefined
    }

    return result.response.data
    
}

const getById = async (postID: number) => {
    
    const requestorLibrary = requestor.getLibrary();

    const result = await requestorLibrary.execute({
        url: `${url}/${postID}`,
        method: "GET"
    });
    
    if (result.error) {
        return undefined
    }

    return result.response.data
}

export {
    getAll,
    getById
}