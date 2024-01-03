const localStoreUtil = {
  store_data: (key: any, data: any) => {
    if (typeof data === "object") {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, data);
    }

    return true;
  },

  get_data: (key: any) => {
    const item = localStorage.getItem(key);

    if (!item) return;
    return item;
  },

  remove_data: (key: any) => {
    localStorage.removeItem(key);
    return true;
  },

  remove_all: () => {
    localStorage.clear();
    return true;
  },
};

export default localStoreUtil;
