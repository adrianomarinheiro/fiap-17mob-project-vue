<template>
  <div class="login">
    <v-form v-model="valid" >
      <v-container>
        <v-layout>
        <v-flex
            xs12
            md12>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              type="email"
              label="E-mail"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex
            xs12
            md12 >
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              type="password"
              label="Senha"
              required
            ></v-text-field>
          </v-flex>        
        </v-layout>
        <div class="text-xs-center">
        <v-btn @click="login" round color="warning" dark>Acessar</v-btn>
        </div>
        <p>Ainda não tem uma conta? Você pode <router-link to="/sign-up">criar uma aqui!</router-link></p>
      </v-container>
    </v-form>
  </div>
</template>



<script>
  import Vuetify from 'vuetify';

  import firebase from 'firebase';
  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: ''
             
      }
    },

    methods: {
      login: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('home')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    }
  }
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */

  .login {
    width: 100%;
    height: 100%;
    justify-content: center;
    margin-top: 250px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
    background: #bdbdbd;
  }
  button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
    color: #ffffff;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
    color: #fb8c00;
  }
</style>