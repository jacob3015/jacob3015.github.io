import logger from 'custom-logger';
import HttpError from 'http-error';
import NetworkError from 'network-error';

/**
 * Fetches data from the specified URL and returns a promise that resolves the response.
 * 
 * @param {string} url The URL to fetch data.
 * @returns {Promise<Response>} A promise that resolves the response.
 * @throws {HttpError} if response status is not ok (response.ok is false).
 * @throws {NetworkError} if there is a network issue (e.g., a TypeError occurs).
 */
async function handleFetch(url) {
    logger.debug('', 'handleFetch', url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new HttpError('response is not ok', response.status);
        }
        return response;
    } catch (error) {
        logger.error(error, `failed to fetch ${url}`, 'handleFetch', url);
        if (error instanceof TypeError) {
            throw new NetworkError(`network error while fetching ${url}`);
        }
        throw error
    }
}

/**
 * fetcher for the following assets;
 * json
 */
const jsonFetcher = {

    /**
     * Fetches data from the specified URL and returns a promise that resolves to json.
     * 
     * @param {string} url The URL to fetch data.
     * @returns {Promise<Object>} A promise that resolves to json.
     * @throws {HttpError} if response status is not ok.
     * @throws {NetworkError} if there is a network issue.
     * @throws {TypeError} if there is a decoding issue with the body content.
     * @throws {SyntaxError} if the response body cannot be parsed as json.
     */
    fetch: async function(url) {
        try {
            const response = await handleFetch(url);
            return response.json();
        } catch (error) {
            logger.error(error, `failed to fetch ${url}`, 'jsonFetcher fetch', url);
            throw error;
        }
    }
}

/**
 * fetcher for the following assets;
 * html, markdown
 */
const textFetcher = {

    /**
     * Fetches data from the specified URL and returns a promise that resolves to string.
     * 
     * @param {string} url The URL to fetch data.
     * @returns {Promise<string>} A promise that resolves to string.
     * @throws {HttpError} if response status is not ok.
     * @throws {NetworkError} if there is a network issue.
     * @throws {TypeError} if there is a decoding issue with the body content.
     */
    fetch: async function(url) {
        try {
            const response = await handleFetch(url);
            return response.text();
        } catch (error) {
            logger.error(error, `failed to fetch ${url}`, 'textFetcher fetch', url);
            throw error;
        }
    }
}

/**
 * fetcher for the following assets;
 * wav, image
 */
const blobFetcher = {

    /**
     * Fetches data from the specified URL and returns a promise that resolves to blob.
     * 
     * @param {string} url The URL to fetch data.
     * @returns {Promise<Blob>} A promise that resolves to blob.
     * @throws {HttpError} if response status is not ok.
     * @throws {NetworkError} if there is a network issue.
     * @throws {TypeError} if there is a decoding issue with the body content.
     */
    fetch: async function(url) {
        try {
            const response = await handleFetch(url);
            return response.blob();
        } catch (error) {
            logger.error(error, `failed to fetch ${url}`, 'blobFetcher fetch', url);
            throw error;
        }
    }
}

export {
    jsonFetcher,
    textFetcher,
    blobFetcher
}