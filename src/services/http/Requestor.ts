import axios from "axios";
import HttpRequester from "./Http";

class Requestor {
  private static instance: Requestor;
  private library: HttpRequester;
  constructor(library: HttpRequester) {
    if (!Requestor.instance) {
      Requestor.instance = this
    }

    this.library = library
    // Initialize object
    return Requestor.instance
  }

  setLibrary(library: HttpRequester) {
    this.library = library
  }

  getLibrary() {
    return this.library
  }
  
}

const requesterLibrary = new HttpRequester({
  requesterLibrary: axios
})

const instance = new Requestor(requesterLibrary);


export default instance