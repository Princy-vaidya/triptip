import {Dimensions} from 'react-native';

export const base_url = 'https://nodeserver.mydevfactory.com:6004/api'
export const GOOGLE_KEY = 'AIzaSyDcZfnitFfPtLPAz1NoYC43c6AJMg7jrG0'
export const EVENT_KEY = 'ASSFN4TyGRhfjWwDnNWDrW9qJBFVMvzD'

export const OPENTRIP_KEY = '5ae2e3f221c38a28845f05b608f2d3d3c1fbc3d75b2de2d4f94429e5'
export const WIKIDATA = 'https://www.wikidata.org/wiki/Special:EntityData/'
export const OSM_DATA = 'https://api.openstreetmap.org/api/0.6/node/3565444993.json'

export const WIKI_IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/commons/'
export const FETCH_TITLE = 'https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=sitelinks&ids='
export const FETCH_ARTICLE = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles='

export const ZOMATO_KEY = 'e9ec664cab5210079aa23c74c3a10ef1'

export const FONT = {
  SIZE: {
    SMALL: 14,
    MEDIUM: 16,
    LARGE: 18,
    BIG: 20,
    EXTRALARGE: 22,
  },
  FAMILY: {
    REGULAR: 'Roboto-Regular',
    SEMI_BOLD: 'Roboto-Medium',
    BOLD: 'Roboto-Bold',
  },
};

export const HEIGHT = Dimensions.get('window').height;
export const WIDTH = Dimensions.get('window').width;

export const COLORS = {
  PRIMARY: '#c21240',
  SECONDARY: '#eb446f',
  WHITE: '#ffffff',
  GRAY: '#e7bcc7',
  TRANSPARENT: 'transparent',
  BLACK: '#000000'
};

export const GAP = {
  SMALL: 10,
  MEDIUM: 20,
  LARGE: 30,
};

export const PLACE_TYPE = {
  EVENTS: 'events',
  ART_GALLERY: 'art_galleries',
  BAR: 'bars',
  CAFE: 'cafes',
  MUSEUM: 'museums',
  ATTRACTION: 'interesting_places',
  RESTAURANT: 'foods'
}
export const PLACE_COLOR = {
  all: '#60bb60',
  events: '#239B56',
  art_galleries: '#F39C12',
  museums: '#3498DB',
  interesting_places: '#8E44AD',
  foods: '#D35400',
  cafes: '#D35440',
  bars: '#F82352'
}