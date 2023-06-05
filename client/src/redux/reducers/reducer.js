import {
  GET_ALL_BREEDS,
  GET_DETAIL_BREED,
  GET_TEMPERAMENTS,
  FILTER_BY_TEMP,
  FILTER_BY_ORIGIN,
  AlPHA_ORDER_AZ,
  AlPHA_ORDER_ZA,
  GET_BY_BREED,
  POST_DOG,
  WEIGHT_ORDER_MIN,
  WEIGHT_ORDER_MAX,
} from "../actionsTypes/actionsTypes";

const intialState = {
  dogs: [],
  temperaments: [],
  allDogs: [],
  details: {},
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_ALL_BREEDS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case GET_DETAIL_BREED:
      return {
        ...state,
        details: action.payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case FILTER_BY_TEMP:
      let filteredTemp = [];
      for (let i = 0; i < state.allDogs?.length; i++) {
        let dog = state.allDogs[i];
        if (dog.Temperaments?.length !== 0) {
          for (let j = 0; j < dog.Temperaments?.length; j++) {
            let temp = dog.Temperaments[j].name;
            if (action.payload === "ALL") filteredTemp = state.allDogs;
            if (temp === action.payload) filteredTemp.push(dog);
          }
        }
      }
      return {
        ...state,
        dogs: filteredTemp,
      };

    case FILTER_BY_ORIGIN:
      const dogsAll = state.allDogs;
      const filterDb =
        action.payload === "db"
          ? dogsAll.filter((el) => el.createdInDb)
          : dogsAll.filter((el) => !el.createdInDb);

      return {
        ...state,
        dogs: action.payload === "all" ? state.allDogs : filterDb,
      };

    case AlPHA_ORDER_AZ:
      let sortedAlphaAZ = state.dogs.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      return {
        ...state,
        dogs: sortedAlphaAZ,
      };
    case AlPHA_ORDER_ZA:
      let sortedAlphaZA = state.dogs.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      return {
        ...state,
        dogs: sortedAlphaZA,
      };

    case GET_BY_BREED:
      return {
        ...state,
        dogs: action.payload,
      };
    case POST_DOG:
      return {
        ...state,
      };

    case WEIGHT_ORDER_MIN:
      let minWeightOrder;
      if (action.payload === "min_weight") {
        minWeightOrder = state.allDogs.sort((a, b) => {
          if (parseInt(a.minWeight) > parseInt(b.minWeight)) {
            return 1;
          }
          if (parseInt(b.minWeight) > parseInt(a.minWeight)) {
            return -1;
          } else return 0;
        });
      }

      return {
        ...state,
        dogs: minWeightOrder,
      };

    case WEIGHT_ORDER_MAX:
      let maxWeightOrder;
      if (action.payload === "max_weight") {
        maxWeightOrder = state.allDogs.sort((a, b) => {
          if (parseInt(a.maxWeight) > parseInt(b.maxWeight)) {
            return 1;
          }
          if (parseInt(b.maxWeight) > parseInt(a.maxWeight)) {
            return -1;
          } else return 0;
        });
      }
      return {
        ...state,
        dogs: maxWeightOrder,
      };

    default:
      return { ...state };
  }
};

export default reducer;
