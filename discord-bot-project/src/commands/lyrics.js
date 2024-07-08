const fetch = require('node-fetch');

const getLyrics = async (songName) => {
    try {
        const response = await fetch(`https://api.lyrics.com/lyrics/${songName}`);
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        return data.lyrics;
    } catch (error) {
        console.error(`Error fetching lyrics: ${error.message}`);
        return null;
    }
};

module.exports = {
    getLyrics
};