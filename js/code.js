//debugger
var num_dato = document.getElementById("cambio_estado")

var editar = document.getElementById("cambio")
editar.value = "false"
//console.log (editar.value)

var texto_boton = document.getElementById("boton_formulario")
texto_boton.textContent = '- Guardar datos -'

var contador_data = 1

    if (localStorage.getItem("contador") == null) {
        localStorage.setItem('contador', contador_data)
    } else {
        contador_data = localStorage.getItem("contador")
    }

    
function enlistar_data(contador_actual = 1, actualiza_tabla = false){

    let info_tabla = document.getElementById("movie-list")

    let titulo_formulario = document.querySelector("#titulo_estado_formulario")
    titulo_formulario.innerHTML = `Start entering data of movies:`

    if (actualiza_tabla) {
        let contador_futuro = localStorage.getItem('contador')
        for (let x = 1; x < contador_futuro; x++) {
            if(localStorage.getItem('Title_' + x) != null && localStorage.getItem('Year_' + x) != null && 
                localStorage.getItem('Clasif_' + x) != null && localStorage.getItem('Duracion_' + x) != null && 
                localStorage.getItem('Stars_' + x) != null){
                
                    info_tabla.innerHTML += `
                <tr id="filas-datos">
                    <td>${localStorage.getItem('Title_' + x)}</td>
                    <td>${localStorage.getItem('Year_' + x)}</td>
                    <td>${localStorage.getItem('Clasif_' + x)}</td>
                    <td>${localStorage.getItem('Duracion_' + x)}</td>
                    <td>${localStorage.getItem('Stars_' + x)}</td>
                    <td>
                        <i class="fas fa-pen-fancy mx-2" onclick="editar_elemento(${x})"></i>
                        <i class="fas fa-trash-alt mx-2" onclick="borrar_elemento(${x})"></i>
                    </td>
                </tr> `
            }
        }
    } else {
        info_tabla.innerHTML += `
        <tr id="filas-datos">
            <td>${localStorage.getItem('Title_' + contador_actual)}</td>
            <td>${localStorage.getItem('Year_' + contador_actual)}</td>
            <td>${localStorage.getItem('Clasif_' + contador_actual)}</td>
            <td>${localStorage.getItem('Duracion_' + contador_actual)}</td>
            <td>${localStorage.getItem('Stars_' + contador_actual)}</td>
            <td>
                <i class="fas fa-pen-fancy mx-2" onclick="editar_elemento(${contador_actual})"></i>
                <i class="fas fa-trash-alt mx-2" onclick="borrar_elemento(${contador_actual})"></i>
            </td>
        </tr> `
    }
}

enlistar_data(1, true)

function almacenar_datos(){
    //debugger
    
    if(editar.value == "false"){
        
        var titulo = document.getElementById("movie_title").value
        var año_lanzamiento = document.getElementById("movie_year").value
        var clasificacion = document.getElementById("movie_age").value
        var duracion = document.getElementById("movie_time").value
        var estrellas = document.getElementById("movie_stars").value
    
        localStorage.setItem("Title_"+contador_data, titulo)
        localStorage.setItem("Year_"+contador_data, año_lanzamiento)
        localStorage.setItem("Clasif_"+contador_data, clasificacion)
        localStorage.setItem("Duracion_"+contador_data, duracion)
        localStorage.setItem("Stars_"+contador_data, estrellas)
    
        contador_data = parseInt(contador_data) + 1
        localStorage.setItem("contador", contador_data)
        let contador_actual = parseInt(contador_data) - 1
        
        enlistar_data(contador_actual)
        
        document.getElementById("limpiar_formulario").reset()

    }else if(editar.value == "true"){
        var indice_dato = parseInt(num_dato.value)
        
        let new_titulo = document.getElementById("movie_title").value
        let new_año_lanzamiento = document.getElementById("movie_year").value
        let new_clasificacion = document.getElementById("movie_age").value
        let new_duracion = document.getElementById("movie_time").value
        let new_estrellas = document.getElementById("movie_stars").value

        localStorage.setItem("Title_"+indice_dato, new_titulo)
        localStorage.setItem("Year_"+indice_dato, new_año_lanzamiento)
        localStorage.setItem("Clasif_"+indice_dato, new_clasificacion)
        localStorage.setItem("Duracion_"+indice_dato, new_duracion)
        localStorage.setItem("Stars_"+indice_dato, new_estrellas)

        let info_tabla = document.getElementById("movie-list")
        info_tabla.innerHTML = ''

        let titulo_formulario = document.querySelector("#titulo_estado_formulario")
        titulo_formulario.innerHTML = `Insertar nuevo dato`

        let subtitulo = document.getElementById("subtitulo_dato_editando")
        subtitulo.innerHTML = ``

        enlistar_data(1, true)
        
        editar.value = "false"
        
        document.getElementById("limpiar_formulario").reset()

        var filas = document.getElementById("filas-datos")
        filas.className = ''

        texto_boton.textContent = '- Guardar datos -'
    }
}

function editar_elemento(indice_dato) {
    //console.log(indice_dato)
    num_dato.value = indice_dato
    
    editar.value = "true"
    
    let titulo_formulario = document.getElementById("titulo_estado_formulario")
    titulo_formulario.innerHTML = `Actualizar dato`

    let subtitulo = document.getElementById("subtitulo_dato_editando")
    subtitulo.innerHTML = `Estas editanto el dato # ${indice_dato}`

    texto_boton.textContent = '- Enviar cambios -'

    var filas = document.getElementById("filas-datos")
    filas.className = "filas-en-edicion"

    var input_titulo = document.getElementById("movie_title")
    var input_año_lanzamiento = document.getElementById("movie_year")
    var input_clasificacion = document.getElementById("movie_age")
    var input_duracion = document.getElementById("movie_time")
    var input_estrellas = document.getElementById("movie_stars")

    input_titulo.value = localStorage.getItem("Title_" + indice_dato)
    input_año_lanzamiento.value = localStorage.getItem("Year_" + indice_dato)
    input_clasificacion.value = localStorage.getItem("Clasif_" + indice_dato)
    input_duracion.value = localStorage.getItem("Duracion_" + indice_dato)
    input_estrellas.value = localStorage.getItem("Stars_" + indice_dato)
}

function borrar_elemento(ubi_dato) {
    //console.log(ubi_dato)
    //debugger
    let info_tabla = document.getElementById("movie-list")
    info_tabla.innerHTML = ''

    localStorage.removeItem("Title_" + ubi_dato)
    localStorage.removeItem("Year_" + ubi_dato)
    localStorage.removeItem("Clasif_" + ubi_dato)
    localStorage.removeItem("Duracion_" + ubi_dato)
    localStorage.removeItem("Stars_" + ubi_dato)
    enlistar_data(1, true)
}