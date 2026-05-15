
function ObtenerDatos() {
    const input = document.getElementById('search').value.toLocaleLowerCase().trim();

    fetch('./travelRecommendation/travel_recommendation_api.json')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            filtrarDatos(data, input);
        })
        .catch((error) => {
            console.log('Error', error)
        });

}// paso las pruebas

function filtrarDatos(data, input) {
    const resultado = [

        //Busca por "Paises" como busquesda General sacando los nombres de ciudad
        ...data.countries.filter(grupos => grupos.name.toLocaleLowerCase().includes(input)).flatMap(g => g.paises).flatMap(pai => pai.cities),

        //Busca por nombres de ciudad
        ...data.countries.flatMap(
            contry => contry.paises.flatMap(pai => pai.cities.filter(c => c.name.toLocaleLowerCase().includes(input)
            )
            )
        ),
        // Busca por "Templos" en General sacando todos los templos
        ...data.temples.filter(
            temp => temp.name.toLocaleLowerCase().includes(input)).flatMap(tem => tem.temple),


        //Busca por "Beaches" como busqueda general..
        ...data.beaches.filter(
            b => b.name.toLocaleLowerCase().includes(input)).flatMap(t => t.playa),

    ];
    mostrarDatos(resultado);

}

// paso las pruebas
function mostrarDatos(resultado) {
    //Obtiene Input y contenedor
    const divResultado = document.getElementById('ctn_resultado');
    let html = '';

    if (resultado.length > 0) {
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
        divResultado.textContent = 'No se encontraron resultados para tu búsqueda.';
    }
}

function BorrarHtml() {
    const input = document.getElementById('search').value = "";
    const divResultado = document.getElementById('ctn_resultado');
    divResultado.innerHTML = "";
    divResultado.style.transform = "translateY(0px)";
    
}
const buscar = document.getElementById('btn_Buscar');
buscar.addEventListener('click', ObtenerDatos);

const Borrar = document.getElementById('btn_borrar');
Borrar.addEventListener('click', BorrarHtml);