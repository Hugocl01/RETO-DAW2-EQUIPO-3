function Inicio() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="imagenInicio">
                <img src="../src/assets/imagenes/img2.png" className="w-100 h-100 vh-100 object-fit-cover" alt="..." />
            </div>

            <div className="d-flex flex-column align-items-center justify-content-center p-5">
                <h1 className="text-center mb-5">Noticias</h1>
                <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>

                    <div class="carousel-inner">
                        <div class="carousel-item active" data-bs-interval="10000">
                            <div className="bg-light p-3 rounded-2 d-flex flex-column align-items-center justify-content-center">
                                <div className="w-75 d-flex flex-column align-items-center justify-content-center">
                                    <img className="mb-4 w-50 mt-3" src="../src/assets/imagenes/img2.png" />
                                    <h3>Noticia 1</h3>
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                        Necessitatibus vel repellendus perspiciatis aspernatur!
                                        Consequuntur assumenda praesentium modi! Doloremque
                                        asperiores corrupti adipisci quos id dolorem, enim ullam
                                        tempora reprehenderit delectus eum?</p>
                                </div>
                            </div>

                            <div class="carousel-caption d-none d-md-block">

                            </div>
                        </div>
                        <div class="carousel-item" data-bs-interval="2000">
                            <div className="bg-light p-3 rounded-2 d-flex flex-column align-items-center justify-content-center">
                                <div className="w-75 d-flex flex-column align-items-center justify-content-center">
                                    <img className="mb-4 w-50 mt-3" src="../src/assets/imagenes/img4.png" />
                                    <h3>Noticia 2</h3>
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                        Necessitatibus vel repellendus perspiciatis aspernatur!
                                        Consequuntur assumenda praesentium modi! Doloremque
                                        asperiores corrupti adipisci quos id dolorem, enim ullam
                                        tempora reprehenderit delectus eum?</p>
                                </div>
                            </div>

                            <div class="carousel-caption d-none d-md-block">

                            </div>
                        </div>

                        <div class="carousel-item">
                            <div className="bg-light p-3 rounded-2 d-flex flex-column align-items-center justify-content-center">
                                <div className="w-75 d-flex flex-column align-items-center justify-content-center">
                                    <img className="mb-4 w-50 mt-3" src="../src/assets/imagenes/img2.png" />
                                    <h3>Noticia 3</h3>
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                        Necessitatibus vel repellendus perspiciatis aspernatur!
                                        Consequuntur assumenda praesentium modi! Doloremque
                                        asperiores corrupti adipisci quos id dolorem, enim ullam
                                        tempora reprehenderit delectus eum?</p>
                                </div>
                            </div>

                            <div class="carousel-caption d-none d-md-block">

                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

                <hr className="border-3 border-black d-block w-100 my-5" />

                <h1 className="text-center mb-5">Retos</h1>
                <div id="carouselExampleDark2" class="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleDark2" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleDark2" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleDark2" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>

                    <div class="carousel-inner">
                        <div class="carousel-item active" data-bs-interval="10000">
                            <div className="bg-light p-3 rounded-2 d-flex flex-column align-items-center justify-content-center">
                                <div className="w-75 d-flex flex-column align-items-center justify-content-center">
                                    <img className="mb-4 w-50 mt-3" src="../src/assets/imagenes/img2.png" />
                                    <h3>Reto 1</h3>
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                        Necessitatibus vel repellendus perspiciatis aspernatur!
                                        Consequuntur assumenda praesentium modi! Doloremque
                                        asperiores corrupti adipisci quos id dolorem, enim ullam
                                        tempora reprehenderit delectus eum?</p>
                                </div>
                            </div>

                            <div class="carousel-caption d-none d-md-block">

                            </div>
                        </div>
                        <div class="carousel-item" data-bs-interval="2000">
                            <div className="bg-light p-3 rounded-2 d-flex flex-column align-items-center justify-content-center">
                                <div className="w-75 d-flex flex-column align-items-center justify-content-center">
                                    <img className="mb-4 w-50 mt-3" src="../src/assets/imagenes/img4.png" />
                                    <h3>Reto 2</h3>
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                        Necessitatibus vel repellendus perspiciatis aspernatur!
                                        Consequuntur assumenda praesentium modi! Doloremque
                                        asperiores corrupti adipisci quos id dolorem, enim ullam
                                        tempora reprehenderit delectus eum?</p>
                                </div>
                            </div>

                            <div class="carousel-caption d-none d-md-block">

                            </div>
                        </div>

                        <div class="carousel-item">
                            <div className="bg-light p-3 rounded-2 d-flex flex-column align-items-center justify-content-center">
                                <div className="w-75 d-flex flex-column align-items-center justify-content-center">
                                    <img className="mb-4 w-50 mt-3" src="../src/assets/imagenes/img2.png" />
                                    <h3>Reto 3</h3>
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                        Necessitatibus vel repellendus perspiciatis aspernatur!
                                        Consequuntur assumenda praesentium modi! Doloremque
                                        asperiores corrupti adipisci quos id dolorem, enim ullam
                                        tempora reprehenderit delectus eum?</p>
                                </div>
                            </div>

                            <div class="carousel-caption d-none d-md-block">

                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark2" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark2" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

                <hr className="border-3 border-black d-block w-100 my-5" />

                <div className="container">
                    <h1 className="text-center mb-5">Donaciones</h1>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        <div className="col">
                            <div className="bg-light p-3 rounded-2 text-center">
                                <h2>Total donado</h2>
                            </div>
                        </div>

                        <div className="col">
                            <div className="bg-light p-3 rounded-2 text-center">
                                <h2>Info y enlace a donar</h2>
                                <button className="btn btn-primary mt-2">Donar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-3 border-black d-block w-100 my-5" />

                <div className="d-flex flex-column justify-content-center align-items-center mb-5">
                    <h1 className="text-center mb-4">Patrocinadores</h1>
                    <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
                        <div className="bg-light w-25 h-25 p-3 rounded-2 text-center">
                            <p>Patrocinador 1</p>
                        </div>

                        <div className="bg-light w-25 h-40 p-3 rounded-2 text-center">
                            <p>Patrocinador 2</p>
                        </div>

                        <div className="bg-light w-25 h-40 p-3 rounded-2 text-center">
                            <p>Patrocinador 3</p>
                        </div>

                        <div className="bg-light w-25 h-40 p-3 rounded-2 text-center">
                            <p>Patrocinador 4</p>
                        </div>

                        <div className="bg-light w-25 h-40 p-3 rounded-2 text-center">
                            <p>Patrocinador 5</p>
                        </div>

                        <div className="bg-light w-25 h-40 p-3 rounded-2 text-center">
                            <p>Patrocinador 6</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inicio;
