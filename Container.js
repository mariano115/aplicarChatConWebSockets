class Container {
  constructor(products = []) {
    this.products = products;
  }

  addProduct = (newProduct) => {
    try {
      if (JSON.stringify(newProduct) === "{}") {
        throw "Producto no Valido";
      }
      if (this.products.length > 0) {
        newProduct.id = this.products[this.products.length - 1]?.id + 1;
      } else {
        newProduct.id = 1;
      }
      this.products.push(newProduct);
      return newProduct;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  getById = (id) => {
    try {
      return this.products.find((product) => product.id == id);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  getAll = () => {
    return this.products;
  };

  modifyProduct = (id, product) => {
    try {
      /* Finding the index of the product to modify. */
      const indexToModify = this.products.findIndex(
        (productToModify) => productToModify.id == id
      );
      if (indexToModify === -1) return false;
      /* Modifying the product in the array. */
      this.products[indexToModify] = {
        ...this.products[indexToModify],
        ...product,
      };
      return this.products[indexToModify];
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  deleteById = (id) => {
    try {
      const indexToDelete = this.products.findIndex(
        (productToDelete) => productToDelete.id == id
      );
      if (indexToDelete === -1) return false;
      this.products.splice(indexToDelete, 1);
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  deleteAll = () => {
    try {
      this.products = [];
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}

module.exports = {
  Container,
};
