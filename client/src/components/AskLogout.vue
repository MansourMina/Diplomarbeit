<template>
  <v-row justify="center">
    <v-dialog v-model="showDialog" max-width="290" persistent>
      <v-card color="red darken-4" dark>
        <v-card-title class="white--text text--lighten-1 text-body-2 mb-4">
          <div>
            Abmelden
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="Askdialog(false)">
            Nein
          </v-btn>

          <v-btn text @click="Askdialog(true)">
            Ja
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
    },
  },
  methods: {
    Askdialog(logout) {
      this.$emit('Askdialog',logout);
    },
  },
};
</script>

<style lang="scss" scoped></style>
