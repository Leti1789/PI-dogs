import axios from "axios";

import {
  GET_ALL_BREEDS,
  GET_DETAIL_BREED,
  GET_TEMPERAMENTS,
  FILTER_BY_TEMP,
  FILTER_BY_ORIGIN,
  AlPHA_ORDER_AZ,
  AlPHA_ORDER_ZA,
  GET_BY_BREED,
  WEIGHT_ORDER_MIN,
  WEIGHT_ORDER_MAX,
} from "../actionsTypes/actionsTypes";

//! Me trae todas las razas de perros
export const getAllBreeds = () => {
  return async function (distpach) {
    try {
      const response = await axios.get("http://localhost:3001/dogs");
      const dogsBreeds = response.data;
      return distpach({
        type: GET_ALL_BREEDS,
        payload: dogsBreeds,
      });
    } catch (error) {
      return error.message;
    }
  };
};

//? Me trae el detalle de cada perro

export const getDetailBreed = (idRaza, setLoader) => {
  return async function (distpach) {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/${idRaza}`);
      const detailDog = response.data;
      distpach({
        type: GET_DETAIL_BREED,
        payload: detailDog,
      });
      await setLoader(false);
    } catch (error) {
      return error.message;
    }
  };
};

//* Trae todos los temperamentos

export const getTemperaments = () => {
  return async function (distpach) {
    try {
      const response = await axios.get("http://localhost:3001/temperaments");
      const temperaments = response.data;
      return distpach({
        type: GET_TEMPERAMENTS,
        payload: temperaments,
      });
    } catch (error) {
      return error.message;
    }
  };
};

//! Filtro por temperamento recibe una opcion que va a elegir el usuario

export function filterTemp(value) {
  return {
    type: FILTER_BY_TEMP,
    payload: value,
  };
}

//* filtro por origen(base de datos, api, ambas)

export function filterOrigin(value) {
  return {
    type: FILTER_BY_ORIGIN,
    payload: value,
  };
}

//? Ordenar las razas  por orden alfabetico de A-Z y de Z-A

export function alphaOrderAZ(payload) {
  return {
    type: AlPHA_ORDER_AZ,
    payload,
  };
}
export function alphaOrderZA(payload) {
  return {
    type: AlPHA_ORDER_ZA,
    payload,
  };
}

//* Ordenamiento por peso MIN/MAX

export function weightOrderMin(payload) {
  return {
    type: WEIGHT_ORDER_MIN,
    payload,
  };
}

export function weightOrderMax(payload) {
  return {
    type: WEIGHT_ORDER_MAX,
    payload,
  };
}

//! trae los perros por nombre, es decir por raza

export const getDogByBreed = (name) => {
  return async function (distpach) {
    try {
      const response = await axios.get(
        `http://localhost:3001/dogs?name=${name}`
      );
      const breed = response.data;
      return distpach({
        type: GET_BY_BREED,
        payload: breed,
      });
    } catch (error) {
      return error.message;
    }
  };
};

//? Creacion del perro POST

export const postDog = (body) => {
  return async function (distpach) {
    try {
      const response = await axios.post("http://localhost:3001/dogs", body);
      return response;
    } catch (error) {
      return error.message;
    }
  };
};
