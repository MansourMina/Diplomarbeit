<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="5">
        <v-col>
          <h2 class="mb-4 display-6 font-weight-light">DATEN</h2>
        </v-col>

        <v-row>
          <v-col cols="3">
            <v-icon x-large color="red darken-4" style="font-size: 70px">
              mdi-map-marker
            </v-icon>
          </v-col>
          <v-col cols="8" md="4">
            <p style="font-size: 16px"><b>Adresse</b></p>
            <p>Thaliastraße 125, 1160 Wien</p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <v-icon
              x-large
              color="red darken-4"
              style="font-size: 50px"
              class="ml-3"
            >
              mdi-phone-classic
            </v-icon>
          </v-col>
          <v-col cols="8" md="3">
            <p style="font-size: 16px"><b>Tel.</b></p>
            <p><a href="tel:01 49111 113">01 49111 113</a></p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-icon
              x-large
              color="red darken-4"
              style="font-size: 50px"
              class="ml-3 mt-1"
            >
              mdi-email
            </v-icon>
          </v-col>
          <v-col cols="8" md="3">
            <p style="font-size: 16px"><b>Email</b></p>
            <p>
              <a href="mailto:direktion@htlwienwest.at"
                >direktion@htlwienwest.at</a
              >
            </p>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="7">
        <h2 class="mb-4 display-6 font-weight-light">MAP</h2>
        <div style="width: 100%">
          <iframe
            name="HTL Wien West Map"
            width="100%"
            height="450"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="https://maps.google.com/maps?width=100%25&amp;height=450&amp;hl=en&amp;q=HTL%20Wien%20West+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
