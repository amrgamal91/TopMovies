import React, { Component } from "react";
import { getMovieInfo, getMovieCast } from "../services/moviesService";
class MovieForm extends Component {
  state = { data: "", cast: [] };

  /**
   * get all info of the current movie through the API
   * get staff of the current Movie then update state & set background
   */
  async componentDidMount() {
    const { data } = await getMovieInfo(this.props.match.params.id);
    this.getCast();
    this.setState({ data });
    this.setBackgroundImage(
      "https://image.tmdb.org/t/p/original" + this.state.data.backdrop_path
    );
  }

  /**
   * remove the background(current movie poster) when unmount so that,
   * it could not be set for the parent Component (movie component)
   */
  componentWillUnmount() {
    document.body.style.backgroundImage = "";
  }

  /**
   * get staff of the current movie
   * set cast state
   */
  async getCast() {
    const { data } = await getMovieCast(this.props.match.params.id);
    this.setState({ cast: data });
  }

  /**
   * set the background of current movie
   * @param {string} path path of the image online
   */
  setBackgroundImage(path) {
    let backdropIMG = path;
    document.body.style.backgroundImage = "url(" + backdropIMG + ")";
    document.body.style.backgroundSize = "cover";
    document.body.style.repeat = "no-repeat";
  }

  /**
   * get genres names from list of genres objects
   * @param {array} genreList array of genres objs
   * returns : list of comma seprated genre names (for current movie)
   */
  getGenreNames(genreList) {
    let genreNames = "";
    if (genreList) {
      genreList.forEach(element => {
        if (genreNames !== "") genreNames += " , ";
        genreNames += element.name;
      });
    }
    return genreNames;
  }

  /**
   * get production companies names from list of prod comps objs
   * @param {array} companiesList array of comps objs
   * returns : list of comma seprated prod companies names
   */
  getProductionCompanies(companiesList) {
    let companiesNames = "";
    if (companiesList) {
      companiesList.forEach(element => {
        if (companiesNames !== "") companiesNames += " , ";
        companiesNames += element.name;
      });
    }
    return companiesNames;
  }

  /**
   * get cast names from list of cast objs
   * @param {array} castList array of cast objs
   * returns : just first 4 names of actors from cast
   */
  getCastNames(castList) {
    let cast = "";
    if (castList) {
      castList.slice(0, 4).forEach(element => {
        if (cast !== "") cast += " , ";
        cast += element.name;
      });
    }
    return cast;
  }

  render() {
    return (
      <div className="row justify-content-center padding-outer">
        <div className="cardcont col-xs-12 col-md-12 col-lg-10 padding-inner">
          <div className="row flex-column-reverse flex-sm-row">
            <div className="col-md-6 col-lg-6">
              <img
                id="posterContent"
                className="poster img-fluid"
                src={
                  "https://image.tmdb.org/t/p/w500/" +
                  this.state.data.poster_path
                }
                style={{ height: "auto" }}
                alt="Poster Content"
              />
            </div>
            <div className="col-md-6 col-lg-6">
              <div className="meta-data">
                <h1 className="movie-title">
                  {this.state.data.original_title}
                </h1>
                <span className="tagline subtitles">
                  {this.state.data.tagline}
                </span>
                <p className="overview">{this.state.data.overview}</p>
                <div>
                  <span className="genre-list subtitles">
                    {this.getGenreNames(this.state.data.genres)}
                  </span>
                  <span className="cast">
                    {this.getCastNames(this.state.cast.cast)}
                  </span>
                  <br /> <br />
                  <span className="production-list prod">
                    {this.getProductionCompanies(
                      this.state.data.production_companies
                    )}
                  </span>
                  <br /> <br />
                  <div className="row nopadding release-details">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 meta-data-element">
                      <span className="subtitles">Original Release:</span>
                      <span className="meta-data-val">
                        {this.state.data.release_date}
                      </span>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 meta-data-element">
                      <span className="subtitles">Running Time:</span>
                      <span className="meta-data-val">
                        {this.state.data.runtime} mins
                      </span>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 meta-data-element">
                      <span className="subtitles">Box Office:</span>
                      <span className="meta-data-val">
                        {this.state.data.revenue > 0
                          ? Number(this.state.data.revenue).toLocaleString(
                              "en"
                            ) + " $"
                          : "N/A"}
                      </span>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 meta-data-element">
                      <span className="subtitles">Vote Average:</span>
                      <span className="meta-data-val">
                        {this.state.data.vote_average + " /10"}
                      </span>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 meta-data-element">
                      <span className="subtitles">Budget:</span>
                      <span className="meta-data-val">
                        {this.state.data.budget < 0
                          ? Number(this.state.data.budget).toLocaleString(
                              "en"
                            ) + " $"
                          : "N/A"}
                      </span>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 meta-data-element">
                      <span className="subtitles">Adult only:</span>
                      <span className="meta-data-val">
                        {this.state.data.adult ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieForm;
