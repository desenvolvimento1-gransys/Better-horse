<template>
  <span>
    <div class="corpo">
      <h1>Políticas de Privacidade</h1>
      <div class="texto">
        <p></p>
      </div>
    </div>
  </span>
</template>

<script>
export default {};
</script>

<style>
h1 {
  text-align: center;
  color: black;
}

.corpo {
  margin-left: auto;
  margin-right: auto;
  margin-top: 1.5%;
  background-color: #dcd2c9;
  max-width: 1000px;
  height: auto;
  padding: 2%;
  border-radius: 10px;
}

.texto {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  text-align: justify;
}

@media only screen and (max-width: 600px) {
  .corpo {
    border-radius: 5px;
    padding: 10%;
    background-color: "white";
  }
  .texto {
    font-size: 14px;
  }
}
</style>