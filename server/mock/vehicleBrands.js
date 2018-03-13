
const mongodb = require('mongodb');

vb1 = {
    name: "Toyota",
    models: [
        {
            _id: new mongodb.ObjectID(),
            name: "Corolla"
        },
        { _id: new mongodb.ObjectID(), name: "Auris" },
        { _id: new mongodb.ObjectID(), name: "Yaris" },
        { _id: new mongodb.ObjectID(), name: "Hilux" },
        { _id: new mongodb.ObjectID(), name: "Verso" }
    ]
}

vb2 = {
    name: "Fiat",
    models: [
        { _id: new mongodb.ObjectID(), name: "Egea", },
        { _id: new mongodb.ObjectID(), name: "500x" },
        { _id: new mongodb.ObjectID(), name: "500" },
        { _id: new mongodb.ObjectID(), name: "500L" },
        { _id: new mongodb.ObjectID(), name: "Spider" }
    ]
}

vb3 = {
    name: "Renault",
    models: [
        { _id: new mongodb.ObjectID(), name: "Symbol" },
        { _id: new mongodb.ObjectID(), name: "Clio" },
        { _id: new mongodb.ObjectID(), name: "Captur" },
        { _id: new mongodb.ObjectID(), name: "Megane" },
        { _id: new mongodb.ObjectID(), name: "Kadjar" }

    ]
}

// vb4 = {
//     brandName: "BMW"
// }

// vb5 = {
//     brandName: "Mercedes"
// }

// vb6 = {
//     brandName: "Citroen"
// }

// vb7 = {
//     brandName: "Honda"
// }

// vb8 = {
//     brandName: "Ford"
// }

// toyota
bm11 = {
    brandModelName: "Corolla",
}
bm12 = {
    brandModelName: "Auris"
}
bm13 = {
    brandModelName: "Yaris"
}
bm14 = {
    brandModelName: "Hilux"
}
bm15 = {
    brandModelName: "Verso"
}

// fiat
bm21 = {
    brandModelName: "Egea",
}
bm22 = {
    brandModelName: "500x"
}
bm23 = {
    brandModelName: "500"
}
bm24 = {
    brandModelName: "500L"
}
bm25 = {
    brandModelName: "Spider"
}

// Renault
bm31 = {
    brandModelName: "Symbol",
}
bm32 = {
    brandModelName: "Clio"
}
bm33 = {
    brandModelName: "Captur"
}
bm34 = {
    brandModelName: "Megane"
}
bm35 = {
    brandModelName: "Kadjar"
}

// bm41 = {
//     brandModelName: "Corolla",
// }
// bm42 = {
//     brandModelName: "Auris"
// }
// bm43 = {
//     brandModelName: "Yaris"
// }
// bm44 = {
//     brandModelName: "Hilux"
// }
// bm45 = {
//     brandModelName: "Verso"
// }

// bm51 = {
//     brandModelName: "Corolla",
// }
// bm52 = {
//     brandModelName: "Auris"
// }
// bm53 = {
//     brandModelName: "Yaris"
// }
// bm54 = {
//     brandModelName: "Hilux"
// }
// bm55 = {
//     brandModelName: "Verso"
// }

// bm61 = {
//     brandModelName: "Corolla",
// }
// bm62 = {
//     brandModelName: "Auris"
// }
// bm63 = {
//     brandModelName: "Yaris"
// }
// bm64 = {
//     brandModelName: "Hilux"
// }
// bm65 = {
//     brandModelName: "Verso"
// }

// bm71 = {
//     brandModelName: "Corolla",
// }
// bm72 = {
//     brandModelName: "Auris"
// }
// bm73 = {
//     brandModelName: "Yaris"
// }
// bm74 = {
//     brandModelName: "Hilux"
// }
// bm75 = {
//     brandModelName: "Verso"
// }

// bm81 = {
//     brandModelName: "Corolla",
// }
// bm82 = {
//     brandModelName: "Auris"
// }
// bm83 = {
//     brandModelName: "Yaris"
// }
// bm84 = {
//     brandModelName: "Hilux"
// }
// bm85 = {
//     brandModelName: "Verso"
// }

module.exports = [vb1, vb2, vb3];