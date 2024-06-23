import { create } from "zustand";


const useStoreGlobal = create((set) => ({
  loader: false,
  setLoader: (loader) => set({ loader: loader }),
  
  listSuppliers: [],
  setSuppliers: (suppliers) => set({ listSuppliers: suppliers }),
  
  listWarehouses: [],
  setWarehouses: (warehouses) => set({ listWarehouses: warehouses }),
  // addSuppliers: (newContact) =>
  //   set((state) => ({ contacts: [...state.contacts, newContact] })),
  // updateSuppliers: (updatedContact) =>
  //   set((state) => ({
  //     contacts: state.contacts.map((contact) =>
  //       contact.id === updatedContact.id ? updatedContact : contact
  //     ),
  //   })),
  // deleteSuppliers: (contactId) =>
  //   set((state) => ({
  //     contacts: state.contacts.filter((contact) => contact.id !== contactId),
  //   })),

  listMovements: [],
  setMovements: (movements) => set({ listMovements: movements }),

  listPresentations: [],
  setPresentations: (presentations) => set({ listPresentations: presentations }),

  listBrands: [],
  setBrands: (brands) => set({ listBrands: brands }),

  listCategories: [],
  setCategories: (categories) => set({ listCategories: categories }),

  listProducts: [],
  setProducts: (products) => set({ listProducts: products }),

}));

export default useStoreGlobal;