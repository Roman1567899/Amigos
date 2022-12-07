let amigos=[]

let btnguardar =document.querySelector("#btnguardar");
let btncancelar =document.querySelector("#btncancelar");



let lista=document.querySelector(".listaAmigos");
let formulario = document.querySelector("#formulario");


function limpiar()
{
    formulario[0].value=""; //Cuando el input del formulario este vacío limpie el input
    formulario[1].value="";
    formulario[2].value="";
    formulario[3].value="";
}

btncancelar.addEventListener("click",(event)=>
{
    limpiar();
    event.preventDefault(); //evita que el evento de click al boton cancelar, no recargue la página
});

function pintar()
{
    if(amigos.length>0)
    {
        lista.innerHTML="";
        amigos.forEach((contacto, indice)=>{
            let amigo=document.createElement("div");
            amigo.innerHTML=`<p>${contacto.nombre}</p><button class="muestraDetalles"><input type="hidden" value="${contacto.telefono}" />Detalles</button> <button class="btncerrar" indice="${indice}">Eliminar</button>`;  
            lista.appendChild(amigo);
        });
        let botones=document.getElementsByClassName("muestraDetalles");
        for(let i = 0; i<botones.length; i++)
        {
            const element = botones[i];
            element.addEventListener("click",()=>
            {
                showDetalles(element.children[0].value);
            })
        }
        botones=document.getElementsByClassName("btncerrar");
        for(let i = 0; i<botones.length; i++)
        {
            const element = botones[i];
            element.addEventListener("click",()=>
            {
                amigos.splice(element.getAttribute("indice"),1);
                pintar();
            });
        }       
    }
    else
    {
        lista.innerHTML="<h2> No tenemos compas</h2>";
    }
}


function showDetalles(tel)
{
    // alert(tel);
    let detalles =document.getElementById("detallesAmigo");
    let amigo=amigos.find(a=>{
        if(a.telefono==tel)
        {
            return a;
        }
    });

    detalles.innerHTML=`<img src="${amigo.foto}" alt="">
    <h3>${amigo.nombre}</h3>
    <p><span>Teléfono:</span>${amigo.telefono}</p>
    <p><span>Correo:</span>${amigo.correo}</p>
    <button id="btncerrar">Cerrar</button>`;
    detalles.classList.remove("oculto");
    cerrardetalles();

}

function cerrardetalles()
{
    let cerrar=document.getElementById("btncerrar");
    cerrar.addEventListener("click", (event)=>
    {
        let ventana=document.getElementById("detallesAmigo");
        ventana.classList.add("oculto"); 
    });
}


btnguardar.addEventListener("click",(event)=>
{
    if(formulario[0].value=="" && formulario[1].value=="" && formulario[2].value=="" && formulario[3].value=="")
    {
        // alert("Rellena todos los campos")
        let error=document.getElementById("error");
        error.classList.remove("oculto_error");
        event.preventDefault();
        console.log("Cochinero"); 
    }
    else if(formulario[1].value==amigos.telefono)
    {
        
        let errorcontacto=document.getElementById("error_conta");
        errorcontacto.classList.remove("ocultar_numero");
        event.preventDefault(); 
        console.log("Cochinero");  
    }
    else
    {
        let contacto=
        {
            nombre:formulario["nombre"].value,
            telefono:formulario["telefono"].value,
            correo:formulario["correo"].value,
            foto:formulario["foto"].value
        };

        amigos.push(contacto);
        limpiar();
        pintar()
        event.preventDefault();
    }
    
});



