const movies = [
  {
    id: "1",
    title: "Bicycle",
    director: "Olga Johns",
    producer: "Bradley Wuckert",
    musicComposer: "Nathaniel Hintz PhD",
    stuntChoreographer: "Mindy Hayes",
    imageUrl : 'https://images-platform.99static.com/7CbfbSG80MwZ6NGUpXoM8olp0MI=/0x473:1265x1738/500x500/top/smart/99designs-contests-attachments/143/143395/attachment_143395173',
  },
  {
    id: "2",
    title: "Skyline",
    director: "John Doe",
    producer: "Jane Smith",
    musicComposer: "John Williams",
    stuntChoreographer: "Tom Cruise",
    imageUrl : 'https://c8.alamy.com/comp/F6MWP7/release-date-november-12-2010-movie-title-skyline-studio-relativity-F6MWP7.jpg',
  },
  {
    id: "3",
    title: "Ocean's Eleven",
    director: "Steven Soderbergh",
    producer: "Jerry Weintraub",
    musicComposer: "David Holmes",
    stuntChoreographer: "Kenny Bates",
    imageUrl : 'https://c8.alamy.com/comp/2K83HC0/movie-poster-film-oceans-eleven-oceans-11-usa-2001-director-steven-soderbergh-05-december-2001-warning-this-photograph-is-for-editorial-use-only-and-is-the-copyright-of-warner-bros-andor-the-photographer-assigned-by-the-film-or-production-company-and-can-only-be-reproduced-by-publications-in-conjunction-with-the-promotion-of-the-above-film-a-mandatory-credit-to-warner-bros-is-required-the-photographer-should-also-be-credited-when-known-no-commercial-use-can-be-granted-without-written-authority-from-the-film-company-2K83HC0.jpg',
  },
  {
    id: "4",
    title: "Inception",
    director: "Christopher Nolan",
    producer: "Emma Thomas",
    musicComposer: "Hans Zimmer",
    stuntChoreographer: "Paul Jennings",
    imageUrl : 'https://e1.pxfuel.com/desktop-wallpaper/108/586/desktop-wallpaper-inception-movie-inception-thumbnail.jpg',
  },
  {
    id: "5",
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    producer: "Joel Silver",
    musicComposer: "Don Davis",
    stuntChoreographer: "Yuen Woo-ping",
    imageUrl : 'https://i.etsystatic.com/10683147/r/il/681bd4/2817373083/il_1080xN.2817373083_s4xz.jpg',
  },
  {
    id: "6",
    title: "Interstellar",
    director: "Christopher Nolan",
    producer: "Emma Thomas",
    musicComposer: "Hans Zimmer",
    stuntChoreographer: "Tom Struthers",
    imageUrl : 'https://myhotposters.com/cdn/shop/products/HP2474_48600699-e959-40e6-b46a-6a3e62c0a2b3_1024x1024.jpg?v=1571444853',
  },
  {
    id: "7",
    title: "The Dark Knight",
    director: "Christopher Nolan",
    producer: "Charles Roven",
    musicComposer: "Hans Zimmer, James Newton Howard",
    stuntChoreographer: "Glen Foster",
    imageUrl : 'https://i0.wp.com/baddogposters.com/wp-content/uploads/2023/02/xl23darkknightrisesptr10101102.jpg?fit=371%2C550&ssl=1',
  },
  {
    id: "8",
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    producer: "Niki Marvin",
    musicComposer: "Thomas Newman",
    stuntChoreographer: "Mickey Gilbert",
    imageUrl : 'https://amherstcinema.org/sites/default/files/styles/field_image_front/public/ShawshankWeb2.jpg?itok=u7u-tNqy',
  },
  {
    id: "9",
    title: "The Godfather",
    director: "Francis Ford Coppola",
    producer: "Albert S. Ruddy",
    musicComposer: "Nino Rota",
    stuntChoreographer: "Richard E. Johnson",
    imageUrl : 'https://variety.com/wp-content/uploads/2017/01/godfather.jpg?w=1000',
  },
  {
    id: "10",
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    producer: "Lawrence Bender",
    musicComposer: "Various Artists",
    stuntChoreographer: "Michele Clapton",
    imageUrl : 'https://www.rollingstone.com/wp-content/uploads/2018/06/rs-18853-20140521-pulpfiction-x1800-1400688719.jpg?w=1600&h=900&crop=1',
  },
];


export const fetchMovieFromJSON = async (id) => {
  return new Promise((resolve, reject) => {
    const movie = movies.find((m) => m.id === id.toString());

    if (movie) {
      resolve(movie);
    } else {
      reject(new Error("Movie not found"));
    }
  });
};
