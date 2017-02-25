var mongoose = require('mongoose');
var List = require('./models/listing.js');
var b = [true, false];
var imgsPeople = ["http://lyricsmusic.name/img/photos/a5374nahko-and-medicine-for-the-people.jpg", "http://www.lorenzobortolottiphotos.com/wp-content/uploads/2015/12/people-5-500x500.jpg", "https://s-media-cache-ak0.pinimg.com/564x/63/15/18/63151828ca56345f061ee0f9529fcccc.jpg", "http://www.kenyon.edu/images/middlepath/kenyon-people_s23.jpg", "https://static1.squarespace.com/static/549e4a51e4b03939a85bed83/549e704ae4b0db6a9b931204/54a404bfe4b037e9babbe81c/1420035264990/people%3A20111002IMG_8686-Final.jpg?format=500w", "https://c1.staticflickr.com/5/4010/4495566509_9bd417a9f6_z.jpg"]
var imgsPlaces = ["http://data.websitebox.com/data/users/0007/497/uploads/FVS_beach2jpg_crop_1454524317.jpg", "https://storage.googleapis.com/imgfave/image_cache/1357304462877600.jpg", "https://s-media-cache-ak0.pinimg.com/736x/81/a9/a4/81a9a42edc87f5968451006f14019503.jpg", "https://s-media-cache-ak0.pinimg.com/736x/81/a9/a4/81a9a42edc87f5968451006f14019503.jpg", "https://s-media-cache-ak0.pinimg.com/736x/9b/a8/63/9ba86375b0524311894cf16cf379c5d6.jpg", "https://s-media-cache-ak0.pinimg.com/564x/2e/4e/36/2e4e3660bfb34562153bead533108ce4.jpg"];
var locArr = [
  {
    lineOne: "7225 Arlington Lane",
    lineTwo: "",
    lineThree: "",
    state: "CA",
    country: "USA",
    postalCode: "94110",
    city: "San Francisco"
  },   {
    lineOne: "53 Old Richardson Rd.",
    lineTwo: "",
    lineThree: "",
    state: "CA",
    country: "USA",
    postalCode: "91605",
    city: "North Hollywood"
  },
  {
    lineOne: "417 Jackson St..",
    lineTwo: "",
    lineThree: "",
    state: "CA",
    country: "USA",
    postalCode: "95340",
    city: "Merced"
  },
  {
    lineOne: "71 E. Peachtree Court .",
    lineTwo: "",
    lineThree: "",
    state: "CA",
    country: "USA",
    postalCode: "95616",
    city: "Davis"
  },
  {
    lineOne: "65 Foster St.",
    lineTwo: "",
    lineThree: "",
    state: "CA",
    country: "USA",
    postalCode: "91911",
    city: "Chula Vista"
  },
  {
    lineOne: "92 N. Oxford Ave.",
    lineTwo: "",
    lineThree: "",
    state: "CA",
    country: "USA",
    postalCode: "90723",
    city: "Paramount"
  },
  {
    lineOne: "28849 Bison Ct.",
    lineTwo: "",
    lineThree: "",
    state: "CA",
    country: "USA",
    postalCode: "90263",
    city: "Malibu"
  },
  {
    lineOne: "28815 Cliffside Dr",
    lineTwo: "",
    lineThree: "",
    state: "CA",
    country: "USA",
    postalCode: "90263",
    city: "Malibu"
  },
  {
    lineOne: "28809 Cliffside Dr.",
    lineTwo: "",
    lineThree: "",
    state: "CA",
    country: "USA",
    postalCode: "90263",
    city: "Malibu"
  },
  {
    lineOne: "9617 Palomino Ridge Dr",
    lineTwo: "",
    lineThree: "",
    state: "CA",
    country: "USA",
    postalCode: "92021",
    city: "El Cajon"
  },
  {
    lineOne: "9395 Harritt Rd",
    lineTwo: "",
    lineThree: "",
    state: "CA",
    country: "USA",
    postalCode: "92040",
    city: "Lakeside"
  },
  {
    lineOne: "9500 Harritt Rd",
    lineTwo: "",
    lineThree: "",
    state: "CA",
    country: "USA",
    postalCode: "92040",
    city: "Lakeside"
  },
]
var names = ["Daniel", "Jessica", "Kristy", "Alicia", "Gloria", "Al","Aj", "Murphy", "Hadgi", "Coco", "Fabi"]
var gender = ["male", "female"];
function newUser(loc) {
  function rndm(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  var list = new List({
    user: {
    imgUrl: imgsPeople[rndm(0, imgsPeople.length)],
      name: names[rndm(0, names.length)],
      gender: gender[rndm(0,1)],
      age: rndm(18,48),
      id: "String"+rndm(400,1300)+imgsPeople[rndm(0, imgsPeople.length)],
    },
    details: {
      moveInDate: new Date(),
      term: "6 Months",
      price: rndm(400,1300),
      minStay: {
        isTrue: false,
        date: ""
      },
      location: loc,
      description: "O Divine Providence, I ask not for more riches but more wisdom with which to make wiser use of the riches you gave me at birth, consisting in the power to control and direct my own mind to whatever ends I might desire.",
      img: imgsPlaces[rndm(0, imgsPlaces.length)]
    },
    residence: {
      buildingType: "String",
      furnished: "String",
      moveInFee: rndm(0,500)
    },
    Lifestyle: {
      smoke: "Outside",
      getUpAndGoToBed: "10am - 10pm",
      cleanliness: "Very",
      foodPreference: "String",
      overnightGuests: "String",
      workSchedule: "String",
      partyHabits: "String",
      occupation: "String",
      animals: {isTrue: false, info: ""}
    },
    roommatePreference: {
      age: rndm(18,48),
      gender: "Either",
      smoking: "Outside",
      studentOnly: b[rndm(0,1)],
      animals: {isTrue: false, info: ""}
    },
    Amenities: {
      hRise: b[rndm(0,1)],
      lRise: b[rndm(0,1)],
      disability: b[rndm(0,1)],
      pool: b[rndm(0,1)],
      jaccuzi: b[rndm(0,1)],
      sauna: b[rndm(0,1)],
      elevator: b[rndm(0,1)],
      healthClub: b[rndm(0,1)],
      coveredParking: b[rndm(0,1)],
      parkingLot: b[rndm(0,1)],
      streetParking: b[rndm(0,1)],
      parkingSpotIncluded: {isTrue: b[rndm(0,1)], info: ""},
      publicTransport: {
        bus: b[rndm(0,1)], train: b[rndm(0,1)], tram: b[rndm(0,1)], trolley: b[rndm(0,1)], subway: b[rndm(0,1)], streetCar: b[rndm(0,1)], other: b[rndm(0,1)]
      },
      security: {
        doorman: b[rndm(0,1)],
        system: b[rndm(0,1)],
        gatedCommunity: b[rndm(0,1)],
        gaurd: b[rndm(0,1)],
        patrol: b[rndm(0,1)]
      },
      internet: {
        wireless: b[rndm(0,1)],
        lan: b[rndm(0,1)]
      },
      garage: b[rndm(0,1)],
      utilitiesIncluded: {
        isTrue: b[rndm(0,1)],
        water: b[rndm(0,1)],
        heating: b[rndm(0,1)],
        ac: b[rndm(0,1)],
        electric: b[rndm(0,1)],
        gas: b[rndm(0,1)],
        fireplace: b[rndm(0,1)],
        internet: b[rndm(0,1)],
        phone: b[rndm(0,1)],
        cable: b[rndm(0,1)],
      },
      utilitiesAvailable: {
        isTrue: b[rndm(0,1)],
        water: b[rndm(0,1)],
        heating: b[rndm(0,1)],
        ac: b[rndm(0,1)],
        electric: b[rndm(0,1)],
        gas: b[rndm(0,1)],
        fireplace: b[rndm(0,1)],
        internet: b[rndm(0,1)],
        phone: b[rndm(0,1)],
        cable: b[rndm(0,1)],
      }
    }
  });
  list.save(function(error) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
    console.log("Success");
  })
}
locArr.map(function(loc) {
  newUser(loc);
  console.log("Success");
})
