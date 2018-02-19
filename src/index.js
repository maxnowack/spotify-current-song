import express from 'express';
import spotify, { refreshToken } from './spotify';

const app = express();
app.listen(process.env.PORT || 3000);

app.get('/saveSong', (req, res) => {
  (async () => {
    await refreshToken();
    const { body: currentSong } = await spotify.getMyCurrentPlayingTrack();
    if (!currentSong.is_playing) return 'notplaying';
    const songId = currentSong.item.id;

    await spotify.addToMySavedTracks([songId]);
    return `${currentSong.item.artists[0].name} - ${currentSong.item.name}`;
  })()
    .then(result => res.end(result.toString()))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.toString());
    });
});
