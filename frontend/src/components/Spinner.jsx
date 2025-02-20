function Spinner() {

    {/**Componente Spinner para cuando esté cargando los datos, se muestre un spinner */}
  return (
    <>
      <div className="d-flex justify-content-center align-items-center w-100 vh-100">
        <div className="spinner-border text-secondary" role="status" style={{width:"150px", height:"150px"}}>
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    </>
  );
}

export default Spinner;
