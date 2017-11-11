import moment from 'moment';

const utils = {

	setRssToStorage: (key, value) => {
        localStorage[key] = JSON.stringify(value);
	},

    getRssFromStorage: (key) => {
        return localStorage[key] ? JSON.parse(localStorage[key]) : null;
    },

    deleteRssFromStorage: (key) => {
        localStorage.removeItem(key);
    },

    processDate: (date, format) => {
        return date ? moment(date).format(format || 'DD.MM.YYYY HH:mm') : null;
    }
};

export default utils;
