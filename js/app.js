// para los objetos
var restaurantes =[
  {
		"nombre": "Palmares Azotea",
		"coordenadas":{"lat": "19.4193535",
                  "lng": "-99.1701212"} ,
		"foto": "https://dummyimage.com/400x400/000/fff",
    "direccion": "Durango 216, Roma."
	},

    {
		"nombre": "La parrillita Esquina Porteña",
		"coordenadas": {"lat": "19.4193501",
                    "lng": "-99.2029523"},
		"foto": "https://dummyimage.com/400x400/000/fff",
    "direccion": "Manzanillo 81, Roma."
	},

    {
		"nombre": "La casa de Cantera",
		"coordenadas": {"lat": "19.412246",
                    "lng": "-99.1621157"},
		"foto": "https://dummyimage.com/400x400/000/fff",
    "direccion": "Yucatán 147, Roma."
	},

    {
		"nombre": "La Vie en Rose",
		"coordenadas": {"lat": "19.4170418",
                    "lng": "-99.1702384"},
		"foto": "https://dummyimage.com/400x400/000/fff",
    "direccion": "Av. Álvaro Obregón 275,Roma."
	},

    {
		"nombre": "La Zaranda Miravalle",
		"coordenadas":{"lat": "19.4202911",
                  "lng": "-99.1691991"},
		"foto": "https://dummyimage.com/400x400/000/fff",
    "direccion": "Plaza Villa de Madrid 17,Roma."
}
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
