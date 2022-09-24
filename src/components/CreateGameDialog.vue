<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator>
      <v-btn @click="activate">
        Create Game
      </v-btn>
    </template>
    <v-card class="card pa-3">
      <v-card-title>Create Game</v-card-title>
      <v-card-text class="text-field">
        <v-text-field label="Game Name" v-model="name"/>
        <v-select
            :items="['RANDOM','DEFAULT']"
            filled
            label="Map"
            v-model="map"
        ></v-select>
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
import {QUERY_ME} from "@/graphql/queries";

export default {
  name: "CreateGameDialog",
  data() {
    return {
      dialog: false,
      name: '',
      map:'RANDOM'
    }
  },
  apollo: {
    me: {
      query: QUERY_ME
    }
  },
  methods: {
    ...mapActions(['createGame']),
    activate() {
      console.log('activate');
      this.dialog = true;
    },
    create() {
      console.log('name', this.name);
      this.createGame({name: this.name});
      this.dialog = false;
      this.reset()
    },
    reset() {
      this.name = `${this.me.displayName}'s Game`
    }
  },
  mounted() {
    this.reset();
  }
}
</script>

<style scoped>
.text-field {
  min-width: 600px
}

.card {
  min-width: fit-content;
}
</style>