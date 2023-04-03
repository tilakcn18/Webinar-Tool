const webinarReducer = (state = null, action) => {
    switch (action.type) {
      case "SET_WEBINAR_ID":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default webinarReducer;
  