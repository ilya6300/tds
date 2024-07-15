import apiData from "../service/api.data.js";

class stateManager {
  productions_data = [];
  sort_production = {};

  languages = [];
  production_tds = [];

  this_language = null;
  card_id = null;
  tds_id = null;

  setProductions = async (all) => {
    try {
      this.productions_data = all;
      await this.sortProductionFunc();
    } catch (e) {
      console.log(e);
    } finally {
      console.log(this.sort_production);
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
      console.log(e);
    } finally {
      console.log(this.sort_production.archivedFalse);
    }
  };
}

export default new stateManager();
