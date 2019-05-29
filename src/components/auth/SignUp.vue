<template>
  
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            type="email"
            label="E-mail"
            required
          ></v-text-field>

           <v-text-field
            v-model="password"
            :rules="passwordRules"
            type="password"
            label="Senha"
            required
          ></v-text-field>

          <p>Busque seu endereço</p>

          <v-text-field
            v-model="cep"
            label="CEP"
            type="text"
            placeholder="ex: 05422000"
            maxlength="8"
            pattern="([0-9]{8})"
          ></v-text-field>

          <div class="text-xs-center">
            <v-btn @click="buscar" round color="warning" dark>Buscar</v-btn>
          </div>

          <v-text-field
            v-model="endereco.logradouro"
            type="text"
            label="Logradouro"
          ></v-text-field>

          <v-text-field
            v-model="endereco.numero"
            type="number"
            label="Número"
          ></v-text-field>

          <v-text-field
            v-model="endereco.complemento"
            type="text"
            label="Complemento"
          ></v-text-field>

          <v-text-field
            v-model="endereco.bairro"
            type="text"
            label="Bairro"
          ></v-text-field>

          <v-text-field
            v-model="endereco.localidade"
            type="text"
            label="Cidade"
          ></v-text-field>

          <v-text-field
            v-model="endereco.uf"
            type="text"
            label="Estado"
          ></v-text-field>

                
          
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>          
          <v-btn @click="signUp"  color="warning" dark>Cadastrar</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat ><router-link to="/login">Cancelar</router-link></v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
  

</template>

 <script>
import firebase from "firebase";
import $ from "jquery";
import { constants } from "crypto";
export default {
  name: "signUp",
  data: () => {
    return {
      email: "",
      password: "",
      cep: "",
      endereco: {
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        localidade: "",
        uf: ""
      },
      naoLocalizado: false
    };
  },
  methods: {
    signUp: function() {

      // validate
      if (
        this.email &&
        this.password &&
        this.endereco.cep &&
        this.endereco.logradouro &&
        this.endereco.numero &&
        this.endereco.bairro &&
        this.endereco.localidade &&
        this.endereco.uf
      ) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(
            user => {
              console.log(user);
              var userLogado = firebase.auth().currentUser;
              console.log("UID usuário logado: " + userLogado.uid);
              console.log("Endereço atualizado: ", this.endereco);
              firebase
                .database()
                .ref("users/" + userLogado.uid)
                .set(this.endereco);
              console.log(this.endereco.logradouro);
              console.log("Usuário criado e autenticado");
              this.$router.replace("home");
            },
            err => {
              alert("Oops. " + err.message);
            }
          );
      } else {
        alert("Por favor preencha todos os campos ");
      }
    },
    buscar: function() {
      if (this.cep.length == 8) {
        this.naoLocalizado = false;

        if (/^[0-9]{8}$/.test(this.cep)) {
          $.getJSON("https://viacep.com.br/ws/" + this.cep + "/json/", function(
            enderecoRetornado
          ) {
            if (enderecoRetornado.erro) {
              this.endereco = {};
              this.naoLocalizado = true;
              return;
            }
            console.log("Atualizando endereço...");
            console.log("Endereço retornado: ", enderecoRetornado);
            this.endereco = {
              cep: enderecoRetornado.cep,
              logradouro: enderecoRetornado.logradouro,
              numero: "",
              complemento: enderecoRetornado.complemento,
              bairro: enderecoRetornado.bairro,
              localidade: enderecoRetornado.localidade,
              uf: enderecoRetornado.uf
            };
            console.log("Endereço interno atualizado: ", this.endereco);
            localStorage.endereco = JSON.stringify(this.endereco);
          });
          if (localStorage.endereco) {
            this.endereco = JSON.parse(localStorage.endereco);
          }
        } else {
          alert(
            "Por favor preencher o campo CEP corretamente com 8 caracteres."
          );
        }
      } else {
        alert("Por favor preencher o campo CEP corretamente com 8 caracteres.");
      }
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
button {
  margin-top: 10px;
  width: 10%;
  cursor: pointer;
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
.cancela{
  color: #fb8c00;
}
</style>