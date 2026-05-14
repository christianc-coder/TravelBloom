
function ObtenerDatos() {
    const input = document.getElementById('search').value.toLocaleLowerCase().trim();

    fetch('travel_recommendation_api.json')
        .then(res => res.json())

        .then(data => {
            filtrarDatos(data, input);
        })
        .catch((error) => {
            console.log('Error', error)
        });

}// paso las pruebas

function filtrarDatos(data, input) {
    const resultado = [
        //...data.countries.filter( 

        // country => country.name.toLocaleLowerCase().includes(input)).flatMap(c => c.cities),
        //Busca por nombres de ciudad
        ...data.countries.flatMap(
            contry => contry.cities.filter(city => city.name.toLocaleLowerCase().includes(input))),

        //  ...data.temples.filter( temp => temp.name.toLocaleLowerCase().includes(input)),
        // Usa Temples como busqueda general para buscar templos
        ...data.temples.filter(
            temp => temp.name.toLocaleLowerCase().includes(input)).flatMap(tem => tem.temple),

        ...data.beaches.filter(
            beach => beach.name.toLocaleLowerCase().includes(input)),
    ];
    mostrarDatos(resultado);
}

// paso las pruebas
function mostrarDatos(resultado) {
    //Obtiene Input y contenedor
    const divResultado = document.getElementById('ctn_resultado');
    let html = '';

    if (resultado) {
        resultado.forEach(data => {


            html +=
                `<div class="resultado">
        <img src="${data.imageUrl}" alt="ciudad"><br>
        <h3>${data.name}</h3><br>
        <p>${data.description}</p>
        </div>`

        });

       divResultado.style.transform = 'translateY(0px)';

        divResultado.innerHTML = html;

        divResultado.style.transform = 'translateY(60px)';
       // divResultado.innerHTML = "";
        //setTimeout(() => {

          //  divResultado.innerHTML = html;
          //  divResultado.classList.add('aparecer')
       // }, 50);


    } else {
        divResultado.textContent = 'Hubo un error en la obtencion en los datos';
    }
}

function BorrarHtml() {
    const divResultado = document.getElementById('ctn_resultado');
    divResultado.innerHTML = "";
    divResultado.style.transform = "translateY(0px)";
}
const buscar = document.getElementById('btn_Buscar');
buscar.addEventListener('click', ObtenerDatos);

const Borrar = document.getElementById('btn_borrar');
Borrar.addEventListener('click', BorrarHtml);