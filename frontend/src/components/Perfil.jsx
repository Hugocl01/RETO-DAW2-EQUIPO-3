function Perfil() {
    return (
        <div>
            <div class="container text-center">
                <div className="row row-cols-2">
                    <div className="col">
                        <div className="fotoPerfil">
                            <img src="../assets/imagenes/img1.jpg" class="rounded-circle"></img>
                        </div>

                        <div className="InfoPerfil">
                            <h3>Nombre Apellidos</h3>
                            <p>Tipo de perfil</p>
                            <p>Activo</p>
                            <button className="btn btn-primary w-100 py-2">Editar Perfil</button>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="seccionIzquierda">
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Magni ad consequatur quae, ipsam asperiores cumque iure, quisquam
                                odit doloremque temporibus voluptatibus quam vel quod itaque nulla
                                iste perspiciatis. Numquam, ex!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}



export default Perfil; 