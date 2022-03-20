<template>
  <div class="ga__login_icon_view">
    <v-row>
      <v-btn outlined :color="`teal darken-2`" @click="handleBackBtnClick">
        Go Back To Choose IPASS
        <fa-icon class="ml-2" icon="fa-solid fa-arrow-rotate-left" color="#00796B" size="lg"/>
      </v-btn>
    </v-row>
    <v-row class="ga__login_icon_view__title" align-content="center" justify="center">
      <v-col :cols="12">
        <div class="text-overline white--text text--darken-1 ga__login_icon_view__title__text">Login</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12" :md="6">
        <v-form v-model="validLoginForm" :ref="loginFormRef">
          <v-row class="ga__login_icon_view__form_row" justify="center">
            <v-col :cols="8" class="ga__login_icon_view__form_col">
              <v-text-field
                v-model="userName"
                :rules="userNameRules"
                :counter="10"
                color="teal"
                label="user name"
                required
                filled
                dark
                class="ga__login_icon_view__form_field"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="ga__login_icon_view__form_row" justify="center">
            <v-col :cols="8" class="ga__login_icon_view__form_col">
              <v-select
                :items="iconCategoriesItems"
                label="icon categories"
                color="teal"
                item-color="teal"
                required
                filled
                dark
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col :cols="12" :md="6">smth</v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { GA_LOGIN_ROUTE_NAME } from '@/config/consts';

export default Vue.extend({
  name: 'GALoginIconView',
  data() {
    return {
      validLoginForm: false,
      loginFormRef: 'loginFormRef',
      userName: '',
      userNameRules: [
        (v: string) => !!v || 'username is required',
        (v: string) => v.length <= 10 || 'username must be less than 10 characters',
      ],
      iconCategoriesItems: [],
    };
  },
  async created() {
    await this.setUpIconsCategories();
  },
  methods: {
    ...mapActions('icons', ['fetchIconsCategories']),
    async handleBackBtnClick() {
      await this.$router.push({ name: GA_LOGIN_ROUTE_NAME });
    },
    async setUpIconsCategories() {
      this.fetchIconsCategories().then(res => {
        if(res) {
          this.iconCategoriesItems = this.iconsCategories.map((ic: any) => ic.category);
        }
      })
    }
  },
  computed: {
    ...mapGetters('icons', ['iconsCategories']),
  },
});
</script>

<style lang="scss" scoped>
.ga__login_icon_view {
  height: 100%;
  &__title {
    text-align: center;
    &__text {
        font-size: 3rem !important;
        padding: 2% 0;

        @media screen and (max-width: 600px) {
            font-size: 2rem !important;
            padding: 3% 0;
        }
        @media screen and (min-width: 600px) and (max-width: 1264px) {
            font-size: 2rem !important;
            padding: 3% 0;
        }
    }
  }

  &__form_col {
    width: 50%;
  }

  &__form_row {
    margin: 0;
    text-align: center;
  }
}

.v-application .primary--text {
  color: #009688 !important;
}
</style>