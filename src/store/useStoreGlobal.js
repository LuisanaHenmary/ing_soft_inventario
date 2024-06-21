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
}));

export default useStoreGlobal;