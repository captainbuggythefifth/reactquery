import requestor from 'services/http/Requestor';

const url = "https://api.github.com/users/tannerlinsley";
const urlRepo = "https://api.github.com/repos/tannerlinsley"

const getAll = async () => {
    

    const requestorLibrary = requestor.getLibrary();

    const result = await requestorLibrary.execute({
        url: `${url}/repos?sort=updated`,
        method: "GET"
    });
    
    if (result.error) {
        return undefined
    }

    return result.response.data
    
}

const getByName = async (name: string) => {
    
    const requestorLibrary = requestor.getLibrary();

    const result = await requestorLibrary.execute({
        url: `${urlRepo}/${name}`,
        method: "GET"
    });
    
    if (result.error) {
        return undefined
    }

    return result.response.data
}

export {
    getAll,
    getByName
}