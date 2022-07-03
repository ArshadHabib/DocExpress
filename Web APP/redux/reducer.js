const initialState = {
  trackingData: {},
  comments: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_DATA":
      return {
        ...state,
        trackingData: action.payload,
      };
    case "COMMENTS":
      return {
        ...state,
        comments: action.payload,
      };
  }
  return state;
};
