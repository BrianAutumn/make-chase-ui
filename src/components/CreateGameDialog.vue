<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator>
      <v-btn @click="activate">
        Create Game
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Create Game</v-card-title>
      <v-card-text>
        <v-text-field label="name" v-model="name"/>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="create">
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "CreateGameDialog",
  data(){
    return {
      dialog:false,
      name:''
    }
  },
  methods:{
    ...mapActions(['createGame']),
    activate(){
      console.log('activate');
      this.dialog = true;
    },
    create(){
      console.log('name',this.name);
      this.createGame({name:this.name});
      this.dialog = false;
    }
  }
}
</script>

<style scoped>

</style>