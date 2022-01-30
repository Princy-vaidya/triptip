import NetInfo from "@react-native-community/netinfo";
import {GOOGLE_KEY, EVENT_KEY, OPENTRIP_KEY, WIKIDATA, WIKI_IMAGE_URL, FETCH_TITLE, FETCH_ARTICLE, ZOMATO_KEY} from '../Utils/constants'
import axios from 'axios'
import Toast from 'react-native-root-toast';
import md5 from 'md5'

export const FetchNearbyPlaces = (location, type, radius) => {
  return new Promise((resolve, reject) => {
    NetInfo.fetch().then(state => {
      if(state.isConnected) {
        const url = !type ? `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${location.lng}&lat=${location.lat}&src_attr=wikidata&limit=50&format=json&apikey=${OPENTRIP_KEY}` :
        `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${location.lng}&lat=${location.lat}&limit=50&kinds=${type}&src_attr=wikidata&format=json&apikey=${OPENTRIP_KEY}`
        
        axios({
          method: 'GET',
          url: url,
          headers: {
           'Content-Type': 'application/json',
          }
        })
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          Toast.show('Something went wrong. Please try again !')
          reject('jjj',JSON.stringify(error))
        });
      } else {
        reject('No connection')
        Toast.show('Please check your internet connection !', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM
        })
      }
    });
  })
}

export const fetchEvents = (lat, lng, radius, start, end) => {
  return new Promise((resolve, reject) => {
  NetInfo.fetch().then(state => {
    if(state.isConnected) {
      const url = start != null ? `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${EVENT_KEY}&latlng=${lat},${lng}&startDateTime=${start}&endDateTime=${end}` :
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${EVENT_KEY}&latlng=${lat},${lng}`
      console.log("URL", url, start, end);
      
      axios({
        method: 'GET',
        url: url,
        headers: {
         'Content-Type': 'application/json',
        }
      })
      .then(function (response) {
        console.log("Events", response);
        resolve(response.data)
      })
      .catch(function (error) {
        console.log('r',error);
        Toast.show('Something went wrong. Please try again !')
        reject('e',error)
      });
    } else {
      reject('No connection')
      Toast.show('Please check your internet connection !', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      })
    }
  });
})
}

export const fetchResturents = (lat,lng) => {
  
  return new Promise((resolve, reject) => {
  NetInfo.fetch().then(state => {
    if(state.isConnected) {
      // const url = `https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${lng}&radius=${radius}&start=${start}`
      const url =`https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${lat,lng}&key=AIzaSyDcZfnitFfPtLPAz1NoYC43c6AJMg7jrG0`
     
      axios({
        method: 'GET',
        url: url,
        // headers: {
        //  'Content-Type': 'application/json',
        //  "user-key": ZOMATO_KEY
        // }
      })
      .then(function (response) {
        console.log("Restourents", response);
        resolve(response.data)
      })
      .catch(function (error) {
        console.log('error',error);
        Toast.show('Something went wrong. Please try again !')
        reject('error',error)
      });
    } else {
      reject('No connection')
      Toast.show('Please check your internet connection !', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      })
    }
  });
})
}


export const fetchZomatoResturents = (lat, lng) => {
  return new Promise((resolve, reject) => {
  NetInfo.fetch().then(state => {
    if(state.isConnected) {
      // const url = `https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${lng}&radius=${radius}&start=${start}`
      const url = `https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${lng}`
      axios({
        method: 'GET',
        url: url,
        // headers: {
        //  'Content-Type': 'application/json',
        //  "user-key": ZOMATO_KEY
        // }
      })
      .then(function (response) {
        console.log("Restourents", response);
        resolve(response.data)
      })
      .catch(function (error) {
        console.log('error',error);
        Toast.show('Something went wrong. Please try again !')
        reject('error',error)
      });
    } else {
      reject('No connection')
      Toast.show('Please check your internet connection !', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      })
    }
  });
})
}


export const fetchDistance = (origin, destination) => {
  const distanceMatrixApi = "https://maps.googleapis.com/maps/api/distancematrix/json?"
  const MODE = "driving"
  return new Promise((resolve, reject) => {
  NetInfo.fetch().then(state => {
    if(state.isConnected) {
      axios({
        method: 'GET',
        url: `${distanceMatrixApi}origins=${origin}&destinations=${destination}&mode=${MODE}&key=${GOOGLE_KEY}`,
        headers: {
         'Content-Type': 'application/json',
        }
      })
      .then(function (response) {
        if(response.data.rows.length > 0) {
          resolve(response.data.rows)
        } else {
          resolve({status: 500, message: 'INVALID REQUEST'})
        }
      })
      .catch(function (error) {
        console.log(error);
        Toast.show('Something went wrong. Please try again !')
        reject(error)
      });
    } else {
      reject('No connection')
      Toast.show('Please check your internet connection !', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      })
    }
  });
})
}

export const getCityFromCoords = async (latitude, longitude) => {
  let country = '';
  let zipcode = ''
  let city = ''
  let state = ''
  let addr = ''

   await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${GOOGLE_KEY}`)
    .then(res => res.json())
    .then(response => {
      if(response.status == 'OK') {
        // console.log("res", response);
        const address = response.results[0].formatted_address
        addr = address

        const details = response.results[0]

        for (var i = 0; i < details.address_components.length; i++) {
          for (var j = 0; j < details.address_components[i].types.length; j++) {
            if (details.address_components[i].types[j] == "country") {
              country = details.address_components[i].long_name;
            }
            if (details.address_components[i].types[j] == "postal_code") {
              zipcode = details.address_components[i].long_name;
            }
            if (details.address_components[i].types[j] == "administrative_area_level_2") {
              city = details.address_components[i].long_name;
            }
            if (details.address_components[i].types[j] == "administrative_area_level_1") {
              state = details.address_components[i].long_name;
            }
          }
        }
      }  
    })

    return {
      country, zipcode, city, state, addr
    }
}

export const imageByWikiData = async (wikiData) => {
  if(wikiData)
  return await fetch(`${WIKIDATA}${wikiData}`)
  .then((res) => res.json())
  .then((wiki) => {
    if (wiki) {
      if (wiki.entities[wikiData].claims.P18) {
        const image =
          wiki.entities[wikiData].claims.P18[0].mainsnak.datavalue.value;
        const image_ref = image.replace(/ /g, '_');
        const hash = md5(image_ref);
        return`${WIKI_IMAGE_URL}/${hash[0]}/${hash[0]}${hash[1]}/${image_ref}`;
      }
    }
  });
}

export const articleByWikiData = (wikidata_code) => {
  if(wikidata_code)
 return fetch(`${FETCH_TITLE}${wikidata_code}`)
  .then((res) => res.json())
  .then((titles) => {
    if (titles) {
      const title = titles.entities[wikidata_code].sitelinks.enwiki.title;
     return fetch(`${FETCH_ARTICLE}${title}`)
        .then((res) => res.json())
        .then((article) => {
          if (article) {
            const page = article.query.pages;
            const pageId = Object.keys(page);
            const content = page[pageId[0]].extract;
           return content
          }
        });
    }
  });
}
