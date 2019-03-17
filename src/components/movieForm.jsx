import React, { Component } from "react";
import { getMovieInfo, getMovieCast } from "../services/moviesService";

class MovieForm extends Component {
  state = { data: "", cast: [] };

  async componentDidMount() {
    const { data } = await getMovieInfo(this.props.match.params.id);
    this.getCast();
    this.setState({ data });
    this.setBackgroundImage(this.state.data.backdrop_path);
  }
  async getCast() {
    const { data } = await getMovieCast(this.props.match.params.id);
    this.setState({ cast: data });
  }
  setBackgroundImage(path) {
    let backdropIMG = "https://image.tmdb.org/t/p/original" + path;
    document.body.style.backgroundImage = "url(" + backdropIMG + ")";
    document.body.style.backgroundSize = "cover";
    document.body.style.repeat = "no-repeat";
  }
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
                  "http://image.tmdb.org/t/p/w500/" +
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
                  {/* <br /> */}
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
