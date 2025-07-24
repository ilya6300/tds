import apiData from "../service/api.data.js";

class stateManager {
  productions_data = [];
  sort_production = {};

  languages = [];
  sort_languages = {};

  tds = {
    tds: {
      archivedFalse: {
        tds: [],
        total: null,
        pages: null,
      },
      archivedTrue: {
        tds: [],
        total: null,
        pages: null,
      },
    },
    flagLoading: false,
    flagArhive: false,
  };

  users = {
    users: [],
    sort_users: {},
  };

  this_language = null;
  card_id = null;
  tds_id = null;
  size = 8;

  setProductions = async (all) => {
    try {
      this.productions_data = all;
      await this.sortProductionFunc();
    } catch (e) {
      console.error(e);
    } 
  };
  getProductionFunc = async () => {
    const production = await apiData.getProduction();
    return await this.setProductions(production);
  };
  sortProductionFunc = async () => {
    const archivedTrue = [];
    const archivedFalse = [];
    this.productions_data.map(async (p) => {
      if (!p.archived) {
        archivedFalse.push(p);
      } else {
        archivedTrue.push(p);
      }
    });
    this.sort_production = { archivedTrue, archivedFalse };
    return this.sort_production;
  };

  setLanguages = async (all) => {
    try {
      this.languages = all;
      await this.sortLanguagesFunc();
    } catch (e) {
      console.error(e);
    } 
  };
  getLanguageFunc = async () => {
    const lang = await apiData.getLanguange();
    return await this.setLanguages(lang);
  };
  sortLanguagesFunc = async () => {
    const archivedTrue = [];
    const archivedFalse = [];
    this.languages.map(async (p) => {
      if (!p.archived) {
        archivedFalse.push(p);
      } else {
        archivedTrue.push(p);
      }
    });
    this.sort_languages = { archivedTrue, archivedFalse };
    return this.sort_languages;
  };

  filterProductions = async (value) => {
    try {
      await this.sortProductionFunc();
      if (value) {
        return (this.sort_production.archivedFalse = [
          ...this.sort_production.archivedFalse.filter(
            (p) =>
              p.name.toLowerCase().includes(value.toLowerCase()) ||
              p.ean.toLowerCase().includes(value.toLowerCase()) ||
              p.description.toLowerCase().includes(value.toLowerCase())
          ),
        ]);
      } else {
        return this.sort_production.archivedFalse;
      }
    } catch (e) {
      console.error(e);
    } 
  };

  getTDSFunc = async (page) => {
    const tds = await apiData.getTDSList(page);
    this.tds.tds.archivedFalse.tds = tds;
    // return await this.setTDS(tds);
  };

  getTDSFuncArhive = async (page) => {
    const tds = await apiData.getTDSListArhive(page);
    this.tds.tds.archivedTrue.tds = tds;
    // return await this.setTDS(tds);
  };

  getUsersFunc = async () => {
    this.users.users = await apiData.getUsers();
    await this.sortUsersFunc();
  };
  sortUsersFunc = async () => {
    const archivedTrue = [];
    const archivedFalse = [];
    this.users.users.map(async (p) => {
      if (!p.archived) {
        archivedFalse.push(p);
      } else {
        archivedTrue.push(p);
      }
    });
    this.users.sort_users = { archivedTrue, archivedFalse };
    return this.users.sort_users;
  };
}

export default new stateManager();
