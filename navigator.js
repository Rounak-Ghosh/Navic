let dynamicList = {
    Kolkata: ["Visakhapatnam", "Patna", "Ranchi"],
    Chennai: ["Bengaluru", "Coimbatore", "Hyderabad"],
    Bengaluru: ["Kochi", "Chennai", "Mumbai"],
    Mumbai: ["Panaji", "Bengaluru", "Ahmedabad"],
    Delhi: ["Ahmedabad", "Amritsar", "Lucknow"],
    Ahmedabad: ["Delhi", "Mumbai"],
    Kochi: ["Bengaluru", "Panaji"],
    Panaji: ["Mumbai", "Kochi"],
    Hyderabad: ["Visakhapatnam", "Chennai"],
    Visakhapatnam: ["Hyderabad", "Kolkata"],
    Ranchi: ["Kolkata"],
    Coimbatore: ["Chennai"],
    Amritsar: ["Delhi"],
    Lucknow: ["Delhi"],
};

function changeSource(value) {
    if (value.length == 0)
        document.getElementById("destination").innerHTML = "<options><options>";
    else {
        let options = "";
        for (categoryId in dynamicList[value]) {
            options +=
                "<option value = " +
                dynamicList[value][categoryId] +
                ">" +
                dynamicList[value][categoryId] +
                "</options>";
        }
        document.getElementById("destination").innerHTML = options;
    }
}

let currentCity = '';

function routeSelection(place1, place2) {

    let sourceCity = document.getElementById("source").value;
    let destinationCity = document.getElementById("destination").value;

    currentCity = sourceCity;

    if(sourceCity == "---Choose Source---" && destinationCity == "---Choose Destination---") {
        document.getElementById("routeDisplay").innerHTML = "<p style='color : red;'>* Required Field</p>";
        return;
    }
    if(sourceCity == place1) {
        if(destinationCity == place2)
            mumbaipanaji();
        else if(destinationCity == "Bengaluru")
            mumbaibengaluru();
        else if(destinationCity == "Ahmedabad")
            mumbaiahmedabad();
    }
        
    if(sourceCity == "Mumbai") {
        if(destinationCity == "Panaji")
            mumbaipanaji();
        else if(destinationCity == "Bengaluru")
            mumbaibengaluru();
        else if(destinationCity == "Ahmedabad")
            mumbaiahmedabad();
    }
    
    else if(sourceCity == "Kolkata") {
        if(destinationCity == "Ranchi")
            kolkataranchi();
        else if(destinationCity == "Visakhapatnam")
            kolkatavisakhapatnam();
        else if(destinationCity == "Patna")
            kolkatapatna();
    }
    
    else if(sourceCity == "Delhi") {
        if(destinationCity == "Ahmedabad")
            delhiahmedabad();
        else if(destinationCity == "Amritsar")
            delhiamritsar();
        else if(destinationCity == "Lucknow")
            delhilucknow();
    }

    else if(sourceCity == "Chennai") {
        if(destinationCity == "Bengaluru")
            chennaibengaluru();
        else if(destinationCity == "Coimbatore")
            chennaicoimbatore();
        else if(destinationCity == "Hyderabad")
            chennaihyderabad();
    } 
    
    else if(sourceCity == "Bengaluru") {
        if(destinationCity == "Chennai")
            chennaibengaluru();
        else if(destinationCity == "Kochi")
            bengalurukochi();
        else if(destinationCity == "Mumbai")
            mumbaibengaluru();
    }

    else if(sourceCity == "Kochi") {
        if(destinationCity == "Panaji")
            kochipanaji();
        else if(destinationCity == "Bengaluru")
            bengalurukochi();
    }

    else if(sourceCity == "Panaji") {
        if(destinationCity == "Kochi")
            kochipanaji();
        else if(destinationCity == "Mumbai")
            mumbaipanaji();
    }    

    else if(sourceCity == "Ahmedabad") {
        if(destinationCity == "Delhi")
            delhiahmedabad();
        else if(destinationCity == "Mumbai")
            mumbaiahmedabad();
    }

    else if(sourceCity == "Hyderabad") {
        if(destinationCity == "Chennai")
            chennaihyderabad();
        else if(destinationCity == "Visakhapatnam")
            hyderabadvisakhapatnam();
    }

    else if(sourceCity == "Visakhapatnam") {
        if(destinationCity == "Hyderabad")
            hyderabadvisakhapatnam();
        else if(destinationCity == "Kolkata")
            kolkatavisakhapatnam();
    }

    else if(sourceCity == "Hyderabad") {
        if(destinationCity == "Chennai")
            chennaihyderabad();
        else if(destinationCity == "Visakhapatnam")
            hyderabadvisakhapatnam();
    }

    else if (sourceCity == "Ranchi" && destinationCity == "Kolkata")
        kolkataranchi();
    else if (sourceCity == "Coimbatore" && destinationCity == "Chennai")
        chennaicoimbatore();
    else if (sourceCity == "Amritsar" && destinationCity == "Delhi")
        delhiamritsar();
    else if (sourceCity == "Lucknow" && destinationCity == "Delhi")
        delhilucknow();
    else if (sourceCity == "Patna" && destinationCity == "Kolkata")
        kolkatapatna();

    document.getElementById("routeDisplay").innerHTML = "Route -> " + sourceCity + " to " + destinationCity;
    window.scrollTo(0,document.body.scrollHeight);
    lookup();
}


//  STORING CO-ORDINATES OF CITIES IN STRING - For Route Calculation
let mumbaiPT = "72.82073403153514,18.968811839306774";              let mumbaiPT_copy = "18.968811839306774,72.82073403153514";
let panajiPT = "73.82254549932092,15.480852322291586";              let panajiPT_copy = "15.480852322291586,73.82254549932092";
let bengaluruPT = "77.57564688590277,12.977194993545213";           let bengaluruPT_copy = "12.977194993545213,77.57564688590277";
let chennaiPT = "80.20203468527207,13.072174009472237";             let chennaiPT_copy = "13.072174009472237,80.20203468527207";
let kolkataPT = "88.37022441723379,22.565325260528393";             let kolkataPT_copy = "22.565325260528393,88.37022441723379"; 
let delhiPT = "77.21874774622229,28.632033993846747";               let delhiPT_copy = "28.632033993846747,77.21874774622229";
let ahmedabadPT = "72.59168141373704,23.01423819454735";            let ahmedabadPT_copy = "23.01423819454735,72.59168141373704";
let kochiPT = "76.26741943430649,9.931231019437261";                let kochiPT_copy = "9.931231019437261,76.26741943430649";
let hyderabadPT = "78.47451411335726,17.36134177028312";            let hyderabadPT_copy = "17.36134177028312,78.47451411335726";  
let visakhapatnamPT = "83.30794216495023,17.723127598211285";       let visakhapatnamPT_copy = "17.723127598211285,83.30794216495023";
let ranchiPT = "85.32185960852917,23.319301031753447";              let ranchiPT_copy = "23.319301031753447,85.32185960852917"; 
let coimbatorePT = "76.96957454949472,11.016714989700386";          let coimbatorePT_copy = "11.016714989700386,76.96957454949472";
let amritsarPT = "74.86758072199787,31.63729868730837";             let amritsarPT_copy = "31.63729868730837,74.86758072199787";
let lucknowPT = "80.9489444304064,26.846500967160434";              let lucknowPT_copy = "26.846500967160434,80.9489444304064";
let patnaPT = "85.13034790259688,25.611200023723246";               let patnaPT_copy = "25.611200023723246,85.13034790259688";

//  STORING CO-ORDINATES OF CITIES IN ARRAY - For Markers/Zoom
let mumbai = [72.82073403153514, 18.968811839306774];
let panaji = [73.82254549932092, 15.480852322291586];
let bengaluru = [77.57564688590277, 12.977194993545213];
let chennai = [80.20203468527207, 13.072174009472237];
let kolkata = [88.37022441723379, 22.565325260528393];
let delhi = [77.21874774622229, 28.632033993846747];
let ahmedabad = [72.59168141373704, 23.01423819454735];
let kochi = [76.25121940494328, 9.957762094990468];
let hyderabad = [78.47451411335726, 17.36134177028312];
let visakhapatnam = [83.30794216495023, 17.723127598211285];
let ranchi = [85.32185960852917, 23.319301031753447];
let coimbatore = [76.96957454949472, 11.016714989700386];
let amritsar = [74.86758072199787, 31.63729868730837];
let lucknow = [80.9489444304064, 26.846500967160434];
let patna = [85.13034790259688, 25.611200023723246];
let zeromile = [79.07852831502758, 21.149745485932975];

//  STORING CO-ORDINATES OF EV STATIONS IN STRING - For Route Calculation
let puneEV = "73.74623527575844,18.623443414880715";                let puneEV_copy = "18.623443414880715,73.74623527575844";    
let kolhapurEV = "74.25916073745681,16.682210951027088";            let kolhapurEV_copy = "16.682210951027088,74.25916073745681";   
let hubliEV = "75.1267302178941,15.360105856246953";                let hubliEV_copy = "15.360105856246953,75.1267302178941"; 
let devanagereEV = "75.90648310770523,14.345388033628938";          let devanagereEV_copy = "14.345388033628938,75.90648310770523"; 
let suratEV = "72.93638928190641,21.28364273437724";                let suratEV_copy = "21.28364273437724,72.93638928190641";         
let bhubaneswarEV = "85.7765033271771,20.26048438028324";           let bhubaneswarEV_copy = "20.26048438028324,85.7765033271771";
let burdwanEV = "87.81269270154024,23.273091713247492";             let burdwanEV_copy = "23.273091713247492,87.81269270154024"; 
let bodhgayaEV = "84.93005901508694,24.52532538421312";             let bodhgayaEV_copy = "24.52532538421312,84.93005901508694";
let jaipurEV = "75.74825974308452,26.848084371257894";              let jaipurEV_copy = "26.848084371257894,75.74825974308452";  
let sirohiEV = "72.89152941509522,24.970704084002122";              let sirohiEV_copy = "24.970704084002122,72.89152941509522";
let ajmerEV = "74.60463152161817,26.402693222502418";               let ajmerEV_copy = "26.402693222502418,74.60463152161817"; 
let agraEV = "77.83595922505256,27.19048406537502";                 let agraEV_copy = "27.19048406537502,77.83595922505256";
let karnalEV = "76.94253171912283,29.575571805593494";              let karnalEV_copy = "29.575571805593494,76.94253171912283";
let ludhianaEV = "75.87567094283727,30.9226866290673";              let ludhianaEV_copy = "30.9226866290673,75.87567094283727"; 
let velloreEV = "79.12422952234452,12.899069980581796";             let velloreEV_copy = "12.899069980581796,79.12422952234452";
let krishnagiriEV = "78.2226046384457,12.501480184502142";          let krishnagiriEV_copy = "12.501480184502142,78.2226046384457";
let vijaywadaEV = "80.64135403592857,16.452564485143522";           let vijaywadaEV_copy = "16.452564485143522,80.64135403592857";
let salemEV = "77.81004910539166,11.462323037021314";               let salemEV_copy = "11.462323037021314,77.81004910539166"; 
let coimbatoreEV = "76.86239088545605,10.85594806419762";           let coimbatoreEV_copy = "10.85594806419762,76.86239088545605"; 
let kozhikodeEV = "75.80079457093937,11.186520636559658";           let kozhikodeEV_copy= "11.186520636559658,75.80079457093937";
let mangaluruEV = "74.82893259218494,12.92296752604765";            let mangaluruEV_copy = "12.92296752604765,74.82893259218494"; 
let rajahmudryEV = "81.79814746967465,16.983130729643605";          let rajahmudryEV_copy = "16.983130729643605,81.79814746967465";

//  STORING CO-ORDINATES OF EV STATIONS IN ARRAY - For Markers
let punestation = [73.74623527575844, 18.623443414880715];
let kolhapurstation = [74.25916073745681, 16.682210951027088];
let hublistation = [75.1267302178941, 15.360105856246953];
let devanagerestation = [75.90648310770523, 14.345388033628938];
let suratstation = [72.93638928190641, 21.28364273437724];
let bhubaneswarstation = [85.7765033271771, 20.26048438028324];
let burdwanstation = [87.81269270154024, 23.273091713247492];
let bodhgayastation = [84.93005901508694, 24.52532538421312];
let jaipurstation = [75.74825974308452, 26.848084371257894];
let sirohistation = [72.89152941509522, 24.970704084002122];
let ajmerstation = [74.60463152161817, 26.402693222502418];
let agrastation = [77.83595922505256, 27.19048406537502];
let karnalstation = [76.94253171912283, 29.575571805593494];
let ludhianastation = [75.87567094283727, 30.9226866290673];
let vellorestation = [79.12422952234452, 12.899069980581796];
let krishnagiristation = [78.2226046384457, 12.501480184502142];
let vijaywadastation = [80.64135403592857, 16.452564485143522];
let salemstation = [77.81004910539166, 11.462323037021314];
let coimbatorestation = [76.86239088545605, 10.85594806419762];
let kozhikodestation = [75.80079457093937, 11.186520636559658];
let mangalurustation = [74.82893259218494, 12.92296752604765];
let rajahmudrystation = [81.79814746967465, 16.983130729643605];



let routeURL;       // For easier process of JSON data in line 505

//  BUILDING ROUTES FUNCTIONS
let mumbaipanaji = function (event) {
    let routeOptions = {
        key: apikey,
        locations: mumbaiPT + ":" + puneEV + ":" + kolhapurEV + ":" + panajiPT,     //2
    };
    
    const marks = [punestation, kolhapurstation];
    marks.forEach(item => (
        stations = new tt.Marker().setLngLat(item).addTo(map)
    ))
    
    document.getElementById("stationDisplay").innerHTML = "Charging Stations at -> Pune, Kolhapur";
    createRoute(routeOptions);
    routeURL = mumbaiPT_copy + ":" + puneEV_copy + ":" + kolhapurEV_copy + ":" + panajiPT_copy;
};

let mumbaibengaluru = function (event) {
    let routeOptions = {
        key: apikey,
        locations: mumbaiPT + ":" + puneEV + ":" + kolhapurEV + ":" + hubliEV + ":" + devanagereEV + ":" + bengaluruPT, // 4
    };

    const dest = [punestation,kolhapurstation,hublistation, devanagerestation];
    dest.forEach(item => (
        stations = new tt.Marker().setLngLat(item).addTo(map)
    ))

    document.getElementById("stationDisplay").innerHTML = "Charging Stations at -> Pune, Kolhapur, Hubli, Devanagere";
    createRoute(routeOptions);
    routeURL = mumbaiPT_copy + ":" + puneEV_copy + ":" + kolhapurEV_copy + ":" + hubliEV_copy + ":" + devanagereEV_copy + ":" + bengaluruPT_copy;
};

let mumbaiahmedabad = function (event) {
    let routeOptions = {
        key: apikey,
        locations: mumbaiPT + ":" + suratEV + ":" + ahmedabadPT, // 1
    };
    
    stations = new tt.Marker().setLngLat(suratstation).addTo(map);
    
    document.getElementById("stationDisplay").innerHTML = "Charging Stations at -> Surat";
    createRoute(routeOptions);
    routeURL = mumbaiPT_copy + ":" + suratEV_copy + ":" + ahmedabadPT_copy; 
};

let kolkatavisakhapatnam = function (event) {
    let routeOptions = {
        key: apikey,
        locations: kolkataPT + ":" + bhubaneswarEV + ":" + visakhapatnamPT, // 1
    };
    
    stations = new tt.Marker().setLngLat(bhubaneswarstation).addTo(map);
    
    document.getElementById("stationDisplay").innerHTML = "Charging Stations at -> Bhubaneswar";
    createRoute(routeOptions);
    routeURL = kolkataPT_copy + ":" + bhubaneswarEV_copy + ":" + visakhapatnamPT_copy; 
};

let kolkataranchi = function (event) {
    let routeOptions = {
        key: apikey,
        locations: kolkataPT + ":" + burdwanEV + ":" + ranchiPT, // 1
    };
    
    stations = new tt.Marker().setLngLat(burdwanstation).addTo(map);
    
    document.getElementById("stationDisplay").innerHTML = "Charging Stations at -> Burdwan";
    createRoute(routeOptions);
    routeURL = kolkataPT_copy + ":" + burdwanEV_copy + ":" + ranchiPT_copy;
};

let kolkatapatna = function (event) {
    let routeOptions = {
        key: apikey,
        locations: kolkataPT + ":" + burdwanEV + ":" + bodhgayaEV + ":" + patnaPT, // 2
    };
    
    const marks = [burdwanstation, bodhgayastation];
    marks.forEach(item => (
        stations = new tt.Marker().setLngLat(item).addTo(map)
    ))
    
    document.getElementById("stationDisplay").innerHTML = "Charging Stations at -> Burdwan, Bodh Gaya";
    createRoute(routeOptions);
    routeURL = kolkataPT_copy + ":" + burdwanEV_copy + ":" + bodhgayaEV_copy + ":" + patnaPT_copy;
};

let delhiahmedabad = function (event) {
    let routeOptions = {
        key: apikey,
        locations: delhiPT + ":" + jaipurEV + ":" + ajmerEV + ":" + sirohiEV + ":" + ahmedabadPT, // 3
    };

    const marks = [jaipurstation, ajmerstation];
    marks.forEach(item => (
        stations = new tt.Marker().setLngLat(item).addTo(map)
    ))

    document.getElementById("stationDisplay").innerHTML = "Charging Stations at -> Jaipur, Ajmer, Sirohi";
    createRoute(routeOptions);
    routeURL = delhiPT_copy + ":" + jaipurEV_copy + ":" + ajmerEV_copy + ":" + sirohiEV_copy + ":" + ahmedabadPT_copy;
};

let delhiamritsar = function (event) {
    let routeOptions = {
        key: apikey,
        locations: delhiPT + ":" + karnalEV + ":" + ludhianaEV + ":" + amritsarPT, // 2
    };

    const marks = [karnalstation, ludhianastation];
    marks.forEach(item => (
        stations = new tt.Marker().setLngLat(item).addTo(map)
    ))

    document.getElementById("stationDisplay").innerHTML = "Charging Stations at -> Karnal, Ludhiana";
    createRoute(routeOptions);
    routeURL = delhiPT_copy + ":" + karnalEV_copy + ":" + ludhianaEV_copy + ":" + amritsarPT_copy;
};

let delhilucknow = function (event) {
    let routeOptions = {
        key: apikey,
        locations: delhiPT + ":" + agraEV + ":" + lucknowPT, // 1
    };
    
    stations = new tt.Marker().setLngLat(agrastation).addTo(map);
    
    document.getElementById("stationDisplay").innerHTML = "Charging Stations at -> Agra";
    createRoute(routeOptions);
    routeURL = delhiPT_copy + ":" + agraEV_copy + ":" + lucknowPT_copy;
};

let chennaibengaluru = function (event) {
    let routeOptions = {
        key: apikey,
        locations: chennaiPT + ":" + velloreEV + ":" + krishnagiriEV + ":" + bengaluruPT, // 2
    };

    const marks = [vellorestation, krishnagiristation];
    marks.forEach(item => (
        stations = new tt.Marker().setLngLat(item).addTo(map)
    ))

    document.getElementById("stationDisplay").innerHTML = "Charging Stations at -> Vellore, Krishnagiri";
    createRoute(routeOptions);
    routeURL = chennaiPT_copy + ":" + velloreEV_copy + ":" + krishnagiriEV_copy + ":" + bengaluruPT_copy;
};

let chennaicoimbatore = function (event) {
    let routeOptions = {
        key: apikey,
        locations: chennaiPT + ":" + salemEV + ":" + coimbatorePT, // 1
    };
    
    stations = new tt.Marker().setLngLat(salemstation).addTo(map);
    
    document.getElementById("stationDisplay").innerHTML = "Charging Stations at -> Salem";
    createRoute(routeOptions);
    routeURL = chennaiPT_copy + ":" + salemEV_copy + ":" + coimbatorePT_copy;
};

let chennaihyderabad = function (event) {
    let routeOptions = {
        key: apikey,
        locations: chennaiPT + ":" + vijaywadaEV + ":" + hyderabadPT, // 1
    };
    
    stations = new tt.Marker().setLngLat(vijaywadastation).addTo(map);
    
    document.getElementById("stationDisplay").innerHTML = "Charging Stations at -> Vijaywada";
    createRoute(routeOptions);
    routeURL = chennaiPT_copy + ":" + vijaywadaEV_copy + ":" + hyderabadPT_copy;
};

let bengalurukochi = function (event) {
    let routeOptions = {
        key: apikey,
        locations: bengaluruPT + ":" + salemEV + ":" + coimbatoreEV +":" + kochiPT, // 2
    };

    const marks = [salemstation, coimbatorestation];
    marks.forEach(item => (
        stations = new tt.Marker().setLngLat(item).addTo(map)
    ))

    document.getElementById("stationDisplay").innerHTML = "Charging Stations at -> Salem, Coimbatore";
    createRoute(routeOptions);
    routeURL = bengaluruPT_copy + ":" + salemEV_copy + ":" + coimbatoreEV_copy +":" + kochiPT_copy;
};

let kochipanaji = function (event) {
    let routeOptions = {
        key: apikey,
        locations: kochiPT + ":" + kozhikodeEV + ":" + mangaluruEV + ":" + panajiPT, // 2
    };

    const marks = [kozhikodestation, mangalurustation];
    marks.forEach(item => (
        stations = new tt.Marker().setLngLat(item).addTo(map)
    ))

    document.getElementById("stationDisplay").innerHTML = "Charging Stations at -> Kochi, Mangaluru";
    createRoute(routeOptions);
    routeURL = kochiPT_copy + ":" + kozhikodeEV_copy + ":" + mangaluruEV_copy + ":" + panajiPT_copy;
};

let hyderabadvisakhapatnam = function (event) {
    let routeOptions = {
        key: apikey,
        locations: hyderabadPT + ":" + vijaywadaEV + ":" + rajahmudryEV + ":" + visakhapatnamPT, // 2        
    };

    const marks = [vijaywadastation, rajahmudrystation];
    marks.forEach(item => (
        stations = new tt.Marker().setLngLat(item).addTo(map)
    ))

    document.getElementById("stationDisplay").innerHTML = "Charging Stations at -> Vijaywada, Rajahmudry";
    createRoute(routeOptions);
    routeURL = hyderabadPT_copy + ":" + vijaywadaEV_copy + ":" + rajahmudryEV_copy + ":" + visakhapatnamPT_copy;    
};


// BUILDING MAP & ADDING LAYERS

let apikey = "nMq5c5JQxz8jjuwTEpo4YHYhZ7Lqlly3";

let map;

const locateCurrentPosition = () => new Promise((resolve,reject)=> {
    navigator.geolocation.getCurrentPosition(
      position => {
        currLoc = [position["coords"]["longitude"], position["coords"]["latitude"]];
        resolve(position);
      },
      error => {
        console.log(error.message);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 50000
      }
    );
});

locateCurrentPosition().then(position=> {
    map = tt.map({
        key: apikey,
        container: "map",
        center: currLoc,       // zeromile(nagpur)
        zoom: 13,
        interactive: true,
        style: {
            map: "basic_night", // basic_main, basic_night
        },
    
        stylesVisibility: {
            trafficFlow: true,
            trafficIncidents: false,
        },
    });
    userLocation = new tt.Marker().setLngLat(currLoc).addTo(map);
});

// map.dragRotate.enable(); -> error

let createRoute = function (options) {
    tt.services.calculateRoute(options).then(function (response) {
        let geojson = response.toGeoJson();
        //console.log(geojson);  
        map.addLayer({
            id: "route",
            type: "line",
            source: {
                type: "geojson",
                data: geojson,
            },
            paint: {
                "line-color": "#4285F4",
                "line-width": 6,
            },
        });
    });
};

let moveMap = function (lnglat){
    map.flyTo({
        center: lnglat,
         zoom: 10
    })
}

function handleResults(result){
    //console.log(result);
    if(result.results){
        moveMap(result.results[0].position)
    }
}

function lookup(){
    tt.services.fuzzySearch({
        key: apikey,
        query: document.getElementById("source").value
    }).then(handleResults)
}

function routeDetails() {
    const getJSON = async url => {
        const response = await fetch(url);
        if(!response.ok) // check if response worked (no 404 errors etc...)
          throw new Error(response.statusText);
      
        const data = response.json(); // get JSON from the response
        return data; // returns a promise, which resolves to this data value
    }
    
    getJSON("https://api.tomtom.com/routing/1/calculateRoute/" + routeURL + "/json?key=" + apikey).then(data => {
        let distance = data["routes"]["0"]["summary"]["lengthInMeters"] / 1000;
        document.getElementById("distanceDisplay").innerHTML = "Route Length = " + distance + " Kms";
    }).catch(error => {
      //console.error(error);
    });    

    getJSON("https://api.tomtom.com/routing/1/calculateRoute/" + routeURL + "/json?key=" + apikey).then(data => {
        let time = data["routes"]["0"]["summary"]["travelTimeInSeconds"];
        let hours = Math.floor(time / 3600);
        let mins = Math.ceil((time - hours * 3600) / 60);
        document.getElementById("timeDisplay").innerHTML = "Estimated Time = " + hours + " hours " + mins + " mins";
    }).catch(error => {
      //console.error(error);
    });
}
