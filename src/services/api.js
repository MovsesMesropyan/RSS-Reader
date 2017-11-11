import axios from 'axios';

const rssReaderAppAPI = {
    /* Home */
	getRssList: () => {
		return axios.get(`/api/rss`);
	}
};

export default rssReaderAppAPI;
