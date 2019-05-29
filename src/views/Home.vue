<template>
  <v-container fluid class="pa-0">
    <v-layout row wrap justify-center>
      <v-flex xs12 sm12 md12 lg12>
        <div class="text-xs-center">
          <div >
            <v-btn @click="updatePerfil" color="warning" dark>Atualizar Perfil</v-btn>
            <v-btn @click="logout" color="warning" fab dark>
              <v-icon>close</v-icon>
            </v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>

    <!--Busca do Repositório-->
    
    <v-layout row wrap align-center>
      
      
      
      <v-flex xs12 sm12 md12 lg12>
      <p style="color: #fff;">Pesquise repositórios GitHub através do nome do usuário</p>
        <v-card ref="form">
          <v-card-text>
            <v-text-field
              v-model="userNameGitHub" 
              placeholder="Digite o nome do usuário"
              type="text"
              label="Usuário"
            ></v-text-field>

            <div class="text-xs-center">
              <v-btn @click="buscarRepoGitByUser" round color="warning" dark>Repositórios</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row >
    <v-flex xs12 sm12 md12 lg12>
      <v-card>
        

        <v-list three-line header style="margin: 20px;">
          <v-header inset>Repositórios</v-header>

          <v-list-tile
            v-for="repo in reposByUser" 
            :key="repo.length"
            
          >
            

            <v-list-tile-content  >
              <v-list-tile-title style="color: #fb8c00">{{ repo.name }}</v-list-tile-title>
              <v-list-tile-sub-title >{{ repo.url }}</v-list-tile-sub-title>
              <v-list-tile-sub-title style="color: yellow;">Estrelas: {{ repo.stargazers_count }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple >
                <v-icon color="grey lighten-1">play_arrow</v-icon>
              </v-btn>
            </v-list-tile-action>

          
          </v-list-tile>

          <v-divider inset></v-divider>

          
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>



  </v-container>
   
  <!--<div class="home">
     <HelloWorld msg="Welcome to Your Vue.js App"/> 
    <div class="hello">
      <button @click="updatePerfil">Atualizar Perfil</button>
      <br>
      <br>
      <button @click="logout">Logout</button>
    <div>
      <p>
        <b>Digite um usuário do github</b>
      </p>
      <input type="text" v-model="userNameGitHub" placeholder="Usuário Github">
      <br>
      <br>
      <button @click="buscarRepoGitByUser">Buscar</button>
      <br>
      <ul v-for="repo in reposByUser" :key="repo.length">
        <li>
          <b>Repositório:</b>
          {{ repo.name }}
        </li>
        <br>
        <li>
          <b>URL:</b>
          {{ repo.url }}
        </li>
        <br>
        <li>
          <b>Estrelas:</b>
          {{ repo.stargazers_count }}
        </li>
        <br>
        <br>
        <br>
      </ul>
      <br>
      <br>
    </div>
  </div>
  </div>-->
</template>


<script>
import firebase, { functions } from "firebase";
import $ from "jquery";

export default {
  name: "home",
  data() {
    return {
      userNameGitHub: "",
      reposByUser: []
    };
  },
  mounted: function() {
    var user = firebase.auth().currentUser;
    if (user != null) {
      // localStorage.name = user.displayName;

      var endereco = firebase
        .database()
        .ref(`users/` + user.uid)
        .on("value", snapshot => {
          localStorage.endereco = JSON.stringify(snapshot.val());
        });
    }
  },
  methods: {
    buscarRepoGitByUser: function() {
      var listaDeRepositorios = [];
      $.getJSON(
        "https://api.github.com" + "/users/" + this.userNameGitHub + "/repos",
        function(repositorisUsuario) {
          if (repositorisUsuario.message == "Not Found") {
            alert("Erro ao consultar repositorio");
            return;
          }

          if (repositorisUsuario != null) {
            repositorisUsuario.forEach(function(repo) {
              var repo = {
                name: repo.name,
                url: repo.url,
                stargazers_count: repo.stargazers_count
              };

              listaDeRepositorios.push(repo);
            });
          }
        }
      ).fail(function() {
        alert("Usuário não encontrado!");
      });
      this.reposByUser = listaDeRepositorios;
    },
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
    updatePerfil: function() {
      this.$router.replace("updateProfile");
    }
  }
};
</script>

 <style scoped>
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