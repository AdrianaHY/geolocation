// para los objetos
var restaurantes =[
  {
    "nombre": "Palmares Azotea",
		"dirección": "Durango 216, Roma.",
    "foto": "https://dummyimage.com/400x400/000/fff"
    "ubicacion":{"lat": "19.4193535","lng": "-99.1701212"}
  },
  {
    "nombre": "La parrillita Esquina Porteña",
		"direccion": "Manzanillo 81, Roma.",
    "foto": "https://dummyimage.com/400x400/000/fff"
    "ubicacion":
    {"lat": "19.4193501",
    "lng": "-99.2029523"}
  },
  {
    "nombre": "La casa de Cantera",
		"direccion": "Yucatán 147, Roma.",
    "foto": "https://dummyimage.com/400x400/000/fff"
    "ubicacion":
    {"lat": "19.412246",
    "lng": "-99.1621157"}
  },
  {
    "nombre": "La Vie en Rose",
		"direccion": "Av. Álvaro Obregón 275,Roma.",
    "foto": "https://dummyimage.com/400x400/000/fff"
    "ubicacion":
    {"lat": "19.4170418",
    "lng": "-99.1702384"}
  },
  {
    "nombre": "La Zaranda Miravalle",
		"direccion": "Plaza Villa de Madrid 17,Roma.",
    "foto": "https://dummyimage.com/400x400/000/fff"
    "ubicacion":
    {"lat": "19.4202911",
    "lng": "-99.1691991"}
  },
];




var cargarPagina = function(){
    //para el mapa
    if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(mostrarPosicion);
	} else {
		alert("Actualice su navegador");
	}
  mostrarRestaurant(restaurant);
};

var plantillaRestaurant =
    '<div class="row">'+
      '<div class="col s12 m7">'+
        '<h5 class="header">__nombre__</h5>'+
        '<div class="card horizontal">'+
          '<div class="card-image">'+
            '<img src="__foto__>'+
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
	restaurantes.forEach(function (restaurant) {
		plantillaFinal += plantillaRestaurant.replace("__nombre__", restaurantes.nombre)
			.replace("__direccion__", restaurantes.direccion)
			.replace("__foto__", restaurantes.foto)
      .replace("__ubicacion__", restaurantes.ubicacion.lat + restaurantes.ubicacion.lng);
});
  $("#restaurantes").html(plantillaFinal);

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
}


$(document).ready(cargarPagina);
