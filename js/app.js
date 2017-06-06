// para los objetos
var restaurantes =[
  {
		"nombre": "Palmares Azotea",
		"coordenadas":{'lat': 19.4193535,
                  'lng': -99.1701212} ,
		"foto": "assets/img/palmares.jpg",
    "direccion": "Durango 216, Roma.",
    "comida":"internacional"
	},

    {
		"nombre": "La parrillita Esquina Porteña",
		"coordenadas": {'lat': 19.4193501,
                    'lng': -99.2029523},
		"foto": "assets/img/parrillita.jpg",
    "direccion": "Manzanillo 81, Roma.",
    "comida": "argentina"
	},

    {
		"nombre": "La casa de Cantera",
		"coordenadas": {'lat': 19.412246,
                    'lng': -99.1621157},
		"foto": "assets/img/cantera.jpg",
    "direccion": "Yucatán 147, Roma.",
    "comida":"internacional"
	},

    {
		"nombre": "La Vie en Rose",
		"coordenadas": {'lat': 19.4170418,
                    'lng': -99.1702384},
		"foto": "./assets/img/vie.jpg",
    "direccion": "Av. Álvaro Obregón 275,Roma.",
    "comida": "francesa"
	},

    {
		"nombre": "La Zaranda Miravalle",
		"coordenadas":{'lat': 19.4202911,
                  'lng': -99.1691991},
		"foto": "assets/img/zaranda.jpg",
    "direccion": "Plaza Villa de Madrid 17,Roma.",
    "comida": "Pescados y mariscos"
}
];

var cargarPagina = function(){
    //para el mapa
    if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(mostrarPosicion);
	} else {
		alert("Actualice su navegador");
	}
  mostrarRestaurant(restaurantes);
  $("#search-form").submit(filtrarLugares);
  $('select').material_select();

};

var plantillaRestaurant =
    '<div class="row restaurante" data-latitud="__latitud__" data-longitud="__longitud__">'+
      '<div class="col s12 m7">'+
        '<h5 class="header">__nombre__</h5>'+
        '<div class="card horizontal">'+
          '<div class="card-image">'+
            '<img src="__foto__">'+
          '</div>'+
          '<div class="card-stacked">'+
            '<div class="card-content">'+
              '<p>__direccion__</p>'+
            '</div>'+
            '<div class="card-action">'+
              '<a href="#">__ubicacion__</a>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>';

var mostrarRestaurant = function (restaurantes) {
	var plantillaFinal = "";
	restaurantes.forEach(function (restaurante) {
		plantillaFinal += plantillaRestaurant.replace("__nombre__", restaurante.nombre)
			.replace("__direccion__", restaurante.direccion)
			.replace("__foto__", restaurante.foto)
      .replace("__latitud__", restaurante.coordenadas.lat)
      .replace("__longitud__",restaurante.coordenadas.lng)
});
  $("#restaurantes").html(plantillaFinal);

  $(".restaurante").click(function(){
  var latitud = $(this).data("latitud");
  var longitud = $(this).data("longitud");
  console.log(latitud);
  console.log(longitud);
  var coordenadasRestaurant = {
    lat:latitud,
    lng:longitud
  };
  console.log(coordenadasRestaurant);
  mostrarMapa(coordenadasRestaurant);

  })

};

var mostrarPosicion = function (posicion) {
	var coordenadas = {
		lat: posicion.coords.latitude,
		lng: posicion.coords.longitude
	};
    console.log(posicion.coords.latitude);
	mostrarMapa(coordenadas);
};

var mostrarMapa = function (coordenadas) {
	var map = new google.maps.Map($('.map')[0], {
      zoom: 17,
      center: coordenadas
    });
    var marker = new google.maps.Marker({
      position: coordenadas,
      map: map
    });
};
var filtrarLugares = function (e) {
	e.preventDefault();
	var criterioBusqueda =parseInt($("select").val().toLowerCase());
  var palabraBusqueda = $("#search").val().toLowerCase();
	var lugaresFiltrados = restaurantes.filter(function (restaurant) {
    if (criterioBusqueda === 1){
      return restaurant.comida.toLowerCase().indexOf(palabraBusqueda) >= 0;
    }else if(criterioBusqueda === 2){
		  return restaurant.direccion.toLowerCase().indexOf(palabraBusqueda) >= 0;
    }else if(criterioBusqueda === 3){
      return restaurant.nombre.toLowerCase().indexOf(palabraBusqueda) >= 0;
    }
	});
	mostrarRestaurant(lugaresFiltrados);
};


$(document).ready(cargarPagina);
