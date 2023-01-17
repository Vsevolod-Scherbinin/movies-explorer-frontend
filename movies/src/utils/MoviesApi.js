class MoviesApi {
  constructor(host, headers, corsHeaders) {
    this._host = host;
    this._headers = headers;
    // this._corsHeaders = corsHeaders;
  }

  _getResOrError(res){
    if (res.ok){
      return res.json();
    }
    throw new Error('Ошибка при загрузке данных');
  }

  getMovies() {
    return fetch(this._host, {
      method: 'GET',
      headers: this._headers,
      // credentials: 'include',
      // mode: 'cors',
    })
      .then(this._getResOrError);
  }
}

export const moviesApi = new MoviesApi('https://api.nomoreparties.co/beatfilm-movies', {'Content-Type': 'application/json'});
