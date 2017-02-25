const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define, Create, Export

const ListSchema = new Schema({
  user: {
    imgUrl: String,
    name: String,
    gender: String,
    age: String,
    id: String,
  },
  details: {
    moveInDate: String,
    term: String,
    price: Number,
    minStay: {
      isTrue: Boolean,
      date: String
    },
    location: {
      lineOne: String,
      lineTwo: String,
      lineThree: String,
      state: String,
      country: String,
      postalCode: String,
      city: String
    },
    description: String,
    img: String
  },
  residence: {
    buildingType: String,
    furnished: String,
    moveInFee: Number
  },
  Lifestyle: {
    smoke: String,
    getUpAndGoToBed: String,
    cleanliness: String,
    foodPreference: String,
    overnightGuests: String,
    workSchedule: String,
    partyHabits: String,
    occupation: String,
    animals: {isTrue: false, info: ""}
  },
  roommatePreference: {
    age: Number,
    gender: String,
    smoking: String,
    studentOnly: Boolean,
    animals: {isTrue: Boolean, info: String}
  },
  Amenities: {
    hRise: Boolean,
    lRise: Boolean,
    disability: Boolean,
    pool: Boolean,
    jaccuzi: Boolean,
    sauna: Boolean,
    elevator: Boolean,
    healthClub: Boolean,
    coveredParking: Boolean,
    parkingLot: Boolean,
    streetParking: Boolean,
    parkingSpotIncluded: {isTrue: Boolean, info: String},
    publicTransport: {
      bus: Boolean, train: Boolean, tram: Boolean, trolley: Boolean, subway: Boolean, streetCar: Boolean, other: Boolean
    },
    security: {
      doorman: Boolean,
      system: Boolean,
      gatedCommunity: Boolean,
      gaurd: Boolean,
      patrol: Boolean
    },
    internet: {
      wireless: Boolean,
      lan: Boolean
    },
    garage: Boolean,
    utilitiesIncluded: {
      isTrue: Boolean,
      water: Boolean,
      heating: Boolean,
      ac: Boolean,
      electric: Boolean,
      gas: Boolean,
      fireplace: Boolean,
      internet: Boolean,
      phone: Boolean,
      cable: Boolean,
    },
    utilitiesAvailable: {
      isTrue: Boolean,
      water: Boolean,
      heating: Boolean,
      ac: Boolean,
      electric: Boolean,
      gas: Boolean,
      fireplace: Boolean,
      internet: Boolean,
      phone: Boolean,
      cable: Boolean,
    }
  }
});
const ModelClass = mongoose.model("listings", ListSchema);

module.exports = ModelClass;
