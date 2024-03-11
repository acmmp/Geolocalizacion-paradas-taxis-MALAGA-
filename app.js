async function loadData(map) {
  const Menudelaizquierda = document.getElementById("Menudelaizquierda");
  var map = L.map("map");

  map.setView([36.7213, -4.4214], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  const response = await fetch("taxismalaga.geojson");
  const data = await response.json();
  var paradas = data.features;
  paradas.forEach((parada) => {
    console.log(parada.properties.ACCESOPMR);




              var coordenadas = parada.geometry.coordinates;
              var direccion = parada.properties.DIRECCION;
              var descripcion = parada.properties.DESCRIPCION;
              var arraycoordenadas = [coordenadas[1], coordenadas[0]];
              var punto = L.marker(arraycoordenadas).addTo(map);





    
    punto.bindPopup(
      "<b>" + descripcion + "</b><br><span>" + direccion + "</span>"
    );

    var item_menu = document.createElement("div");
    item_menu.classList.add("menu_item");
    item_menu.dataset.coordenada1 = coordenadas[1];
    item_menu.dataset.coordenada2 = coordenadas[0];

    var p_descripcion = document.createElement("p");
    p_descripcion.textContent = descripcion;
    var span_direccion = document.createElement("span");
    span_direccion.textContent = direccion;

    item_menu.appendChild(p_descripcion);
      item_menu.appendChild(span_direccion);
      var div_botones = document.createElement("div");
      div_botones.style.display = "flex";
     
   
    item_menu.addEventListener("click", (e) => {
       
      map.setView(
        [
          e.currentTarget.dataset.coordenada1,
          e.currentTarget.dataset.coordenada2,
        ],
        25
      );
    });
    if (parada.properties.ACCESOPMR == "Si") {
      var div_acceso = document.createElement("div");
      div_acceso.classList.add("acceso_item");
        div_acceso.textContent = "Accesible";
        div_botones.appendChild(div_acceso)
   



      }
      item_menu.appendChild(div_botones);
      var div_informacion = document.createElement("div");
      div_informacion.classList.add("info_item");
      div_informacion.textContent = "Más información";
      div_botones.appendChild(div_informacion)
    Menudelaizquierda.appendChild(item_menu);
  });
}



document.addEventListener("DOMContentLoaded", () => {
  loadData(map);
});
