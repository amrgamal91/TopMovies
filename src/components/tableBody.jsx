import React, { Component } from "react";
import nl2br from "react-newline-to-break";
import { Link } from "react-router-dom";
class TableBody extends Component {
  render() {
    if (this.props.genresMap === null) {
      console.log("returning null ............." + this.props.data);
      return null;
    }
    return (
      <tbody>
        {this.props.data.map(singleMovie => (
          <tr key={singleMovie.id}>
            <td>
              <img
                src={"http://image.tmdb.org/t/p/w92/" + singleMovie.poster_path}
                className="img-fluid"
                alt="movie poster"
              />{" "}
            </td>
            <td>
              <Link
                className="movie-meta-data title"
                to={`/movies/${singleMovie.id}`}
              >
                {singleMovie.title}
              </Link>
            </td>
            <td className="movie-meta-data">{singleMovie.release_date}</td>
            <td className="movie-meta-data rate">{singleMovie.vote_average}</td>
            <td className="movie-meta-data genre">
              {singleMovie !== null
                ? singleMovie.genre_ids.map(item =>
                    nl2br(this.props.genresMap.get(item) + "\n")
                  )
                : ""}
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
