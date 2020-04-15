import defaultConstants from "../../config/config";
const today = new Date().toLocaleDateString();
const LOCAL_STORAGE_CONSTANTS = `constants-${today}`;
const PRODUCTION_SITE = "myProductionsite.com"; // ADD PRODUCTION SITE HERE

const isProductionSite = window.location.hostname === PRODUCTION_SITE;

export const TOOL_WHITE_LIST = [
  "localhost",

  // Add qa / development sites to allow endpoint changes
  // use window.location.hostname for reference

  // myQAsite1.com
  // myQAsite2.com
  // myQAsite3.com
];

// ****** HELPERS ****** //

export const serveConstants = () => {
  // Prevent function from continuing and serve prod constants on production
  const savedConstants = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_CONSTANTS)
  );

  if (isProductionSite) {
    const production = require("../../config/config.prod");
    return production;
  }

  if (savedConstants) {
    return savedConstants;
  }
  localStorage.setItem(
    LOCAL_STORAGE_CONSTANTS,
    JSON.stringify(defaultConstants)
  );
  return defaultConstants;
};

// RETRIEVE
export const getEnv = (api) => {
  return serveConstants()[api];
};

// CHANGE ALL VARIABLES TO SELECTED ENVIRONMENT
export const changeEnvironments = (env) => {
  const retrievedEndpoints = require(`../../config/config.${env}`);
  localStorage.setItem(
    LOCAL_STORAGE_CONSTANTS,
    JSON.stringify(retrievedEndpoints)
  );
};

// CHANGE INDIVIDUAL VARIABLE ENVIRONMENT //
export const updateSingleItemEnv = (target, env) => {
  const savedConstants = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_CONSTANTS)
  );
  const endpoints = require(`../../config/config.${env}`);
  savedConstants[target] = endpoints[target];
  localStorage.setItem(LOCAL_STORAGE_CONSTANTS, JSON.stringify(savedConstants));
};

// CHANGE INDIVIDUAL VARIABLE FOR NON-STRING VALUE (True/False/NaN/Null) //
export const updateConstantVal = (target, value) => {
  const savedConstants = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_CONSTANTS)
  );
  savedConstants[target] = value;
  localStorage.setItem(LOCAL_STORAGE_CONSTANTS, JSON.stringify(savedConstants));
};

// UPDATE DEFINED VARIABLES WITH USER-INPUTTED VALUES //
export const addCustomValues = (newValues) => {
  const savedConstants = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_CONSTANTS)
  );
  const newSet = { ...savedConstants, ...newValues };
  localStorage.setItem(LOCAL_STORAGE_CONSTANTS, JSON.stringify(newSet));
};

// RESTORE TO DEFAULT //
export const restoreDefault = () => {
  localStorage.setItem(
    LOCAL_STORAGE_CONSTANTS,
    JSON.stringify(defaultConstants)
  );
};
