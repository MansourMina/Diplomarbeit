<template>
  <v-card class="pa-5">
    <v-system-bar class="red darken-4"></v-system-bar>
    <v-row class="ma-0 pt-2 pb-0" align="center">
      <v-col cols="1" md="1" class="pt-0 mt-1 ml-0 pl-0 pb-0 mb-0 mr-0 pr-0"
        ><span>To</span></v-col
      >
      <v-col class="ma-0 mt-2 pl-0 ml-0" cols="11" md="11">
        <v-slide-group multiple show-arrows mobile-breakpoint>
          <v-menu v-model="menu" absolute>
            <template v-slot:activator="{ on }">
              <v-slide-item v-for="s of filteredEmails" :key="s.firmen_id">
                <v-chip
                small
                  pill
                  v-on="on"
                  class="mx-1"
                  @click="currentMenu = s"
                  close
                  dark
                  @click:close="remove(s)"
                >
                  {{ s.firmen_mail }}
                </v-chip>
              </v-slide-item>

              <!-- <v-menu bottom offset-y v-if="filteredEmails.length > 3">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-on="on"
                    v-for="s in leftEmail"
                    :key="s.firmen_id"
                    @click="currentMenu = s"
                    @click:close="remove(s)"
                  >
                    <v-list-item-title>{{ s.firmen_mail }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu> -->
            </template>

            <v-card width="300">
              <v-list dark>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      currentMenu.firmen_name
                    }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="menu = false">
                      <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-list>
                <v-list-item @click="() => {}">
                  <v-list-item-action>
                    <v-icon color="red darken-4">mdi-briefcase</v-icon>
                  </v-list-item-action>
                  <v-list-item-subtitle>{{
                    currentMenu.firmen_mail
                  }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </v-slide-group>
      </v-col>
    </v-row>

    <v-divider class="pa-0 ma-0"></v-divider>

    <v-text-field
      class="mt-0 pt-0"
      full-width
      v-model="subject"
      label="Subject"
      single-line
    ></v-text-field>
    <v-textarea
      single-line
      label="Message"
      class="mt-0 pt-0"
      ref="target"
      id="message"
      @select="setText"
      contenteditable="true"
      v-model="message"
    ></v-textarea>

    <div class="ml-0 d-flex">
      <v-btn
        icon
        @click="textBold()"
        color="black"
        :disabled="selectedText.length == 0 || showBold == false"
        ><v-icon id="bold">mdi-format-bold</v-icon></v-btn
      >
      <v-spacer></v-spacer>
      <v-btn class="mt-0 my-2 mr-2" icon @click="entwurfLöschen()"
        ><v-icon color="red darken-4">mdi-delete</v-icon></v-btn
      >

      <v-btn
        class="mt-0 my-2"
        icon
        @click="send()"
        :disabled="message.length == 0"
        ><v-icon color="primary">mdi-send</v-icon></v-btn
      >
    </div>
    <v-system-bar class="red darken-4"></v-system-bar>
  </v-card>
</template>

<script>
import { bus } from '../main';

import axios from 'axios';
export default {
  data() {
    return {
      dialog: false,
      menu: false,
      currentMenu: {},
      message: '',
      subject: 'Re: Karrieretag',
      selectedText: '',
      diesdas: '',
      text: false,
      showBold: true,
      limit: 3,
      filteredEmails: [],
      busEmails: [],
    };
  },
  mounted() {
    document.addEventListener('mouseup', (event) => {
      if (event.target.id == 'message' || event.target.id == 'bold') {
        this.showBold = true;
        this.setText();
      } else {
        this.showBold = false;
      }
    });
  },
  created() {
    bus.$on('changeIt', async (data) => {
      this.busCountry = data;
      this.filterEmails(this.busCountry);
    });
    if (this.busCountry == null) {
      this.filterEmails(this.selectedEmails);
    }
  },

  props: {
    selectedEmails: {
      type: Array,
    },
  },

  methods: {
    filterEmails(selectedEmails) {
      const ids = selectedEmails.map((el) => el.firmen_mail);
      this.filteredEmails = selectedEmails.filter(
        ({ firmen_mail }, index) => !ids.includes(firmen_mail, index + 1),
      );
    },
    textBold() {
      const boldedText = this.selectedText.bold();
      this.message = this.message.replace(this.selectedText, boldedText);
    },
    setText() {
      this.selectedText = window.getSelection().toString();
    },
    remove(item) {
      this.filteredEmails = this.filteredEmails.filter((el) => el != item);
      if (this.filteredEmails.length == 0) {
        // this.$emit('deSelectFirma', item.firmen_mail);
        this.$emit('closeDialog');
      } else {
        // this.$emit('deSelectFirma', item);
      }
    },
    entwurfLöschen() {
      this.filteredEmails = [];
      this.message = '';
      this.$emit('closeDialog');
    },
    async send() {
      let finalSubject = '';
      if (this.subject.substring(0, 3).toLowerCase() == 're:') {
        finalSubject = this.subject.slice(3);
      } else {
        finalSubject = this.subject;
      }
      const emailstoSend = [];
      const finalMessage = this.message.replaceAll('\n', '<br/>\r\n');

      this.filteredEmails.forEach((element) => {
        emailstoSend.push({
          name: element.firmen_name,
          email: element.firmen_mail,
        });
      });

      await axios({
        url: '/sendmail',
        method: 'POST',
        contentType: 'application/json',
        data: {
          emails: emailstoSend,
          subject: finalSubject,
          message: finalMessage,
        },
      });
      this.entwurfLöschen();

      this.$emit('closeDialog');
    },
  },
  computed: {
    limitEmail() {
      return this.filteredEmails
        ? this.filteredEmails.slice(0, this.limit)
        : this.filteredEmails;
    },
    leftEmail() {
      return this.filteredEmails
        ? this.filteredEmails.slice(3, this.filteredEmails.length)
        : this.filteredEmails;
    },
  },
};
</script>
