
# SoundScape API: Your Personal Playlist Engine 

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

SoundScape is a RESTful API that empowers you to create personalized playlists based on your mood and music preferences.

## MVP Features

* **Spotify Authentication:** Securely connect with your Spotify account to access your listening history.
* **User Functionality:**
    * User  login.
    * Retrieve authenticated user's profile information.

## Future Features

* **Music Energy Analysis:** Analyze your favorite tracks and discover your musical color palette.
* **Playlist Generation:** Create custom playlists that match your mood and energy.
* **Interactive Visualizations:** Explore your musical universe through colorful visualizations.
* **Integration with Other Platforms:** Connect your Apple Music, YouTube Music, and more accounts.

## Technologies Used

* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Mongoose)
* **API:** Spotify Web API

## Installation and Setup

1. **Clone the repository:** `https://github.com/Andy6440/soundspace.git`
2. **Environment Variables:**
   * Create a `.env` file in the project root and add the following variables:
      ```
      PORT=8888
      REDIRECT_URI=http://localhost:8888/callback
      CLIENT_SECRET=<your_spotify_client_secret>
      CLIENT_ID=<your_spotify_client_id>
      BASE_URL=[https://accounts.spotify.com/api](https://accounts.spotify.com/api)
      API_SPOTIFY_URL=[https://api.spotify.com/v1](https://api.spotify.com/v1)
      MONGO_USER=<your_mongodb_username>
      MONGO_PASS=<your_mongodb_password>
      MONGO_DB=<your_mogodb_dbname>
      ```
3. **Install dependencies:** `npm install`
4. **Run the server:** `npm run dev`
## Usage (Main Endpoints)

* **`POST /login`:** Log in with an existing user.

## Contributing

Contributions are welcome! Please read the [contribution guidelines](CONTRIBUTING.md) before making a contribution.

## License

SoundScape is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
