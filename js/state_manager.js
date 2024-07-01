class stateManager {
  all_productions = [];
  all_productions_data = [];

  setProductions = async (all) => {
    this.all_productions = all;
    this.all_productions_data = structuredClone(this.all_productions);
  };

  filterProductions = async (value) => {
    if (value) {
      const temp = this.all_productions.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      //   p.inn.toLowerCase().includes(value.toLowerCase())
      console.log(temp);
      console.log(value);
      console.log(this.all_productions);
      return this.all_productions.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      return (this.all_productions = structuredClone(
        this.all_productions_data
      ));
    }
  };
}

export default new stateManager();
