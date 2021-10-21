class Map {
  setCenter() {}
  setOptions() {}
  setZoom() {}
}

window.google = {
  maps: {
    places: {SearchBox: class Searchbox{} },
    event: {
      addListener: jest.fn(),
      removeListener: jest.fn()
    },
    Map: () => new Map(),
  }
}