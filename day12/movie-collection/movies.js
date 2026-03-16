let movies = [];
const defaultGenre = "Unknown"; 
var count = 0;                 

// 영화 객체 3개를 하드코딩으로 추가
movies.push({ title: "왕과사는남자", director: "장항준", year: 2026, genre: "드라마" });
movies.push({ title: "인셉션", director: "크리스토퍼 놀란", year: 2010, genre: "SF" });
movies.push({ title: "파묘", director: "장재현", year: 2024, genre: "미스터리" }); 


// 영화 목록을 출력함수
function printMovies(movieArray) {
  console.log("Movie Collection:");

  for (let i = 0; i < movieArray.length; i++) {
    let movie = movieArray[i]; 
    count++;
    if (!movie.director) {
      movie.director = "Unknown";
    }

 console.log(count + ". Title: " + movie.title + ", Director: " + movie.director + ", Year: " + movie.year + ", Genre: " + movie.genre);
  }
 console.log("Total Movies: " + count);
}


printMovies(movies);