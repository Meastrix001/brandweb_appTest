export interface Game {
    id:                          number;
    slug:                        string;
    name:                        string;
    name_original:               string;
    description:                 string;
    metacritic:                  number;
    // metacritic_platforms:        AddedByStatus[];
    released:                    String;
    tba:                         boolean;
    updated:                     Date;
    background_image:            string;
    developers:                  developers[];
    background_image_additional: string;
    website:                     string;
    rating:                      number;
    rating_top:                  number;
    description_raw:             string;
    ratings:                     Rating[];
    // reactions:                   AddedByStatus;
    added:                       number;
    // added_by_status:             AddedByStatus;
    playtime:                    number;
    screenshots_count:           number;
    movies_count:                number;
    creators_count:              number;
    achievements_count:          number;
    parent_achievements_count:   string;
    reddit_url:                  string;
    reddit_name:                 string;
    reddit_description:          string;
    reddit_logo:                 string;
    reddit_count:                number;
    twitch_count:                string;
    youtube_count:               string;
    reviews_text_count:          string;
    ratings_count:               number;
    suggestions_count:           number;
    alternative_names:           string[];
    metacritic_url:              string;
    parents_count:               number;
    additions_count:             number;
    game_series_count:           number;
    esrb_rating:                 EsrbRating;
    platforms:                   Platform[];
    publishers:                  Publishers[];
    stores:                      Stores[]
  };

  export interface developers {
    games_count:                number;
    id:                         number;
    image_background:           string;
    name:                       string;
    slug:                       string 
  }

  export interface EsrbRating {
    id:   number;
    slug: string;
    name: string;
}

export interface Platform {
    platform:     EsrbRating;
    released_at:  string;
    slug: String
    requirements: Requirements;
}

export interface Requirements {
  minimum:     string;
  recommended:  string;
}

export interface Publishers {
  games_count:                number;
  id:                         number;
  image_background:           string;
  name:                       string;
  slug:                       string;
}

export interface Stores {
  id:                         number;
  store:                      Store[];  
  url:                        string;
}

export interface Store {
  domain:                     string;
  games_count:                number;
  id:                         number;
  image_background:           string;
  name:                       string;
  slug:                       string;
}

export interface Rating {
  count:                      number;
  id:                         number;
  percent:                    number;
  title:                      string;
}


  

  