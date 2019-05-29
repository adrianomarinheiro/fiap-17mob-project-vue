<template>

  <v-container fluid class="pa-0">
   <v-layout row wrap align-center justify-center>
    <v-flex xs12 sm12 md12 lg12>
    <h2 style="color: #fb8c00">Cadastre seu Nome Completo</h2>
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            v-model="displayName"
            type="text"
            label="Nome Completo"
          ></v-text-field>
          <br>
          <div class="text-xs-center">
            <v-btn @click="updateProfileUser" round color="warning" dark>Atualizar Dados</v-btn>
          </div>
          <br>
          <div class="text-xs-center">
            <v-btn @click="backToHome" round color="warning" dark>Retornar aos repositórios</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
   </v-layout>
  </v-container>
  <!--<div class="sign-up">
    <p>Atualize seu nome completo</p>
    <input type="text" v-model="displayName" placeholder="Nome de usuário">
    <br>
    <button @click="updateProfileUser">Atualizar Perfil</button>
    <br>
    <br>
    <button @click="backToHome">Voltar</button>
  </div>-->
</template>

 <script>
import firebase from "firebase";
import $ from "jquery";
export default {
  name: "updateProfile",
  data() {
    return {
      displayName: ""
    };
  },
  methods: {
    updateProfileUser: function() {
      var userLogado = firebase.auth().currentUser;
      localStorage.name = this.displayName;
      userLogado
        .updateProfile({
          displayName: this.displayName
        })
        .then(function() {
          console.log("Nome do usuário atualizado com sucesso!");
        });
      this.$router.replace("home");
    },
    backToHome: function() {
      this.$router.replace("home");
    }
  }
};
</script>

 <style scoped>
.sign-up {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
.text-danger {
  position: absolute;
  top: 20px;
  font-size: 12px;
}
</style>